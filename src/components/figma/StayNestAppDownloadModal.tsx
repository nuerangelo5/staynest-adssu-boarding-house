import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  X,
  MoreVertical,
  Share,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface StayNestAppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StayNestAppDownloadModal: React.FC<StayNestAppDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>('android');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone
      ) {
        setIsInstalled(true);
      }

      // Listen for the browser's native PWA install signal
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      };

      const handleAppInstalled = () => {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        // Automatically trigger the native browser install banner
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
          setIsInstallable(false);
          setDeferredPrompt(null);
        }
      } catch (err) {
        console.error('PWA install prompt note:', err);
      }
    } else {
      // If browser blocks automatic prompt, guide the user via the visual instructions
      setNoticeMessage('Follow the on-screen steps below to pin StayNest instantly to your device!');
      setTimeout(() => setNoticeMessage(null), 8000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#053728] border border-emerald-500/30 rounded-2xl p-6 text-white shadow-2xl relative my-auto font-sans">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-emerald-300 hover:text-white bg-emerald-900/50 hover:bg-emerald-800 p-2 rounded-full transition-all cursor-pointer border border-emerald-700/40"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30">
            ADSSU Student Boarding
          </span>
          {isInstalled && (
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/80 px-2 py-0.5 rounded-md border border-emerald-700/50 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Installed
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-white tracking-tight">Install StayNest App</h2>
        <p className="text-sm text-emerald-200/80 mb-5">
          Direct mobile installation for Android & iOS with zero parsing errors
        </p>

        {noticeMessage && (
          <div className="p-3 mb-4 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-medium flex items-center gap-2 animate-in fade-in">
            <Info className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{noticeMessage}</span>
          </div>
        )}

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleInstallClick}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mb-5 cursor-pointer active:scale-98"
        >
          <Smartphone className="w-4 h-4 text-amber-300" />
          <span>{isInstalled ? 'Launch Installed StayNest App' : 'Install StayNest'}</span>
        </button>

        {/* Platform Tabs / Instructions */}
        <div className="bg-emerald-950/60 border border-emerald-800/50 rounded-xl p-4">
          <div className="flex gap-2 mb-3 border-b border-emerald-800/40 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('android')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'android'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-300 hover:bg-emerald-900/50'
              }`}
            >
              Android (Chrome)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ios')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'ios'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-300 hover:bg-emerald-900/50'
              }`}
            >
              iPhone / iPad (Safari)
            </button>
          </div>

          {activeTab === 'android' ? (
            <ol className="text-xs text-emerald-200 space-y-2 list-decimal list-inside font-medium leading-relaxed">
              <li className="pl-1">
                Tap the Chrome browser menu (
                <strong className="text-white font-mono bg-emerald-900/80 px-1.5 py-0.5 rounded border border-emerald-700/50 inline-flex items-center gap-1">
                  <MoreVertical className="w-3 h-3 text-amber-300 inline" /> 3 dots &#8206;⋮&#8206;
                </strong>{' '}
                in top-right corner).
              </li>
              <li className="pl-1">
                Select <strong className="text-white">&ldquo;Install app&rdquo;</strong> or{' '}
                <strong className="text-white">&ldquo;Add to Home screen&rdquo;</strong>.
              </li>
              <li className="pl-1">
                Tap <strong className="text-white">&ldquo;Install&rdquo;</strong>. StayNest instantly pins to your phone app drawer.
              </li>
            </ol>
          ) : (
            <ol className="text-xs text-emerald-200 space-y-2 list-decimal list-inside font-medium leading-relaxed">
              <li className="pl-1">
                Tap Safari&apos;s{' '}
                <strong className="text-white font-mono bg-emerald-900/80 px-1.5 py-0.5 rounded border border-emerald-700/50 inline-flex items-center gap-1">
                  <Share className="w-3 h-3 text-amber-300 inline" /> Share button
                </strong>{' '}
                on the bottom toolbar.
              </li>
              <li className="pl-1">
                Scroll down and select{' '}
                <strong className="text-white">&ldquo;Add to Home Screen&rdquo;</strong>.
              </li>
              <li className="pl-1">
                Tap <strong className="text-white">&ldquo;Add&rdquo;</strong> in the top right to launch directly from your home screen.
              </li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};
