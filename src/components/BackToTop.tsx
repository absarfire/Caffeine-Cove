import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 p-2.5 sm:p-3 rounded-full bg-[#3D2817]/90 hover:bg-[#C47A3B] text-[#FDFBF7] shadow-lg backdrop-blur-sm border border-[#E6D7C3]/60 transition-all duration-300 transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      } hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#C47A3B]`}
    >
      <ArrowUp className="w-4 h-4" />
    </button>
  );
};
