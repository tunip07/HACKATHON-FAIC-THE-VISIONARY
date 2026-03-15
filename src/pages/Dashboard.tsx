import { useState } from 'react';
import { Link } from 'react-router-dom';
import { chatWithAI } from '../services/gemini';

export default function Dashboard() {
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAiProcess = async () => {
    if (!aiInput.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await chatWithAI(aiInput);
      setAiResponse(result);
    } catch (error) {
      setAiResponse("Đã xảy ra lỗi khi xử lý yêu cầu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white dark:bg-slate-900 min-h-screen shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <Link to="/profile" className="flex size-12 shrink-0 items-center">
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary" style={{backgroundImage: 'url(https://media.tenor.com/QbmbfSEMO9cAAAAe/rakai-reading.png)'}}></div>
        </Link>
        <div className="flex-1 px-3">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Xin Chào</p>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Nguyễn Tuấn Điệp</h2>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="relative flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary"></span>
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="p-4">
        <div className="relative flex flex-col rounded-xl overflow-hidden shadow-lg bg-primary p-6">
          <div className="bg-white/20 w-fit p-1 rounded-lg px-2 mb-1">
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">Số lượng có hạn</span>
          </div>
          <p className="text-white text-2xl font-bold leading-tight mt-2">Đăng Ký Gửi Xe Mới</p>
          <p className="text-white/90 text-sm font-normal mb-4">Vui lòng chọn khu vực và bãi đỗ xe của bạn.</p>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <select className="w-full h-11 px-4 rounded-xl bg-white border-none text-slate-900 text-sm font-medium appearance-none outline-none">
                <option>Chọn Tỉnh thành</option>
                <option>Hà Nội</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
            <div className="relative">
              <select className="w-full h-11 px-4 rounded-xl bg-white border-none text-slate-900 text-sm font-medium appearance-none outline-none">
                <option>Chọn Tòa nhà / Bãi gửi xe</option>
                <option>Tòa nhà Alpha</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
            <Link to="/register" className="flex w-full items-center justify-center rounded-xl h-12 bg-white text-primary text-base font-bold mt-1 shadow-md">
              Đăng Ký Ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Wallet */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ví F-Pay</h2>
          <Link to="/wallet" className="text-primary text-sm font-semibold flex items-center">Chi tiết <span className="material-symbols-outlined text-sm">chevron_right</span></Link>
        </div>
        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-900 dark:bg-slate-800 shadow-xl">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Tổng số dư</p>
              <p className="text-white tracking-tight text-3xl font-extrabold">1.250.000 <span className="text-lg font-medium">VND</span></p>
            </div>
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <span className="material-symbols-outlined">account_balance_wallet</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-primary h-11 text-white font-bold text-sm">
              <span className="material-symbols-outlined text-lg">add_circle</span> Nạp tiền
            </button>
            <Link to="/wallet" className="flex items-center justify-center gap-2 rounded-xl bg-white/10 h-11 text-white font-bold text-sm">
              <span className="material-symbols-outlined text-lg">history</span> Lịch sử
            </Link>
          </div>
        </div>
      </div>

      {/* Vehicles */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Xe Của Tôi</h2>
          <button className="size-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-xl">delete</span>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="size-14 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <span className="material-symbols-outlined text-3xl">motorcycle</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base">Honda Air Blade</h3>
              <p className="text-slate-500 text-sm font-medium">29-G1 • 123.45</p>
            </div>
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase">Đang hoạt động</span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm opacity-80">
            <div className="size-14 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 shrink-0">
              <span className="material-symbols-outlined text-3xl">motorcycle</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base">Yamaha Exciter</h3>
              <p className="text-slate-500 text-sm font-medium">30-K5 • 987.65</p>
            </div>
            <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">Hết hạn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
