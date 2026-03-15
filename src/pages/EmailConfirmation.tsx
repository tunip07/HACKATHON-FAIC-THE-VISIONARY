import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EmailConfirmation() {
  const [countdown, setCountdown] = useState(0);

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

  const handleResend = () => {
    if (countdown === 0) {
      // TODO: Implement actual resend logic here
      setCountdown(60);
    }
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="max-w-[480px] w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          <div className="mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-[#ec5b13]/10 text-[#ec5b13]">
            <span className="material-symbols-outlined !text-5xl">
              mail
            </span>
          </div>
          <h1 className="text-slate-900 dark:text-slate-100 text-3xl font-bold tracking-tight mb-4">
            Xác nhận Email
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-10">
            Chúng tôi đã gửi một liên kết xác nhận đến email của bạn. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để kích hoạt tài khoản.
          </p>
          <div className="w-full space-y-6">
            <button 
              onClick={handleResend}
              disabled={countdown > 0}
              className={`w-full flex items-center justify-center font-bold py-3 px-6 rounded-xl transition-colors duration-200 ${
                countdown > 0 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                  : 'bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white'
              }`}
            >
              <span className="truncate">
                {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại email xác nhận'}
              </span>
            </button>
            <div className="flex items-center justify-center">
              <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#ec5b13] dark:hover:text-[#ec5b13] transition-colors duration-200 gap-2">
                <span className="material-symbols-outlined text-lg">
                  arrow_back
                </span>
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 py-4 px-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-center text-slate-400 dark:text-slate-500">
            Bạn không nhận được email? Kiểm tra thư mục thư rác hoặc thử lại sau vài phút.
          </p>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-1 bg-[#ec5b13]/20">
        <div className="bg-[#ec5b13] h-full w-1/3"></div>
      </div>
    </div>
  );
}
