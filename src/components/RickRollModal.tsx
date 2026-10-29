import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData.js';

interface RickRollModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export const RickRollModal: React.FC<RickRollModalProps> = ({
  isOpen,
  onClose,
  title = 'Online ordering coming soooon!',
  subtitle = "Thanks for tasting the dream! While our baristas tune the espresso machines for real online orders, enjoy this exclusive VIP secret transmission right here:"
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Embedded Video Transmission"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-[#FDFBF7] max-w-lg w-full rounded-3xl p-5 sm:p-7 border border-[#E6D7C3] shadow-2xl z-10 text-center space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Top close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#826955] hover:text-[#25160C] hover:bg-[#F4ECE1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
          aria-label="Close video modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Coffee / Sparkles Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-xs font-semibold text-[#C47A3B]">
          <Sparkles className="w-3.5 h-3.5 text-[#C47A3B]" />
          <span>Special Transmission</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#25160C] leading-snug">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#5A3E25] leading-relaxed max-w-md mx-auto">
          {subtitle}
        </p>

        {/* In-website Embedded YouTube Video Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-[#E6D7C3] bg-black">
          <iframe
            src={CAFE_INFO.rickRollEmbedUrl}
            title="Caffeine Cove Special Transmission"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#3D2817] text-[#FDFBF7] text-xs font-semibold hover:bg-[#C47A3B] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
          >
            Back to Caffeine Cove
          </button>
        </div>
      </div>
    </div>
  );
};
