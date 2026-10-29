import React from 'react';
import { Coffee, ArrowRight, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData.js';

interface HeroProps {
  onOrderNow: () => void;
  onViewMenu?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onViewMenu }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Warm Ambient Background Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#F7EAD9]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-10 -right-20 w-80 h-80 bg-[#E6D7C3]/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-6">
          {/* Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-xs font-semibold tracking-wide text-[#826955] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#C47A3B]" />
            <span>Welcome to our cozy sanctuary</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#25160C] leading-[1.2] text-balance px-2">
            Every cup tells a story of{' '}
            <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#C47A3B] whitespace-nowrap">
              warmth & craft.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-[#5A3E25] font-normal leading-relaxed max-w-2xl px-3">
            {CAFE_INFO.tagline} Step inside for slow-brewed single-origin coffees, fragrant spiced chais, and melt-in-your-mouth pastries.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-xs sm:max-w-none px-4 sm:px-0">
            <button
              onClick={onViewMenu}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#3D2817] text-[#FDFBF7] font-semibold text-sm sm:text-base hover:bg-[#C47A3B] transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C47A3B] focus:ring-offset-2 min-h-[46px]"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
            </button>

            <button
              onClick={onOrderNow}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F4ECE1] text-[#3D2817] font-semibold text-sm sm:text-base border border-[#E6D7C3] hover:bg-[#E6D7C3] hover:border-[#C47A3B] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C47A3B] min-h-[46px]"
            >
              <Coffee className="w-4 h-4 text-[#C47A3B]" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
