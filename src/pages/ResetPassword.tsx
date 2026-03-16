import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { clearRecoveryFlow, isRecoveryVerified, markRecoveryVerified } from '../utils/authFlow';
import { getReadableAuthError } from '../utils/authErrors';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validSession, setValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        markRecoveryVerified();
        setValidSession(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && isRecoveryVerified()) {
        setValidSession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      clearRecoveryFlow();
      await supabase.auth.signOut();
      navigate('/reset-password-success');
    } catch (err: any) {
      setError(getReadableAuthError(err, 'Cập nhật thất bại. Vui lòng thử lại.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex flex-col font-sans">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-[#ec5b13] p-1.5 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">local_parking</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">FPT Parking</h1>
        </Link>
        <div className="hidden sm:flex items-center gap-4 text-slate-600 dark:text-slate-400 text-sm font-medium">
          <span>Hệ thống quản lý bãi xe thông minh</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight tracking-tight">
              Thiết lập mật khẩu mới
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-base leading-relaxed">
              Vui lòng nhập mật khẩu mới để tiếp tục truy cập tài khoản của bạn.
            </p>
          </div>

          {!validSession ? (
            <div className="flex flex-col items-center gap-4 text-center py-4">
              <div className="size-16 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                <span className="material-symbols-outlined text-4xl">link_off</span>
              </div>
              <h3 className="text-lg font-bold">Phiên khôi phục không hợp lệ hoặc đã hết hạn</h3>
              <p className="text-slate-500 text-sm">Vui lòng yêu cầu mã OTP mới để đặt lại mật khẩu.</p>
              <Link to="/forgot-password" className="mt-2 px-6 py-2.5 bg-[#ec5b13] text-white rounded-xl font-bold hover:bg-[#ec5b13]/90 transition-colors">
                Yêu cầu lại
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">error</span>
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Mật khẩu mới</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all outline-none"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-[#ec5b13] transition-colors"
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Xác nhận mật khẩu mới</label>
                <div className="relative flex items-center">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all outline-none"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-slate-400 hover:text-[#ec5b13] transition-colors"
                  >
                    <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined text-[#ec5b13] text-sm mt-0.5">info</span>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-[#ec5b13]/20 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
              </button>

              <div className="pt-2 text-center">
                <Link to="/login" className="inline-flex items-center gap-1 text-[#ec5b13] hover:text-[#ec5b13]/80 font-semibold text-sm transition-colors group">
                  <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                  Quay lại đăng nhập
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="w-full py-8 px-6 text-center">
        <div className="max-w-md mx-auto border-t border-slate-200 dark:border-slate-800 pt-6">
          <p className="text-slate-400 dark:text-slate-500 text-xs">
            The Visionary FAIC HACKATHON PROJECT © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
