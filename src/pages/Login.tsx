import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { getReadableAuthError } from '../utils/authErrors';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string; search?: string; hash?: string } } | null)?.from;
  const redirectPath = from?.pathname ? `${from.pathname}${from.search || ''}${from.hash || ''}` : '/services';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(getReadableAuthError(error, 'Đăng nhập thất bại. Vui lòng thử lại.'));
      } else {
        navigate(redirectPath, { replace: true });
      }
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${redirectPath}`,
        },
      });
      if (error) {
        setError(getReadableAuthError(error, 'Không thể đăng nhập bằng Google. Vui lòng thử lại.'));
      }
    } catch {
      setError('Không thể đăng nhập bằng Google. Vui lòng thử lại.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex items-center justify-center font-sans p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #ec5b13 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      ></div>

      <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative z-10">
        {/* Header */}
        <div className="relative h-48 bg-[#ec5b13]/10 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 bg-center bg-cover"
            style={{ backgroundImage: 'url("https://i.ytimg.com/vi/Yd6gr49Ioq0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBu_f6Xlmhqi0ARjQ1JccylaE6_Eg")' }}
          ></div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Chào mừng bạn đến với FPT Parking</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center text-sm">Hệ thống quản lý bãi xe thông minh hàng đầu</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">person</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec5b13]/50 focus:border-[#ec5b13] outline-none transition-all dark:text-white"
                  placeholder="example@fpt.edu.vn"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 block">Mật khẩu</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec5b13]/50 focus:border-[#ec5b13] outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#ec5b13] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs font-medium text-[#ec5b13] hover:underline">Quên mật khẩu?</Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#ec5b13]/30 transition-all transform active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-slate-900 text-slate-500">Hoặc tiếp tục với</span>
            </div>
          </div>

          {/* Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <svg className="w-5 h-5 animate-spin text-[#ec5b13]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            {googleLoading ? 'Đang kết nối...' : 'Tiếp tục với Google'}
          </button>

          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Chưa có tài khoản?
              <Link to="/reg" className="text-[#ec5b13] font-bold hover:underline ml-1">Đăng ký ngay</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
