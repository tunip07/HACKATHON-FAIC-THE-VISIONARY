import { normalizeLicensePlate } from './vehicles';

export interface AiVehicleEnrollmentInput {
  userId: string;
  licensePlate: string;
  faceMedia: Blob;
}

export interface AiVehicleEnrollmentResult {
  user_id: string;
  registered_plate: string;
  face_dir: string;
  face_source_path: string;
  face_source_type: 'image' | 'video';
  guest_mode: boolean;
}

interface AiVehicleEnrollmentResponse {
  success: boolean;
  message?: string;
  error?: string;
  result?: AiVehicleEnrollmentResult;
}

const DEFAULT_AI_GATE_API_URL = 'http://localhost:8000/api/register-vehicle';

const resolveAiGateApiUrl = () => {
  const directApiUrl = import.meta.env.VITE_AI_GATE_API_URL?.trim();
  if (directApiUrl) {
    return directApiUrl;
  }

  const legacyPortalUrl = import.meta.env.VITE_GUEST_REGISTRATION_URL?.trim();
  if (legacyPortalUrl) {
    return new URL('/api/register-vehicle', legacyPortalUrl).toString();
  }

  return DEFAULT_AI_GATE_API_URL;
};

const buildAiEnrollmentId = (userId: string, licensePlate: string) => {
  const normalizedPlate = normalizeLicensePlate(licensePlate);
  const safeUserId = userId.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${safeUserId}_${normalizedPlate}`;
};

const guessFaceFilename = (faceMedia: Blob) => {
  const mimeType = faceMedia.type.toLowerCase();

  if (mimeType.includes('mp4')) {
    return 'face_capture.mp4';
  }
  if (mimeType.includes('webm')) {
    return 'face_capture.webm';
  }
  if (mimeType.includes('mov')) {
    return 'face_capture.mov';
  }
  if (mimeType.includes('png')) {
    return 'face_capture.png';
  }
  if (mimeType.includes('webp')) {
    return 'face_capture.webp';
  }

  return 'face_capture.jpg';
};

const parseBridgeError = async (response: Response) => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const payload = (await response.json()) as AiVehicleEnrollmentResponse;
    return payload.error || payload.message || 'Không thể đồng bộ dữ liệu sang AI backend.';
  }

  const text = await response.text();
  return text || 'Không thể đồng bộ dữ liệu sang AI backend.';
};

export const syncVehicleToAiBackend = async (
  input: AiVehicleEnrollmentInput,
): Promise<AiVehicleEnrollmentResult> => {
  const trimmedPlate = input.licensePlate.trim().toUpperCase();

  if (!trimmedPlate) {
    throw new Error('Biển số xe không hợp lệ.');
  }

  const formData = new FormData();
  formData.append('user_id', buildAiEnrollmentId(input.userId, trimmedPlate));
  formData.append('plate', trimmedPlate);
  formData.append('face_media', input.faceMedia, guessFaceFilename(input.faceMedia));

  let response: Response;

  try {
    response = await fetch(resolveAiGateApiUrl(), {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw new Error(
      'Không thể kết nối tới AI backend Vehicle Access Verifier. Hãy chạy `npm run ai-backend` hoặc kiểm tra lại cổng 8000.',
    );
  }

  if (!response.ok) {
    throw new Error(await parseBridgeError(response));
  }

  const payload = (await response.json()) as AiVehicleEnrollmentResponse;

  if (!payload.success || !payload.result) {
    throw new Error(payload.error || 'AI backend không trả về dữ liệu hợp lệ.');
  }

  return payload.result;
};
