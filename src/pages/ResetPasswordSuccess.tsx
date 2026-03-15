import React from 'react';
import { Link } from 'react-router-dom';

export default function ResetPasswordSuccess() {
  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex flex-col font-sans relative overflow-hidden">
      {/* Background Decoration (Subtle) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50 dark:opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#ec5b13]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#ec5b13]/5 blur-[120px]"></div>
      </div>

      {/* Main Content Container */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="p-8 flex flex-col items-center text-center">
              {/* Success Icon Wrapper */}
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-green-500 font-bold">check_circle</span>
              </div>

              {/* Content */}
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                Đổi mật khẩu thành công!
              </h1>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Mật khẩu của bạn đã được cập nhật. Vui lòng sử dụng mật khẩu mới để đăng nhập vào hệ thống.
              </p>

              {/* Action Button */}
              <Link 
                to="/login"
                className="w-full bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Đăng nhập ngay</span>
                <span className="material-symbols-outlined text-sm">login</span>
              </Link>
            </div>

            {/* Card Footer Illustration/Pattern */}
            <div className="h-2 bg-gradient-to-r from-[#ec5b13]/20 via-[#ec5b13] to-[#ec5b13]/20"></div>
          </div>

          {/* Additional Help Link (Optional) */}
          <div className="mt-6 text-center">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              Gặp sự cố? <Link to="#" className="text-[#ec5b13] hover:underline font-medium">Liên hệ hỗ trợ</Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          The Visionary FAIC HACKATHON PROJECT © 2026
        </p>
      </footer>
    </div>
  );
}
