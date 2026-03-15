import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopNav } from '../components/Navigation';

export default function RegisterVehicle() {
  const [licensePlate, setLicensePlate] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setScanComplete(false);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsScanning(false);
    }
  };

  const captureFace = () => {
    // Simulate face capture
    setScanComplete(true);
    stopCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanComplete) {
      alert('Vui lòng quét khuôn mặt trước khi đăng ký!');
      return;
    }
    // In a real app, this would send data to the server
    alert('Đăng ký xe thành công!');
    navigate('/dashboard');
  };

  return (
    <div className="bg-[#f8f6f6] dark:bg-[#221610] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <TopNav />

      {/* Main Content Container */}
      <main className="flex-grow flex items-center justify-center p-6 bg-gradient-to-br from-[#f8f6f6] to-[#ec5b13]/5 dark:from-[#221610] dark:to-[#ec5b13]/10">
        
        {/* Registration Card */}
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
          
          {/* Header Section inside Card */}
          <div className="p-8 text-center border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-3xl font-black text-[#ec5b13] mb-2 uppercase tracking-tight">Đăng ký gửi xe</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Cung cấp thông tin khuôn mặt và biển số xe để bắt đầu</p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="p-8 space-y-8">
              
              {/* Scanning Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ec5b13]">face</span>
                    Quét khuôn mặt (SCAN)
                  </h3>
                  <span className="text-xs bg-[#ec5b13]/10 text-[#ec5b13] px-3 py-1 rounded-full font-bold">Yêu cầu</span>
                </div>

                <div className="relative group">
                  <div className="aspect-video relative bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 group-hover:border-[#ec5b13] transition-colors">
                    <div className="absolute inset-0 bg-[#ec5b13]/5 hidden group-hover:block transition-all pointer-events-none"></div>
                    
                    {!isScanning && !scanComplete && (
                      <div className="flex flex-col items-center gap-3 relative z-10 w-full h-full justify-center">
                        <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-lg text-[#ec5b13]">
                          <span className="material-symbols-outlined text-4xl">videocam</span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Bật camera để nhận diện</span>
                      </div>
                    )}

                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className={`absolute inset-0 w-full h-full object-cover ${!isScanning ? 'hidden' : ''}`}
                    />

                    {isScanning && (
                      <>
                        <div className="absolute inset-4 border-2 border-[#ec5b13]/20 rounded-xl pointer-events-none border-l-[#ec5b13] border-t-[#ec5b13] w-12 h-12 top-4 left-4"></div>
                        <div className="absolute inset-4 border-2 border-[#ec5b13]/20 rounded-xl pointer-events-none border-r-[#ec5b13] border-t-[#ec5b13] w-12 h-12 top-4 right-4"></div>
                        <div className="absolute inset-4 border-2 border-[#ec5b13]/20 rounded-xl pointer-events-none border-l-[#ec5b13] border-b-[#ec5b13] w-12 h-12 bottom-4 left-4"></div>
                        <div className="absolute inset-4 border-2 border-[#ec5b13]/20 rounded-xl pointer-events-none border-r-[#ec5b13] border-b-[#ec5b13] w-12 h-12 bottom-4 right-4"></div>
                      </>
                    )}

                    {scanComplete && (
                      <div className="flex flex-col items-center gap-3 text-green-500 absolute inset-0 bg-white dark:bg-slate-900 z-10 w-full h-full justify-center">
                        <span className="material-symbols-outlined text-6xl drop-shadow-sm">check_circle</span>
                        <span className="font-bold text-lg text-slate-800 dark:text-white">Đã quét thành công</span>
                        <button 
                          type="button"
                          onClick={startCamera}
                          className="text-sm text-slate-500 hover:text-[#ec5b13] underline mt-1"
                        >
                          Quét lại
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Controls */}
                <div className="flex flex-col items-center gap-4 pt-2">
                  <div className="flex w-full gap-3">
                    {!isScanning ? (
                      <button 
                        type="button" 
                        onClick={startCamera} 
                        className="flex-1 bg-[#ec5b13] text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ec5b13]/90 transition-all active:scale-95 shadow-lg shadow-[#ec5b13]/20"
                      >
                        <span className="material-symbols-outlined">photo_camera</span>
                        Quay Video
                      </button>
                    ) : (
                      <button 
                        type="button" 
                        onClick={captureFace} 
                        className="flex-1 bg-red-500 text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20"
                      >
                        <span className="material-symbols-outlined">camera</span>
                        Chụp ảnh
                      </button>
                    )}
                    
                    <div className="flex items-center justify-center px-1">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-tighter">hoặc</span>
                    </div>
                    
                    <button 
                      type="button" 
                      className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 h-12 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                    >
                      <span className="material-symbols-outlined">upload</span>
                      Tải ảnh lên
                    </button>
                  </div>
                </div>
              </div>

              {/* License Plate Section */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ec5b13]">directions_car</span>
                  Thông tin biển số xe
                </h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400">badge</span>
                  </div>
                  <input 
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                    required
                    className="w-full h-14 pl-12 pr-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-[#ec5b13] text-lg font-bold tracking-widest outline-none placeholder:text-slate-400 placeholder:font-normal placeholder:tracking-normal text-slate-900 dark:text-white uppercase"
                    placeholder="Ví dụ: 29A-12345" 
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={!scanComplete || !licensePlate}
                className="w-full bg-[#ec5b13] disabled:bg-slate-300 disabled:cursor-not-allowed text-white h-14 rounded-2xl text-lg font-black uppercase tracking-wider hover:bg-[#ec5b13]/90 transition-all shadow-xl shadow-[#ec5b13]/30 mt-4 active:scale-[0.98]"
              >
                Xác nhận đăng ký
              </button>
              
              {/* Footer Help inside Card */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 text-center rounded-2xl -mx-8 -mb-8 mt-8 border-t border-slate-100 dark:border-slate-800">
                <Link to="#" className="text-[#ec5b13] font-bold text-sm flex items-center justify-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-base">help</span>
                  Xem hướng dẫn đăng ký chi tiết
                </Link>
              </div>

            </div>
          </form>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
        <p>
          <span style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>
            The Visionary FAIC HACKATHON PROJECT © 2026
          </span>
        </p>
      </footer>
    </div>
  );
}
