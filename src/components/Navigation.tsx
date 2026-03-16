import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GooeyNav, { type GooeyNavItem } from './GooeyNav';

const getAvatarUrl = (name?: string | null, avatar?: string) =>
  avatar ||
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=ec5b13&color=fff`;

const topNavLinks: GooeyNavItem[] = [
  { to: '/', label: 'Trang chủ' },
  { to: '/services', label: 'Dịch vụ' },
  { to: '/wallet', label: 'Ví của tôi' },
];

const mobileNavLinks = [
  { to: '/services', label: 'Dịch vụ', icon: 'home' },
  { to: '/wallet', label: 'Ví', icon: 'account_balance_wallet' },
  { to: '/profile', label: 'Tài khoản', icon: 'person' },
];

const sidebarLinks = [{ to: '/profile', label: 'Thông tin cá nhân', icon: 'person' }];

export function TopNav() {
  const { isAuthenticated, isAuthLoading, user } = useAuth();
  const avatarUrl = getAvatarUrl(user?.name, user?.avatar);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="justify-self-start text-[#ec5b13]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl font-bold">local_parking</span>
            <h1 className="text-xl font-extrabold tracking-tight">
              FPT <span className="text-slate-900 dark:text-white">Parking</span>
            </h1>
          </div>
        </Link>

        <div className="hidden md:block">
          <GooeyNav items={topNavLinks} />
        </div>

        <div className="flex min-w-[120px] items-center justify-self-end gap-3">
          {isAuthLoading ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"></div>
          ) : isAuthenticated ? (
            <Link
              to="/profile"
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#ec5b13]/20 bg-[#ec5b13]/10 shadow-[0_10px_28px_-18px_rgba(236,91,19,0.7)] transition-transform hover:scale-[1.02]"
            >
              <img alt={user?.name || 'Ảnh đại diện'} className="h-full w-full object-cover" src={avatarUrl} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-[#ec5b13] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#ec5b13]/20 transition-all hover:bg-[#ec5b13]/90"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-16 items-center justify-around px-4">
      {mobileNavLinks.map((item) => {
        const isActive = currentPath === item.to;

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-primary' : 'text-slate-400'}`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="space-y-8">
      <div>
        <nav className="space-y-1">
          {sidebarLinks.map((item) => {
            const isActive = currentPath === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 ${
                  isActive ? 'bg-primary/10 font-semibold text-primary' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="mt-8 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
