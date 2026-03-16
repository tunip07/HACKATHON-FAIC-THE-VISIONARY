import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { getAuthRedirectUrl, getPendingSignupEmail } from '../utils/authFlow';

export default function EmailConfirmation() {
  const [countdown, setCountdown] = useState(0);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const location = useLocation();
  const email = (location.state as { email?: string } | null)?.email || getPendingSignupEmail();

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

  const handleResend = async () => {
    if (countdown > 0 || !email) return;

    setResendStatus('sending');
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: getAuthRedirectUrl('/auth/confirm'),
        },
      });

      if (error) {
        setResendStatus('error');
        return;
      }

      setResendStatus('sent');
      setCountdown(60);
      setTimeout(() => setResendStatus('idle'), 4000);
    } catch {
      setResendStatus('error');
    }
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="max-w-[480px] w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          <div className="mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-[#ec5b13]/10 text-[#ec5b13]">
            <span className="material-symbols-outlined !text-5xl">mail</span>
          </div>

          <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-4">
            Xác nhận Email
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-4">
            Chúng tôi đã gửi liên kết xác nhận đến email của bạn. Vui lòng mở hộp thư và bấm vào liên kết để kích hoạt tài khoản.
          </p>
          {email && (
            <p className="mb-8 text-sm font-semibold text-[#ec5b13] break-all">
              {email}
            </p>
          )}

          <div className="w-full space-y-6">
            {!email && (
              <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm text-center">
                Không tìm thấy email vừa đăng ký. Bạn có thể quay lại trang đăng ký để nhập lại email.
              </div>
            )}
            {resendStatus === 'sent' && (
              <div className="px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-center font-medium">
                Email xác nhận đã được gửi lại.
              </div>
            )}
            {resendStatus === 'error' && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                Không thể gửi lại email. Vui lòng thử lại sau.
              </div>
            )}

            <button
              onClick={handleResend}
              disabled={countdown > 0 || resendStatus === 'sending' || !email}
              className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-colors duration-200 ${
                countdown > 0 || resendStatus === 'sending' || !email
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                  : 'bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white'
              }`}
            >
              {resendStatus === 'sending' && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              <span className="truncate">
                {resendStatus === 'sending'
                  ? 'Đang gửi...'
                  : countdown > 0
                    ? `Gửi lại sau ${countdown}s`
                    : 'Gửi lại email xác nhận'}
              </span>
            </button>

            <div className="flex items-center justify-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors duration-200 gap-2"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 py-4 px-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-center text-slate-400 dark:text-slate-500">
            Không thấy email? Hãy kiểm tra mục spam hoặc thử gửi lại sau vài phút.
          </p>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-1 bg-[#ec5b13]/20">
        <div className="bg-[#ec5b13] h-full w-1/3"></div>
      </div>
    </div>
  );
}
