import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight mb-2">Thông tin cá nhân</h2>
            <p className="text-slate-500 dark:text-slate-400">Cập nhật chi tiết hồ sơ và cách mọi người có thể tìm thấy bạn.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Hủy</button>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">Lưu thay đổi</button>
          </div>
        </div>
        {/* Profile Section */}
        <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
              <div className="relative">
                <img className="w-32 h-32 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800" alt="Ảnh chân dung người dùng Nguyễn Văn A kích thước lớn" src="https://media.tenor.com/QbmbfSEMO9cAAAAe/rakai-reading.png" />
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg border-2 border-white dark:border-background-dark">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Ảnh đại diện</h3>
                <p className="text-sm text-slate-500 mb-4">Khuyên dùng ảnh có kích thước ít nhất 400x400px. Định dạng JPG, PNG hoặc GIF.</p>
                <div className="flex gap-3">
                  <button className="text-sm font-bold text-primary hover:underline">Thay đổi ảnh</button>
                  <span className="text-slate-300">|</span>
                  <button className="text-sm font-bold text-red-500 hover:underline">Xóa ảnh hiện tại</button>
                </div>
              </div>
            </div>
            <hr className="border-slate-100 dark:border-slate-800 mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Họ</label>
                <input className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Nhập họ" type="text" defaultValue="Nguyễn" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tên</label>
                <input className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Adam" type="text" defaultValue="Văn A" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Địa chỉ Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                  <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="email@example.com" type="email" defaultValue="nguyenvana@example.com" />
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Email này sẽ được dùng để đăng nhập và khôi phục tài khoản.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Số điện thoại</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">call</span>
                  <input className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="0123 456 789" type="tel" defaultValue="090 123 4567" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Vị trí</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                  <select className="w-full pl-12 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none">
                    <option>Hà Nội, Việt Nam</option>
                    <option>TP. Hồ Chí Minh, Việt Nam</option>
                    <option>Đà Nẵng, Việt Nam</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Secondary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">shield_person</span>
              </div>
              <div>
                <h4 className="font-bold">Xác thực 2 lớp</h4>
                <p className="text-xs text-slate-500">Bảo vệ tài khoản an toàn hơn</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
          </div>
          <div className="p-6 bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div>
                <h4 className="font-bold">Lịch sử đăng nhập</h4>
                <p className="text-xs text-slate-500">Xem các thiết bị đã truy cập</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
          </div>
        </div>
      </div>
    </div>
  );
}