import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { getRecoveryEmail, markRecoveryVerified, setRecoveryEmail } from '../utils/authFlow';
import { getReadableAuthError } from '../utils/authErrors';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(59);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string } | null)?.email || getRecoveryEmail();

  useEffect(() => {
    if (email) {
      setRecoveryEmail(email);
    }
  }, [email]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value.slice(-1);
    setOtp(nextOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
    if (!pastedData) return;

    const nextOtp = [...otp];
    for (let i = 0; i < pastedData.length; i += 1) {
      nextOtp[i] = pastedData[i];
    }

    setOtp(nextOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const otpValue = otp.join('');
    if (!email) {
      setError('Không tìm thấy email khôi phục. Vui lòng quay lại bước quên mật khẩu.');
      return;
    }
    if (otpValue.length !== 6) {
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otpValue,
        type: 'recovery',
      });

      if (error) {
        setError(getReadableAuthError(error, 'Mã OTP không hợp lệ hoặc đã hết hạn.'));
        return;
      }

      markRecoveryVerified();
      navigate('/reset-password', { replace: true });
    } catch {
      setError('Không thể xác minh OTP lúc này. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown !== 0 || !email) return;

    setResending(true);
    setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setError(getReadableAuthError(error, 'Không thể gửi lại OTP.'));
        return;
      }

      setOtp(['', '', '', '', '', '']);
      setCountdown(59);
      inputRefs.current[0]?.focus();
    } catch {
      setError('Không thể gửi lại OTP.');
    } finally {
      setResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ec5b13]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-[#ec5b13]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl overflow-hidden p-8 md:p-10 border border-slate-200 dark:border-slate-800">
          <div className="text-center mb-8">
            <h1 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold mb-3">Nhập mã xác nhận</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Chúng tôi đã gửi mã OTP gồm 6 chữ số đến email của bạn.
              <br />
              Vui lòng nhập mã để tiếp tục.
            </p>
            {email && <p className="mt-3 text-sm font-semibold text-[#ec5b13] break-all">{email}</p>}
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex justify-between gap-2 md:gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:border-[#ec5b13] focus:ring-0 bg-transparent text-slate-900 dark:text-slate-100 transition-colors outline-none"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">timer</span>
                {countdown > 0 ? (
                  <p className="text-sm font-medium">
                    Gửi lại mã sau <span className="text-[#ec5b13]">{formatTime(countdown)}</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-sm font-medium text-[#ec5b13] hover:underline disabled:opacity-60"
                  >
                    {resending ? 'Đang gửi lại...' : 'Gửi lại mã'}
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={otp.join('').length !== 6 || loading || !email}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] ${
                  otp.join('').length === 6 && !loading && !!email
                    ? 'bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white shadow-[#ec5b13]/20'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                }`}
              >
                {loading ? 'Đang xác minh...' : 'Xác nhận'}
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-[#ec5b13] dark:text-slate-400 dark:hover:text-[#ec5b13] text-sm font-medium transition-colors group"
            >
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Quay lại đăng nhập
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-400 dark:text-slate-600 text-xs">
          <p>The Visionary FAIC HACKATHON PROJECT © 2026</p>
        </div>
      </div>
    </div>
  );
}
