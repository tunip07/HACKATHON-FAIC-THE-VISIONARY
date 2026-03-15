import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function TopNav() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const isWallet = currentPath === '/wallet';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-[#ec5b13]">
          {isWallet ? (
            <>
              <div className="size-9 bg-[#ec5b13] rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-[#ec5b13]">F-Pay</h1>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-3xl font-bold">local_parking</span>
              <h2 className="text-xl font-extrabold tracking-tight">FPT <span className="text-slate-900 dark:text-white">Parking</span></h2>
            </>
          )}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-semibold transition-colors ${currentPath === '/' ? 'text-[#ec5b13]' : 'text-slate-600 dark:text-slate-300 hover:text-[#ec5b13]'}`}>Trang chủ</Link>
          <Link to="/services" className={`text-sm font-semibold transition-colors ${currentPath === '/services' ? 'text-[#ec5b13]' : 'text-slate-600 dark:text-slate-300 hover:text-[#ec5b13]'}`}>Dịch vụ</Link>
          <Link to="/wallet" className={`text-sm font-semibold transition-colors ${currentPath === '/wallet' ? 'text-[#ec5b13]' : 'text-slate-600 dark:text-slate-300 hover:text-[#ec5b13]'}`}>Ví của tôi</Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-1.5 border border-transparent focus-within:border-[#ec5b13]/50 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-32 lg:w-48 placeholder:text-slate-400 outline-none ml-2" placeholder="Tìm kiếm..." type="text" />
          </div>
          
          {isAuthenticated ? (
            <>
              <button className="material-symbols-outlined p-2 text-slate-600 dark:text-slate-300 hover:text-[#ec5b13] transition-colors">notifications</button>
              <Link to="/profile" className="h-8 w-8 rounded-full bg-[#ec5b13]/10 border border-[#ec5b13]/20 flex items-center justify-center overflow-hidden">
                <img alt="User Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2G05ZLt4d3huz0oaq5NjB2ZoIkBk88Hnu87v1vlvsfjFeGE8i9qa3yPuVfF2qp-9-sbsL6NvqX0pHKMQAMt4rxc7GhEsAlJ4W6EtrnaFGePApbbl0nLczL0PhFkWKZZ-V9Z6vyFYL9NPAdW9tgME3eVfYHQ2_wb5WQL2vPnwfaQZ9cKuc_71RDsa_iy-Q9iDJv-6yWsWBZcJZJ1nvfGr66AnsQw83xSXx4RxGEHq-zqt1hIGq84g12DCyM4QrPpBp-P51gBN0" />
              </Link>
            </>
          ) : (
            <Link to="/login" className="bg-[#ec5b13] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#ec5b13]/90 transition-all shadow-lg shadow-[#ec5b13]/20">
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
    <div className="flex justify-around items-center h-16 px-4">
      <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${currentPath === '/dashboard' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${currentPath === '/dashboard' ? 'fill' : ''}`}>home</span>
        <span className="text-[10px] font-bold">Trang chủ</span>
      </Link>
      <Link to="/wallet" className={`flex flex-col items-center gap-1 ${currentPath === '/wallet' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${currentPath === '/wallet' ? 'fill' : ''}`}>account_balance_wallet</span>
        <span className="text-[10px] font-bold">Ví của tôi</span>
      </Link>
      <Link to="/settings" className={`flex flex-col items-center gap-1 ${currentPath === '/settings' || currentPath === '/profile' ? 'text-primary' : 'text-slate-400'}`}>
        <span className={`material-symbols-outlined ${currentPath === '/settings' || currentPath === '/profile' ? 'fill' : ''}`}>settings</span>
        <span className="text-[10px] font-bold">Cài đặt</span>
      </Link>
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 px-3 mb-4">Tài khoản cá nhân</h2>
        <nav className="space-y-1">
          <Link to="/profile" className={`flex items-center gap-3 px-3 py-3 rounded-xl ${currentPath === '/profile' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-slate-50 text-slate-600'}`}>
            <span className="material-symbols-outlined">person</span>
            <span>Thông tin cá nhân</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-8">
            <span className="material-symbols-outlined">logout</span>
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
