import base64
import html
import io
import json
import os
import shutil
import sys
import tempfile
import traceback
from dataclasses import dataclass
from email.parser import BytesParser
from email.policy import default
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from enroll_user import enroll_user, resolve_path


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC_ROOT = os.path.dirname(__file__)
USERS_CSV_PATH = resolve_path("data", "users", "users.csv")
FACES_DIR_PATH = resolve_path("data", "users", "faces")
TEMPLATE_PATH = os.path.join(SRC_ROOT, "templates", "guest_registration.html")
STYLESHEET_PATH = os.path.join(SRC_ROOT, "static", "styles.css")
VIDEO_EXTENSIONS = {".mp4", ".avi", ".mov", ".mkv", ".webm"}


@dataclass
class ParsedField:
    name: str
    value: str = ""
    filename: str = ""
    content_type: str = "text/plain"
    data: bytes = b""

    @property
    def file(self):
        return io.BytesIO(self.data)


class ParsedForm:
    def __init__(self, fields: dict[str, list[ParsedField]]):
        self.fields = fields

    def __contains__(self, key: str) -> bool:
        return key in self.fields

    def __getitem__(self, key: str):
        values = self.fields[key]
        return values[0] if len(values) == 1 else values

    def getfirst(self, key: str, default: str = "") -> str:
        field = self.get_field(key)
        if not field:
            return default
        return field.value or default

    def get_field(self, key: str):
        values = self.fields.get(key)
        if not values:
            return None
        return values[0]


def read_text_file(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as input_file:
        return input_file.read()


def safe_filename(filename: str) -> str:
    basename = os.path.basename(filename or "")
    sanitized = "".join(
        character if character.isalnum() or character in ("-", "_", ".") else "_"
        for character in basename
    )
    return sanitized or "upload.bin"


def save_uploaded_file(field_item, destination_dir: str) -> str:
    filename = safe_filename(field_item.filename)
    destination_path = os.path.join(destination_dir, filename)
    with open(destination_path, "wb") as upload_file:
        shutil.copyfileobj(field_item.file, upload_file)
    return destination_path


def guess_extension_from_data_url(data_url_header: str) -> str:
    mime_type = data_url_header.split(";", 1)[0].split(":", 1)[-1].lower()
    return {
        "video/webm": ".webm",
        "video/mp4": ".mp4",
        "image/png": ".png",
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/webp": ".webp",
    }.get(mime_type, ".webm")


def save_recorded_media(data_url: str, destination_dir: str) -> str:
    if not data_url:
        raise ValueError("Dữ liệu khuôn mặt đã quay đang trống.")
    if "," not in data_url or ";base64" not in data_url:
        raise ValueError("Dữ liệu khuôn mặt đã quay không hợp lệ.")

    header, encoded_data = data_url.split(",", 1)
    extension = guess_extension_from_data_url(header)
    destination_path = os.path.join(destination_dir, f"recorded_face{extension}")

    with open(destination_path, "wb") as output_file:
        output_file.write(base64.b64decode(encoded_data))
    return destination_path


def render_page(message=None, message_tone="success"):
    template_html = read_text_file(TEMPLATE_PATH)
    message_html = ""
    if message:
        message_html = f"""
        <div class="banner banner-{html.escape(message_tone)}">
          <p>{html.escape(message)}</p>
        </div>
        """
    return template_html.replace("__MESSAGE_HTML__", message_html)


def parse_bool(raw_value: str) -> bool:
    return raw_value.strip().lower() in {"1", "true", "yes", "on"}


class VehicleAccessPortalHandler(BaseHTTPRequestHandler):
    server_version = "VehicleAccessPortal/2.0"

    def log_message(self, format, *args):
        return

    def end_headers(self):
        configured_origin = os.environ.get("WEB_ORIGIN", "*").strip() or "*"
        request_origin = self.headers.get("Origin", "").strip()
        allow_origin = configured_origin

        if configured_origin == "*" and request_origin:
            allow_origin = request_origin

        self.send_header("Access-Control-Allow-Origin", allow_origin)
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Max-Age", "86400")
        self.send_header("Vary", "Origin")
        super().end_headers()

    def _send_response_body(
        self,
        body,
        *,
        content_type: str,
        status: int = HTTPStatus.OK,
        encoding: str = "utf-8",
    ):
        if isinstance(body, str):
            encoded = body.encode(encoding)
        else:
            encoded = body
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def _send_html(self, html_content: str, status: int = HTTPStatus.OK):
        self._send_response_body(
            html_content,
            content_type="text/html; charset=utf-8",
            status=status,
        )

    def _send_css(self, css_content: str, status: int = HTTPStatus.OK):
        self._send_response_body(
            css_content,
            content_type="text/css; charset=utf-8",
            status=status,
        )

    def _send_json(self, payload, status: int = HTTPStatus.OK):
        self._send_response_body(
            json.dumps(payload, ensure_ascii=False, indent=2),
            content_type="application/json; charset=utf-8",
            status=status,
        )

    def _render(self, *, message=None, message_tone="success", status=HTTPStatus.OK):
        self._send_html(
            render_page(
                message=message,
                message_tone=message_tone,
            ),
            status=status,
        )

    def _parse_form(self):
        content_type = self.headers.get("Content-Type", "")
        content_length = int(self.headers.get("Content-Length", "0") or "0")
        raw_body = self.rfile.read(content_length)

        if "multipart/form-data" in content_type:
            message = BytesParser(policy=default).parsebytes(
                (
                    f"Content-Type: {content_type}\r\n"
                    "MIME-Version: 1.0\r\n"
                    "\r\n"
                ).encode("utf-8")
                + raw_body
            )
            fields: dict[str, list[ParsedField]] = {}

            for part in message.iter_parts():
                field_name = part.get_param("name", header="content-disposition")
                if not field_name:
                    continue

                filename = part.get_filename() or ""
                payload = part.get_payload(decode=True) or b""
                parsed_field = ParsedField(
                    name=field_name,
                    filename=filename,
                    content_type=part.get_content_type(),
                    data=payload,
                    value=(
                        payload.decode(part.get_content_charset() or "utf-8", errors="replace")
                        if not filename
                        else ""
                    ),
                )
                fields.setdefault(field_name, []).append(parsed_field)

            return ParsedForm(fields)

        if "application/x-www-form-urlencoded" in content_type:
            decoded_body = raw_body.decode("utf-8", errors="replace")
            fields = {
                key: [ParsedField(name=key, value=value)]
                for key, values in parse_qs(decoded_body, keep_blank_values=True).items()
                for value in values[:1]
            }
            return ParsedForm(fields)

        raise ValueError("Unsupported form content type.")

    @staticmethod
    def _get_optional_file_field(form, field_name: str):
        field = form.get_field(field_name)
        if field is None or not getattr(field, "filename", ""):
            return None
        return field

    def _process_registration(self, form):
        plate = form.getfirst("plate", "").strip()
        provided_user_id = form.getfirst("user_id", "").strip()
        face_media = self._get_optional_file_field(form, "face_media")
        recorded_face_data = form.getfirst("recorded_face_data", "").strip()
        guest_mode = parse_bool(form.getfirst("guest_mode", ""))

        if not plate:
            raise ValueError("Vui lòng nhập biển số xe.")
        if face_media is None and not recorded_face_data:
            raise ValueError("Vui lòng tải ảnh/video khuôn mặt hoặc quay video trực tiếp.")

        with tempfile.TemporaryDirectory(dir=PROJECT_ROOT) as temp_dir:
            if face_media is not None:
                temp_source_path = save_uploaded_file(face_media, temp_dir)
            else:
                temp_source_path = save_recorded_media(recorded_face_data, temp_dir)

            is_video = os.path.splitext(temp_source_path)[1].lower() in VIDEO_EXTENSIONS
            enrollment_result = enroll_user(
                provided_user_id,
                plate,
                temp_source_path,
                users_csv=USERS_CSV_PATH,
                faces_dir=FACES_DIR_PATH,
                is_video=is_video,
                guest_mode=guest_mode or not provided_user_id,
            )

        return enrollment_result

    def do_OPTIONS(self):
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

    def do_GET(self):
        if self.path == "/":
            self._render()
            return
        if self.path == "/styles.css":
            self._send_css(read_text_file(STYLESHEET_PATH))
            return
        if self.path == "/api/health":
            self._send_json({"success": True, "message": "Vehicle access portal is running."})
            return
        self.send_error(HTTPStatus.NOT_FOUND, "Không tìm thấy trang.")

    def do_POST(self):
        is_api_request = self.path.startswith("/api/")

        try:
            if self.path == "/register":
                enrollment_result = self._process_registration(self._parse_form())
                registered_user_id = enrollment_result["user_id"]
                self._render(
                    message=f"Đăng ký khách thành công. Mã khách là: {registered_user_id}",
                    message_tone="success",
                )
                return

            if self.path == "/api/register-vehicle":
                enrollment_result = self._process_registration(self._parse_form())
                self._send_json(
                    {
                        "success": True,
                        "message": "Vehicle enrollment synced successfully.",
                        "result": enrollment_result,
                    }
                )
                return

            if is_api_request:
                self._send_json(
                    {"success": False, "error": "Không tìm thấy API endpoint."},
                    status=HTTPStatus.NOT_FOUND,
                )
                return

            self.send_error(HTTPStatus.NOT_FOUND, "Không tìm thấy trang.")
        except Exception as exc:
            traceback.print_exc()
            if is_api_request:
                self._send_json(
                    {"success": False, "error": str(exc)},
                    status=HTTPStatus.BAD_REQUEST,
                )
                return

            self._render(
                message=str(exc),
                message_tone="error",
                status=HTTPStatus.BAD_REQUEST,
            )


def create_server(host: str = "localhost", port: int = 8000):
    return ThreadingHTTPServer((host, port), VehicleAccessPortalHandler)


def main():
    host = os.environ.get("HOST", "localhost")
    port = int(os.environ.get("PORT", "8000"))
    server = create_server(host, port)
    print(f"Vehicle access portal running at http://{host}:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
