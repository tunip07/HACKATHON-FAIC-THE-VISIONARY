import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    // TODO: Implement actual password update logic here
    console.log('Updating password...');
    navigate('/reset-password-success');
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
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
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 leading-tight tracking-tight">
              Thiết lập mật khẩu mới
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-base leading-relaxed">
              Vui lòng nhập mật khẩu mới để tiếp tục truy cập tài khoản của bạn.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Mật khẩu mới
              </label>
              <div className="relative flex items-center">
                <input 
                  type={showPassword ? "text" : "password"}
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

            {/* Confirm Password Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative flex items-center">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
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

            {/* Requirements */}
            <div className="flex gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="material-symbols-outlined text-[#ec5b13] text-sm mt-0.5">info</span>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái và số
              </p>
            </div>

            {/* Action Button */}
            <button 
              type="submit"
              className="w-full h-12 bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-[#ec5b13]/20 flex items-center justify-center gap-2"
            >
              Cập nhật mật khẩu
            </button>

            {/* Back to Login */}
            <div className="pt-2 text-center">
              <Link to="/login" className="inline-flex items-center gap-1 text-[#ec5b13] hover:text-[#ec5b13]/80 font-semibold text-sm transition-colors group">
                <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                Quay lại đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Section */}
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
