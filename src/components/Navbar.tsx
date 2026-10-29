import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { ScrollProgressBar } from './ScrollProgressBar.js';

interface NavbarProps {
  onOpenCart: () => void;
  currentPage: 'home' | 'menu';
  onNavigate: (page: 'home' | 'menu', targetSection?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart, currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { cartTotals } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer to spy on active section when on Home
  useEffect(() => {
    if (currentPage !== 'home') return;
    const sections = ['home', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  // Auto-close mobile drawer whenever page or route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  const navLinks = [
    { name: 'Home', page: 'home' as const, section: 'home' },
    { name: 'Menu', page: 'menu' as const, section: undefined },
    { name: 'About', page: 'home' as const, section: 'about' },
    { name: 'Contact', page: 'home' as const, section: 'contact' },
  ];

  const handleLinkClick = (page: 'home' | 'menu', section?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, section);
  };

  return (
    <>
      <ScrollProgressBar />
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-sm border-b border-[#E6D7C3]/60 py-3'
            : 'bg-[#FDFBF7]/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <button
              onClick={() => handleLinkClick('home', 'home')}
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#C47A3B] rounded-lg p-1 text-left min-w-0"
              aria-label="Caffeine Cove Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#3D2817] flex items-center justify-center text-[#FDFBF7] shadow-sm group-hover:bg-[#C47A3B] transition-colors shrink-0">
                <Coffee className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#3D2817] leading-tight truncate">
                  Caffeine Cove
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase font-medium text-[#C47A3B] leading-none truncate">
                  Artisanal Roastery & Café
                </span>
              </div>
            </button>

            {/* Desktop Nav Links with Active Spy Indicator */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive =
                  link.page === 'menu'
                    ? currentPage === 'menu'
                    : currentPage === 'home' && link.section === activeSection;

                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.page, link.section)}
                    className={`text-sm font-medium transition-all relative py-1 focus:outline-none focus:text-[#C47A3B] ${
                      isActive
                        ? 'text-[#C47A3B] font-bold after:w-full'
                        : 'text-[#5A3E25] hover:text-[#C47A3B]'
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C47A3B] hover:after:w-full after:transition-all after:duration-300 ${
                      isActive ? 'after:w-full' : 'after:w-0'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Right Action: Cart & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Cart Button with micro bounce animation */}
              <button
                onClick={onOpenCart}
                className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-[#F4ECE1] hover:bg-[#E6D7C3] text-[#3D2817] font-medium text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C47A3B] hover:scale-105 active:scale-95 min-h-[40px]"
                aria-label={`View shopping cart with ${cartTotals.itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4 text-[#C47A3B]" />
                <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                {cartTotals.itemCount > 0 ? (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-[#C47A3B] rounded-full animate-bounce">
                    {cartTotals.itemCount}
                  </span>
                ) : (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-[#826955] bg-[#E6D7C3] rounded-full">
                    0
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#3D2817] hover:bg-[#F4ECE1] active:bg-[#E6D7C3] focus:outline-none focus:ring-2 focus:ring-[#C47A3B] transition-colors"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Toggle menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Backdrop & Drawer Menu */}
        {mobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 top-[65px] bg-black/40 backdrop-blur-xs z-30 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="md:hidden relative z-40 bg-[#FDFBF7] border-b border-[#E6D7C3] px-5 sm:px-6 py-5 shadow-xl transition-all animate-fadeIn">
              <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive =
                    link.page === 'menu'
                      ? currentPage === 'menu'
                      : currentPage === 'home' && link.section === activeSection;

                  return (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.page, link.section)}
                      className={`text-base font-medium py-3 px-2 rounded-xl flex items-center justify-between text-left transition-colors min-h-[44px] ${
                        isActive
                          ? 'bg-[#F4ECE1] text-[#C47A3B] font-bold'
                          : 'text-[#3D2817] hover:bg-[#F9F5F0] hover:text-[#C47A3B]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-[#826955]">&rarr;</span>
                    </button>
                  );
                })}
                <div className="pt-3 border-t border-[#E6D7C3]/60 flex flex-col gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCart();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#3D2817] text-[#FDFBF7] text-sm font-semibold hover:bg-[#C47A3B] transition-colors shadow-sm min-h-[44px]"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#DDA15E]" />
                    <span>Open Cart ({cartTotals.itemCount} items)</span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#826955] pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C47A3B]" />
                    <span>Specialty Coffee & Desserts • Bandra West</span>
                  </div>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
};
