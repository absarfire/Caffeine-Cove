import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext.js';
import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { BestForNewcomers } from './components/BestForNewcomers.js';
import { MenuPage } from './components/MenuPage.js';
import { AboutSection } from './components/AboutSection.js';
import { ReviewsSection } from './components/ReviewsSection.js';
import { ContactSection } from './components/ContactSection.js';
import { Footer } from './components/Footer.js';
import { CartDrawer } from './components/CartDrawer.js';
import { BackToTop } from './components/BackToTop.js';
import { Check, ShoppingBag } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu'>(() => {
    return window.location.hash.toLowerCase().includes('menu') ? 'menu' : 'home';
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { lastAddedItem } = useCart();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('menu')) {
        setCurrentPage('menu');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'menu', targetSection?: string) => {
    setCurrentPage(page);
    if (page === 'menu') {
      window.location.hash = '#menu';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = targetSection ? `#${targetSection}` : '#home';
      if (targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3D2817] flex flex-col font-sans selection:bg-[#E6D7C3] selection:text-[#25160C]">
      {/* Toast Notification when item added */}
      {lastAddedItem && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-500">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#3D2817] text-[#FDFBF7] shadow-xl border border-[#C47A3B]">
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-xs font-medium">
              Added <strong>{lastAddedItem}</strong> to cart!
            </span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 text-xs font-bold text-[#DDA15E] hover:underline flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Cart</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'menu' ? (
          <MenuPage
            onBackToHome={() => handleNavigate('home', 'home')}
            onOpenCart={() => setIsCartOpen(true)}
          />
        ) : (
          <>
            <Hero
              onOrderNow={() => setIsCartOpen(true)}
              onViewMenu={() => handleNavigate('menu')}
            />
            <BestForNewcomers onExploreMenu={() => handleNavigate('menu')} />
            <AboutSection />
            <ReviewsSection />
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating Smooth Back-To-Top Button */}
      <BackToTop />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}
