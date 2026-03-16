import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { EmailOtpType } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { clearPendingSignupEmail } from '../utils/authFlow';
import { getReadableAuthError } from '../utils/authErrors';

type ConfirmationStatus = 'loading' | 'success' | 'error';

const isSupportedEmailOtpType = (value: string | null): value is EmailOtpType =>
  value === 'signup' ||
  value === 'invite' ||
  value === 'magiclink' ||
  value === 'recovery' ||
  value === 'email_change' ||
  value === 'email';

export default function AuthConfirm() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<ConfirmationStatus>('loading');
  const [message, setMessage] = useState('Đang xác nhận email của bạn...');
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    if (hasVerifiedRef.current) return;
    hasVerifiedRef.current = true;

    const tokenHash = searchParams.get('token_hash');
    const rawType = searchParams.get('type');
    const otpType: EmailOtpType = isSupportedEmailOtpType(rawType) ? rawType : 'email';

    if (!tokenHash) {
      setStatus('error');
      setMessage('Liên kết xác nhận không hợp lệ hoặc đã thiếu mã xác nhận.');
      return;
    }

    const verifyEmail = async () => {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: otpType,
      });

      if (error) {
        setStatus('error');
        setMessage(getReadableAuthError(error, 'Liên kết xác nhận đã hết hạn hoặc không còn hợp lệ.'));
        return;
      }

      clearPendingSignupEmail();
      await supabase.auth.signOut();
      setStatus('success');
      setMessage('Email đã được xác nhận thành công. Bây giờ bạn có thể đăng nhập.');
    };

    verifyEmail().catch(() => {
      setStatus('error');
      setMessage('Không thể xác nhận email lúc này. Vui lòng thử lại.');
    });
  }, [searchParams]);

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="max-w-[520px] w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8 md:p-10 text-center">
          <div
            className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
              isLoading
                ? 'bg-slate-100 text-slate-500'
                : isSuccess
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-500'
            }`}
          >
            {isLoading ? (
              <svg className="h-10 w-10 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <span className="material-symbols-outlined text-5xl">
                {isSuccess ? 'mark_email_read' : 'error'}
              </span>
            )}
          </div>

          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {isLoading ? 'Đang xác nhận' : isSuccess ? 'Xác nhận thành công' : 'Xác nhận thất bại'}
          </h1>
          <p className="mb-8 text-base leading-relaxed text-slate-600 dark:text-slate-400">{message}</p>

          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              className="w-full rounded-xl bg-[#ec5b13] px-6 py-3 font-bold text-white transition-colors hover:bg-[#ec5b13]/90"
            >
              Đi tới đăng nhập
            </Link>
            <Link
              to="/reg"
              className="w-full rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Tạo tài khoản khác
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
