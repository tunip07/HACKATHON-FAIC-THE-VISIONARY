import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password reset logic here
    console.log('Reset password for:', email);
    // Navigate to OTP verification page
    navigate('/verify-otp');
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center bg-[#ec5b13] rounded-lg text-white">
            <span className="material-symbols-outlined text-2xl">local_parking</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">FPT Parking</h2>
        </Link>
        <Link to="/login" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#ec5b13] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#ec5b13]/90 transition-colors">
          <span className="truncate">Đăng nhập</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col">
            <div className="flex justify-center mb-6">
              <div className="size-16 bg-[#ec5b13]/10 rounded-full flex items-center justify-center text-[#ec5b13]">
                <span className="material-symbols-outlined text-4xl">lock_reset</span>
              </div>
            </div>
            <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight text-center pb-2">
              Quên mật khẩu?
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pb-8 text-center">
              Nhập email của bạn để nhận mã khôi phục tài khoản
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col w-full">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold leading-normal pb-2 px-1">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-[#ec5b13]/50 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:border-[#ec5b13] h-14 placeholder:text-slate-400 pl-12 pr-4 text-base font-normal leading-normal transition-all" 
                    placeholder="Nhập email của bạn" 
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-[#ec5b13] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#ec5b13]/90 transition-colors shadow-lg shadow-[#ec5b13]/20"
              >
                <span className="truncate">Gửi mã xác nhận</span>
              </button>
            </form>
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
              <Link to="/login" className="flex items-center gap-2 text-[#ec5b13] font-semibold text-sm hover:underline">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-slate-400 text-xs">
        The Visionary FAIC HACKATHON PROJECT © 2026
      </footer>
    </div>
  );
}
