import { Outlet, useLocation } from 'react-router-dom';
import { TopNav, BottomNav, Sidebar } from './Navigation';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* Desktop Top Nav */}
      <div className="hidden md:block">
        <TopNav />
      </div>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar for specific routes */}
        {['/wallet', '/settings', '/profile'].includes(path) && (
          <div className="hidden lg:block w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 p-6">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 w-full pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <BottomNav />
      </div>
    </div>
  );
}
