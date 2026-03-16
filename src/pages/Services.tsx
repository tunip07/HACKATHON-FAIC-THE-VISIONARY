import { Link } from 'react-router-dom';
import { TopNav } from '../components/Navigation';

export default function Services() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f8f6f6] font-sans text-slate-900 antialiased dark:bg-[#221610] dark:text-slate-100">
      <div className="layout-container flex h-full grow flex-col">
        <TopNav />

        <main className="flex flex-1 flex-col gap-8 px-4 py-8 md:px-20 lg:px-40">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-[-0.033em] text-slate-900 dark:text-white">
              Dịch vụ của tôi
            </h1>
            <p className="text-base text-slate-500 dark:text-slate-400">
              Quản lý phương tiện cá nhân và theo dõi lịch sử ra vào tại các cơ sở FPT Education.
            </p>
          </div>

          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[22px] font-bold leading-tight text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-[#ec5b13]">motorcycle</span>
                Danh sách xe của tôi
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                <div
                  className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat"
                  title="Hình ảnh xe Honda Vision màu trắng"
                  style={{
                    backgroundImage:
                      'url("https://product.hstatic.net/200000795625/product/xe_honda_vision_truong_thanh25_a13990b9522f40209e3832cdfa3429f6.png")',
                  }}
                >
                  <div className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    Đang hoạt động
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Honda Vision</h3>
                  <div className="flex w-fit items-center gap-2 rounded bg-[#ec5b13]/10 px-2 py-0.5 font-mono font-bold text-[#ec5b13]">
                    <span className="material-symbols-outlined text-sm">license</span>
                    29A1-123.45
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    <span>Đăng ký: 12/05/2023</span>
                    <button type="button" className="font-bold text-[#ec5b13] hover:underline">
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
                <div
                  className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat"
                  title="Hình ảnh xe Yamaha Exciter màu đen"
                  style={{
                    backgroundImage:
                      'url("https://yamaha-motor.com.vn/wp/wp-content/uploads/2022/10/Exciter-150-Mat-Grey_005.png")',
                  }}
                >
                  <div className="absolute right-2 top-2 rounded bg-slate-400 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    Hết hạn
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Yamaha Exciter</h3>
                  <div className="flex w-fit items-center gap-2 rounded bg-slate-100 px-2 py-0.5 font-mono font-bold text-slate-500 dark:bg-slate-700">
                    <span className="material-symbols-outlined text-sm">license</span>
                    30K1-678.90
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    <span>Đăng ký: 01/01/2023</span>
                    <button type="button" className="font-bold text-[#ec5b13] hover:underline">
                      Gia hạn ngay
                    </button>
                  </div>
                </div>
              </div>

              <Link
                to="/register"
                className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-400 transition-all hover:border-[#ec5b13] hover:text-[#ec5b13] dark:border-slate-700 dark:text-slate-500"
              >
                <span className="material-symbols-outlined text-5xl">add_circle</span>
                <span className="font-medium">
                  Đăng ký thêm
                  <br />
                  phương tiện khác
                </span>
              </Link>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <h2 className="flex items-center gap-2 text-[22px] font-bold leading-tight text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-[#ec5b13]">history</span>
                Lịch sử Ra/Vào
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-lg text-slate-400">
                    calendar_today
                  </span>
                  <input
                    className="rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-[#ec5b13] focus:ring-[#ec5b13] dark:border-slate-700 dark:bg-slate-800"
                    type="date"
                  />
                </div>

                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-lg text-slate-400">
                    directions_car
                  </span>
                  <input
                    className="min-w-[180px] rounded-xl border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-[#ec5b13] focus:ring-[#ec5b13] dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Tìm biển số xe..."
                    type="text"
                  />
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                >
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Lọc
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Thời gian
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Loại hành động
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Bãi gửi xe
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Biển số xe
                      </th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-6 py-4 text-sm font-medium">10:45 - 24/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span className="material-symbols-outlined text-xs">login</span>
                          Vào
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Hòa Lạc - Bãi A</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-green-600">
                          <span className="size-1.5 rounded-full bg-green-500"></span>
                          Thành công
                        </span>
                      </td>
                    </tr>

                    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-6 py-4 text-sm font-medium">08:12 - 24/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ec5b13]/10 px-3 py-1 text-xs font-bold text-[#ec5b13]">
                          <span className="material-symbols-outlined text-xs">logout</span>
                          Ra
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Hòa Lạc - Bãi A</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-green-600">
                          <span className="size-1.5 rounded-full bg-green-500"></span>
                          Thành công
                        </span>
                      </td>
                    </tr>

                    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-6 py-4 text-sm font-medium">17:30 - 23/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ec5b13]/10 px-3 py-1 text-xs font-bold text-[#ec5b13]">
                          <span className="material-symbols-outlined text-xs">logout</span>
                          Ra
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Cầu Giấy - Hầm B1</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-green-600">
                          <span className="size-1.5 rounded-full bg-green-500"></span>
                          Thành công
                        </span>
                      </td>
                    </tr>

                    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-6 py-4 text-sm font-medium">07:55 - 23/05/2024</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <span className="material-symbols-outlined text-xs">login</span>
                          Vào
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">FPT Cầu Giấy - Hầm B1</td>
                      <td className="px-6 py-4 text-sm font-mono font-bold">29A1-123.45</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium text-red-600">
                          <span className="size-1.5 rounded-full bg-red-500"></span>
                          Lỗi
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-700 dark:bg-slate-900/50">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Hiển thị 4 trong tổng số 128 bản ghi
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    disabled
                  >
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded border border-[#ec5b13] bg-[#ec5b13] text-xs font-bold text-white"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                  >
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-auto border-t border-slate-200 bg-white px-4 py-10 dark:border-slate-800 dark:bg-[#221610] md:px-20 lg:px-40">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 text-[#ec5b13] grayscale opacity-70">
              <span className="material-symbols-outlined">local_parking</span>
              <span className="font-bold">FPT PARKING</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              The Visionary FAIC HACKATHON PROJECT © 2026
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-sm text-slate-500 transition-colors hover:text-[#ec5b13] dark:text-slate-400">
                Chính sách bảo mật
              </Link>
              <Link to="#" className="text-sm text-slate-500 transition-colors hover:text-[#ec5b13] dark:text-slate-400">
                Điều khoản sử dụng
              </Link>
              <Link to="#" className="text-sm text-slate-500 transition-colors hover:text-[#ec5b13] dark:text-slate-400">
                Hỗ trợ
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
