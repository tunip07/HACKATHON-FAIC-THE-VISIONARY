const hasVietnameseCharacters = (value: string) =>
  /[àáạảãăắằặẳẵâấầậẩẫđèéẹẻẽêếềệểễìíịỉĩòóọỏõôốồộổỗơớờợởỡùúụủũưứừựửữỳýỵỷỹ]/i.test(value);

const AUTH_ERROR_MAPPINGS: Array<{ match: string[]; message: string }> = [
  {
    match: ['invalid login credentials'],
    message: 'Email hoặc mật khẩu không đúng.',
  },
  {
    match: ['email not confirmed'],
    message: 'Vui lòng xác nhận email trước khi đăng nhập.',
  },
  {
    match: ['user already registered', 'already registered'],
    message: 'Email này đã được đăng ký. Nếu đây là tài khoản của bạn, hãy thử đăng nhập hoặc dùng Quên mật khẩu.',
  },
  {
    match: ['password should be at least', 'password is too short'],
    message: 'Mật khẩu chưa đủ độ dài yêu cầu.',
  },
  {
    match: ['unable to validate email address', 'email address is invalid', 'invalid email'],
    message: 'Email không hợp lệ.',
  },
  {
    match: ['token has expired or is invalid', 'invalid otp', 'otp expired', 'otp is invalid', 'expired'],
    message: 'Mã xác nhận không hợp lệ hoặc đã hết hạn.',
  },
  {
    match: ['email rate limit exceeded', 'security purposes'],
    message: 'Bạn thao tác quá nhanh. Vui lòng chờ một chút rồi thử lại.',
  },
  {
    match: ['failed to fetch', 'network request failed'],
    message: 'Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng rồi thử lại.',
  },
  {
    match: ['signup is disabled'],
    message: 'Tính năng đăng ký hiện đang tạm thời bị tắt.',
  },
];

export const getReadableAuthError = (
  error: { message?: string } | null | undefined,
  fallback = 'Đã có lỗi xảy ra. Vui lòng thử lại.',
) => {
  const rawMessage = error?.message?.trim();

  if (!rawMessage) {
    return fallback;
  }

  if (hasVietnameseCharacters(rawMessage)) {
    return rawMessage;
  }

  const normalizedMessage = rawMessage.toLowerCase();
  const mappedError = AUTH_ERROR_MAPPINGS.find(({ match }) =>
    match.some((keyword) => normalizedMessage.includes(keyword)),
  );

  return mappedError?.message ?? fallback;
};
