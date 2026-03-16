import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { getAuthRedirectUrl, setPendingSignupEmail } from '../utils/authFlow';
import { getReadableAuthError } from '../utils/authErrors';

export default function RegisterAccount() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: getAuthRedirectUrl('/auth/confirm'),
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
          },
        },
      });

      if (signUpError) {
        setError(getReadableAuthError(signUpError, 'Đăng ký thất bại. Vui lòng thử lại.'));
        return;
      }

      setPendingSignupEmail(formData.email);
      navigate('/email-confirmation', { state: { email: formData.email } });
    } catch {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex flex-col font-sans">
      <header className="w-full px-6 md:px-20 py-4 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-[#ec5b13]">
          <span className="material-symbols-outlined text-3xl">local_parking</span>
          <h1 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">FPT Parking</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] text-sm font-medium transition-colors">Trang chủ</Link>
          <Link to="#" className="text-slate-600 dark:text-slate-400 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] text-sm font-medium transition-colors">Về chúng tôi</Link>
          <Link to="#" className="text-slate-600 dark:text-slate-400 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] text-sm font-medium transition-colors">Liên hệ</Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="relative h-32 bg-[#ec5b13]/10 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ec5b13]/20 to-transparent"></div>
            <div className="relative z-10 text-center px-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Đăng ký tài khoản</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Bắt đầu trải nghiệm dịch vụ gửi xe thông minh</p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="p-8 space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">person</span>
                Họ và tên
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all outline-none"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">mail</span>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all outline-none"
                placeholder="example@fpt.edu.vn"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">phone_iphone</span>
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all outline-none"
                placeholder="Nhập số điện thoại di động"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">lock</span>
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">enhanced_encryption</span>
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#ec5b13]/20 focus:border-[#ec5b13] transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-[#ec5b13]/20 transition-all transform active:scale-[0.98] mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>

            <div className="text-center pt-4">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Đã có tài khoản?
                <Link to="/login" className="text-[#ec5b13] font-bold hover:underline ml-1">Đăng nhập ngay</Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-8 text-center">
        <p className="text-slate-500 dark:text-slate-500 text-xs">
          © 2026 FPT Parking. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
