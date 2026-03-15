import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

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
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character if multiple are pasted/typed
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '');
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      // TODO: Implement actual OTP verification logic here
      console.log('Verifying OTP:', otpValue);
      navigate('/reset-password');
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      // TODO: Implement actual resend logic here
      setCountdown(59);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ec5b13]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-[#ec5b13]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Main Card Container */}
        <div className="bg-white dark:bg-slate-900 shadow-xl rounded-xl overflow-hidden p-8 md:p-10 border border-slate-200 dark:border-slate-800">
          {/* Header Content */}
          <div className="text-center mb-8">
            <h1 className="text-slate-900 dark:text-slate-100 text-2xl md:text-3xl font-bold mb-3">Nhập mã xác nhận</h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Chúng tôi đã gửi mã OTP gồm 6 chữ số đến email của bạn.<br/>Vui lòng nhập mã để tiếp tục.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* OTP Input Fields */}
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

            {/* Resend Timer & Submit Button */}
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">timer</span>
                {countdown > 0 ? (
                  <p className="text-sm font-medium">Gửi lại mã sau <span className="text-[#ec5b13]">{formatTime(countdown)}</span></p>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleResend}
                    className="text-sm font-medium text-[#ec5b13] hover:underline"
                  >
                    Gửi lại mã
                  </button>
                )}
              </div>

              <button 
                type="submit"
                disabled={otp.join('').length !== 6}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] ${
                  otp.join('').length === 6 
                    ? 'bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white shadow-[#ec5b13]/20' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed shadow-none'
                }`}
              >
                Xác nhận
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#ec5b13] dark:text-slate-400 dark:hover:text-[#ec5b13] text-sm font-medium transition-colors group">
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Quay lại đăng nhập
            </Link>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center text-slate-400 dark:text-slate-600 text-xs">
          <p>The Visionary FAIC HACKATHON PROJECT © 2026</p>
        </div>
      </div>
    </div>
  );
}
