import { Link } from 'react-router-dom';
import { TopNav } from '../components/Navigation';

export default function Wallet() {
  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <TopNav />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 flex-grow">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          {/* Balance Card */}
          <div className="bg-[#ec5b13] p-6 rounded-xl text-white shadow-lg shadow-[#ec5b13]/20">
            <p className="text-white/80 text-sm font-medium mb-1">Số dư khả dụng</p>
            <h2 className="text-3xl font-black mb-6">5.250.000đ</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-2.5 rounded-lg text-sm font-bold transition-all">
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Nạp
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-2.5 rounded-lg text-sm font-bold transition-all">
                <span className="material-symbols-outlined text-lg">payments</span>
                Rút
              </button>
            </div>
          </div>
          
          <nav className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2">
            <Link to="/wallet" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#ec5b13]/10 text-[#ec5b13] font-bold">
              <span className="material-symbols-outlined">history</span>
              Lịch sử giao dịch
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium transition-colors">
              <span className="material-symbols-outlined">credit_card</span>
              Liên kết thẻ
            </Link>
          </nav>
          
          {/* Monthly Summary Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="font-bold mb-4">Thống kê tháng này</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500"></span>
                  <span className="text-sm text-slate-500">Tổng nạp</span>
                </div>
                <span className="text-sm font-bold text-emerald-600">+12.0M</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-rose-500"></span>
                  <span className="text-sm text-slate-500">Tổng chi</span>
                </div>
                <span className="text-sm font-bold text-rose-600">-4.5M</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-[#ec5b13]" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-slate-400">Bạn đã chi tiêu 65% hạn mức ngân sách đặt ra.</p>
            </div>
          </div>
        </aside>
        
        {/* Main Content Area */}
        <section className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Lịch sử giao dịch</h2>
              <p className="text-slate-500 mt-1">Quản lý và theo dõi mọi biến động số dư trong tài khoản F-Pay của bạn.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors text-sm font-semibold">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                30 ngày gần nhất
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#ec5b13] text-white rounded-lg hover:bg-[#ec5b13]/90 transition-colors text-sm font-semibold">
                <span className="material-symbols-outlined text-lg">download</span>
                Xuất báo cáo
              </button>
            </div>
          </div>
          
          {/* Stats Overview Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <p className="text-slate-500 text-sm">Số tiền nạp</p>
                <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">+15%</span>
              </div>
              <h4 className="text-2xl font-bold">+12.000.000đ</h4>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <p className="text-slate-500 text-sm">Số tiền chi</p>
                <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">-5%</span>
              </div>
              <h4 className="text-2xl font-bold">-4.500.000đ</h4>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <p className="text-slate-500 text-sm">Số lượng giao dịch</p>
                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Tháng 10</span>
              </div>
              <h4 className="text-2xl font-bold">48</h4>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button className="px-5 py-2 rounded-full bg-[#ec5b13] text-white text-sm font-bold whitespace-nowrap">Tất cả</button>
            <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold whitespace-nowrap hover:border-[#ec5b13] transition-colors">Nạp tiền</button>
            <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold whitespace-nowrap hover:border-[#ec5b13] transition-colors">Thanh toán</button>
            <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold whitespace-nowrap hover:border-[#ec5b13] transition-colors">Chuyển tiền</button>
            <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold whitespace-nowrap hover:border-[#ec5b13] transition-colors">Hoàn tiền</button>
          </div>
          
          {/* Desktop Transaction Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Giao dịch</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Phân loại</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Số tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* Item 1 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">shopping_cart</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Thanh toán FPT Shop</p>
                        <p className="text-xs text-slate-500">Mã GD: #FPT120934</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">14:30 - 25/10/2023</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400">Mua sắm</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span className="text-xs font-bold">Thành công</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-rose-500">-2.450.000đ</p>
                  </td>
                </tr>
                {/* Item 2 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">add_circle</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Nạp tiền từ Vietcombank</p>
                        <p className="text-xs text-slate-500">Mã GD: #VCB558291</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">09:15 - 24/10/2023</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400">Nạp tiền</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span className="text-xs font-bold">Thành công</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-emerald-600">+5.000.000đ</p>
                  </td>
                </tr>
                {/* Item 3 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">wifi</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Cước Internet FPT</p>
                        <p className="text-xs text-slate-500">Mã GD: #INT992011</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">18:00 - 22/10/2023</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400">Hóa đơn</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <span className="material-symbols-outlined text-sm">pending</span>
                      <span className="text-xs font-bold">Đang xử lý</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-rose-500">-350.000đ</p>
                  </td>
                </tr>
                {/* Item 4 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Chuyển tiền cho Lê Thị B</p>
                        <p className="text-xs text-slate-500">Mã GD: #TRS441029</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">11:20 - 21/10/2023</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400">Chuyển tiền</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span className="text-xs font-bold">Thành công</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-rose-500">-1.000.000đ</p>
                  </td>
                </tr>
                {/* Item 5 */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">electric_bolt</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Thanh toán Tiền điện</p>
                        <p className="text-xs text-slate-500">Mã GD: #ELE001293</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">08:45 - 20/10/2023</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400">Hóa đơn</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span className="material-symbols-outlined text-sm">error</span>
                      <span className="text-xs font-bold">Thất bại</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-sm font-black text-slate-400">0đ</p>
                  </td>
                </tr>
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <p className="text-sm text-slate-500 font-medium hidden sm:block">Hiển thị 1-5 trong số 48 giao dịch</p>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <div className="flex gap-1">
                  <button className="size-9 bg-[#ec5b13] text-white rounded-lg font-bold text-sm">1</button>
                  <button className="size-9 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-bold text-sm">2</button>
                  <button className="size-9 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-bold text-sm">3</button>
                </div>
                <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="max-w-[1440px] mx-auto px-6 py-12 border-t border-slate-200 dark:border-slate-800 mt-12 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="flex items-center gap-2 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            <div className="size-6 bg-[#ec5b13] rounded flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
            </div>
            <h4 className="text-lg font-black tracking-tight text-[#ec5b13]">F-Pay</h4>
          </Link>
          <div className="flex gap-8">
            <Link to="#" className="text-sm text-slate-500 hover:text-[#ec5b13] transition-colors">Điều khoản</Link>
            <Link to="#" className="text-sm text-slate-500 hover:text-[#ec5b13] transition-colors">Bảo mật</Link>
            <Link to="#" className="text-sm text-slate-500 hover:text-[#ec5b13] transition-colors">Trung tâm hỗ trợ</Link>
          </div>
          <p className="text-sm text-slate-400">
            <span style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', fontSize: '12px', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              The Visionary FAIC HACKATHON PROJECT © 2026
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
