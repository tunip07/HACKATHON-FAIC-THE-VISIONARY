import { Link } from 'react-router-dom';
import { TopNav } from '../components/Navigation';

export default function Services() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f8f6f6] dark:bg-[#221610] font-sans text-slate-900 dark:text-slate-100 antialiased">
      <div className="layout-container flex h-full grow flex-col">
        <TopNav />

        {/* Main Content Container */}
        <main className="flex flex-1 flex-col px-4 md:px-20 lg:px-40 py-8 gap-8">
          {/* Page Title Section */}
          <div className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Dịch vụ của tôi</h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Quản lý phương tiện cá nhân và theo dõi lịch sử ra vào tại các cơ sở FPT Education.</p>
          </div>

          {/* Section: My Vehicles */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ec5b13]">motorcycle</span>
                Danh sách xe của tôi
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Vehicle Card 1 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg mb-4 overflow-hidden relative" title="Hình ảnh xe Honda Vision màu trắng" style={{ backgroundImage: 'url("https://product.hstatic.net/200000795625/product/xe_honda_vision_truong_thanh25_a13990b9522f40209e3832cdfa3429f6.png")' }}>
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Đang hoạt động</div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Honda Vision</h3>
                  <div className="flex items-center gap-2 text-[#ec5b13] font-mono font-bold bg-[#ec5b13]/10 w-fit px-2 py-0.5 rounded">
                    <span className="material-symbols-outlined text-sm">license</span>
                    29A1-123.45
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                    <span>Đăng ký: 12/05/2023</span>
                    <button className="text-[#ec5b13] font-bold hover:underline">Chi tiết</button>
                  </div>
                </div>
              </div>

              {/* Vehicle Card 2 */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg mb-4 overflow-hidden relative" title="Hình ảnh xe Yamaha Exciter màu đen" style={{ backgroundImage: 'url("https://yamaha-motor.com.vn/wp/wp-content/uploads/2022/10/Exciter-150-Mat-Grey_005.png")' }}>
                  <div className="absolute top-2 right-2 bg-slate-400 text-white text-[10px] uppercase font-bold px-2 py-1 rounded">Hết hạn</div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">Yamaha Exciter</h3>
                  <div className="flex items-center gap-2 text-slate-500 font-mono font-bold bg-slate-100 dark:bg-slate-700 w-fit px-2 py-0.5 rounded">
                    <span className="material-symbols-outlined text-sm">license</span>
                    30K1-678.90
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                    <span>Đăng ký: 01/01/2023</span>
                    <button className="text-[#ec5b13] font-bold hover:underline">Gia hạn ngay</button>
                  </div>
                </div>
              </div>

              {/* Add New Vehicle Placeholder */}
              <Link to="/register" className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center p-8 gap-4 text-slate-400 dark:text-slate-500 hover:border-[#ec5b13] hover:text-[#ec5b13] transition-all cursor-pointer">
                <span className="material-symbols-outlined text-5xl">add_circle</span>
                <span className="font-medium text-center">Đăng ký thêm<br/>phương tiện khác</span>
              </Link>
            </div>
          </section>

          {/* Section: Entrance/Exit History */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ec5b13]">history</span>
                Lịch sử Ra/Vào
              </h2>
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">calendar_today</span>
                  <input className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-[#ec5b13] focus:border-[#ec5b13] outline-none" type="date" />
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg">directions_car</span>
                  <input className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-[#ec5b13] focus:border-[#ec5b13] min-w-[180px] outline-none" placeholder="Tìm biển số xe..." type="text" />
                </div>
                <button className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Lọc
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Thời gian</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Loại hành động</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bãi gửi xe</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Biển số xe</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {/* Row 1 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">10:45 - 24/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span className="material-symbols-outlined text-xs">login</span> Vào
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Hòa Lạc - Bãi A</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-green-600 font-medium">
                          <span className="size-1.5 rounded-full bg-green-500"></span> Thành công
                        </span>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">08:12 - 24/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ec5b13]/10 text-[#ec5b13]">
                          <span className="material-symbols-outlined text-xs">logout</span> Ra
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Hòa Lạc - Bãi A</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-green-600 font-medium">
                          <span className="size-1.5 rounded-full bg-green-500"></span> Thành công
                        </span>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">17:30 - 23/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ec5b13]/10 text-[#ec5b13]">
                          <span className="material-symbols-outlined text-xs">logout</span> Ra
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Cầu Giấy - Hầm B1</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-green-600 font-medium">
                          <span className="size-1.5 rounded-full bg-green-500"></span> Thành công
                        </span>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium">07:55 - 23/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span className="material-symbols-outlined text-xs">login</span> Vào
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Cầu Giấy - Hầm B1</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs text-red-600 font-medium">
                          <span className="size-1.5 rounded-full bg-red-500"></span>Lỗi
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hiển thị 4 trong tổng số 128 bản ghi</p>
                <div className="flex gap-2">
                  <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  <button className="size-8 flex items-center justify-center rounded border border-[#ec5b13] bg-[#ec5b13] text-white font-bold text-xs">1</button>
                  <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100">2</button>
                  <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100">3</button>
                  <button className="size-8 flex items-center justify-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto px-4 md:px-20 lg:px-40 py-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#221610]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-[#ec5b13] grayscale opacity-70">
              <span className="material-symbols-outlined">local_parking</span>
              <span className="font-bold">FPT PARKING</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">The Visionary FAIC HACKATHON PROJECT © 2026</p>
            <div className="flex gap-6">
              <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-[#ec5b13] transition-colors text-sm">Chính sách bảo mật</Link>
              <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-[#ec5b13] transition-colors text-sm">Điều khoản sử dụng</Link>
              <Link to="#" className="text-slate-500 dark:text-slate-400 hover:text-[#ec5b13] transition-colors text-sm">Hỗ trợ</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
