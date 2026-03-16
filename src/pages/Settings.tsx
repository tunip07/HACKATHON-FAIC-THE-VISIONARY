import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const avatarUrl =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=ec5b13&color=fff`;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="w-full">
      <div className="md:hidden max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen shadow-2xl pb-20">
        <header className="sticky top-0 z-10 flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
          <Link to="/services" className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-lg font-bold flex-1 text-center pr-10">Cài đặt</h2>
        </header>

        <div className="p-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 mb-6">
            <div className="size-16 rounded-full overflow-hidden border-2 border-primary">
              <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{user?.name || 'Người dùng'}</h3>
              <p className="text-slate-500 text-sm">{user?.email || ''}</p>
            </div>
            <Link to="/profile" className="size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">edit</span>
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Tài khoản</h4>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                <Link to="/profile" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">person</span>
                    <span className="font-semibold text-sm">Thông tin cá nhân</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </Link>
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">lock</span>
                    <span className="font-semibold text-sm">Đổi mật khẩu</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </button>
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">face</span>
                    <span className="font-semibold text-sm">Xác thực khuôn mặt</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Thông báo</h4>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">notifications</span>
                    <span className="font-semibold text-sm">Thông báo đẩy</span>
                  </div>
                  <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">volume_up</span>
                    <span className="font-semibold text-sm">Âm thanh</span>
                  </div>
                  <div className="w-10 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Hỗ trợ</h4>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">help</span>
                    <span className="font-semibold text-sm">Trung tâm trợ giúp</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </button>
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">description</span>
                    <span className="font-semibold text-sm">Điều khoản dịch vụ</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 font-bold mt-8"
            >
              <span className="material-symbols-outlined">logout</span> Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black">Cài đặt hệ thống</h2>
          <p className="text-slate-500 mt-1">Quản lý thông tin cá nhân và các tùy chọn bảo mật của bạn.</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="material-symbols-outlined text-primary">person</span> Thông tin cá nhân
              </h3>

              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="size-24 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-md">
                    <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <button className="absolute bottom-0 right-0 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </button>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Ảnh đại diện</h4>
                  <p className="text-slate-500 text-sm mb-3">JPG, GIF hoặc PNG. Tối đa 5MB.</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold">Tải ảnh lên</button>
                    <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-semibold">Xóa ảnh</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Link to="/profile" className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  Chỉnh sửa hồ sơ
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="material-symbols-outlined text-primary">security</span> Bảo mật
              </h3>

              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Xác thực 2 bước (2FA)</h4>
                    <p className="text-slate-500 text-xs mt-1">Bảo vệ tài khoản của bạn bằng mã xác thực bổ sung.</p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shrink-0">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm">Đăng nhập bằng khuôn mặt</h4>
                    <p className="text-slate-500 text-xs mt-1">Sử dụng FaceID để đăng nhập nhanh chóng.</p>
                  </div>
                  <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer shrink-0">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Đổi mật khẩu
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <span className="material-symbols-outlined text-primary">devices</span> Lịch sử đăng nhập
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined">laptop_mac</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">Thiết bị hiện tại</h4>
                    <p className="text-slate-500 text-xs">Phiên đăng nhập đang hoạt động</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">Thiết bị di động</h4>
                    <p className="text-slate-500 text-xs">Có thể mở rộng sau khi thêm backend session logs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
