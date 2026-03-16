import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const getAvatarUrl = (name?: string | null, avatar?: string) =>
  avatar ||
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=ec5b13&color=fff&size=128`;

export default function Profile() {
  const { user, logout, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.name) {
      const parts = user.name.split(' ');
      setLastName(parts.pop() || '');
      setFirstName(parts.join(' '));
    } else {
      setFirstName('');
      setLastName('');
    }

    setPhone(user?.phone || '');
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      await updateProfile({
        fullName: `${firstName} ${lastName}`.trim(),
        phone,
      });
      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Không thể lưu thay đổi. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const avatarUrl = getAvatarUrl(user?.name, user?.avatar);
  const isGoogleAccount = user?.provider === 'google';

  return (
    <div className="p-8 md:p-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-black tracking-tight">Thông tin cá nhân</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Cập nhật chi tiết hồ sơ và cách mọi người có thể tìm thấy bạn.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={logout}
              className="rounded-xl border border-red-200 px-6 py-2.5 font-semibold text-red-500 transition-colors hover:bg-red-50"
            >
              Đăng xuất
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-white shadow-lg shadow-primary/20 transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {saving && (
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {saved ? 'Đã lưu!' : saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-background-dark">
          <div className="p-8">
            <div className="mb-10 flex flex-col gap-8 md:flex-row md:items-center">
              <div className="relative">
                <img
                  className="h-32 w-32 rounded-full border-4 border-slate-50 object-cover dark:border-slate-800"
                  alt="Ảnh đại diện"
                  src={avatarUrl}
                />
                <div className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-primary p-2 text-white shadow-lg dark:border-slate-900">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="mb-1 text-xl font-bold">{user?.name || 'Người dùng'}</h3>
                <p className="mb-1 text-sm text-slate-500">{user?.email}</p>
                <p className="text-sm text-slate-400">
                  {isGoogleAccount ? 'Đã đăng nhập qua Google' : 'Tài khoản email'}
                </p>
              </div>
            </div>

            <hr className="mb-10 border-slate-100 dark:border-slate-800" />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Họ</label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800/50"
                  placeholder="Nhập họ"
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tên</label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800/50"
                  placeholder="Nhập tên"
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Địa chỉ Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    mail
                  </span>
                  <input
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-3 pl-12 pr-4 text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800"
                    type="email"
                    value={user?.email || ''}
                    readOnly
                  />
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Email không thể thay đổi sau khi đăng ký.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Số điện thoại</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    call
                  </span>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-12 pr-4 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800/50"
                    placeholder="0123 456 789"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-primary/50 dark:border-slate-800 dark:bg-background-dark">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">shield_person</span>
              </div>
              <div>
                <h4 className="font-bold">Xác thực 2 lớp</h4>
                <p className="text-xs text-slate-500">Bảo vệ tài khoản an toàn hơn</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 transition-colors group-hover:text-primary">
              chevron_right
            </span>
          </div>

          <div className="group flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-primary/50 dark:border-slate-800 dark:bg-background-dark">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div>
                <h4 className="font-bold">Lịch sử đăng nhập</h4>
                <p className="text-xs text-slate-500">Xem các thiết bị đã truy cập</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-300 transition-colors group-hover:text-primary">
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
