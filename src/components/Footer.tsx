import React, { useState } from 'react';
import { Coffee, Heart, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { RickRollModal } from './RickRollModal.js';

export const Footer: React.FC = () => {
  const [isRickRollOpen, setIsRickRollOpen] = useState(false);

  return (
    <footer className="bg-[#25160C] text-[#FDFBF7] pt-16 pb-28 sm:pb-14 border-t border-[#3D2817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#3D2817]">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#C47A3B] flex items-center justify-center text-white">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Caffeine Cove
              </span>
            </div>
            <p className="text-xs text-[#E6D7C3]/80 leading-relaxed">
              An intimate neighborhood roastery and café tucked away in Bandra West, Mumbai. Dedicated to honest coffee, slow mornings, and warm company.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsRickRollOpen(true)}
                className="w-8 h-8 rounded-full bg-[#3D2817] flex items-center justify-center text-[#E6D7C3] hover:text-[#C47A3B] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsRickRollOpen(true)}
                className="w-8 h-8 rounded-full bg-[#3D2817] flex items-center justify-center text-[#E6D7C3] hover:text-[#C47A3B] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsRickRollOpen(true)}
                className="w-8 h-8 rounded-full bg-[#3D2817] flex items-center justify-center text-[#E6D7C3] hover:text-[#C47A3B] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsRickRollOpen(true)}
                className="w-8 h-8 rounded-full bg-[#3D2817] flex items-center justify-center text-[#E6D7C3] hover:text-[#C47A3B] hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E6D7C3]/80">
              <li>
                <a href="#home" className="hover:text-[#C47A3B] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C47A3B] transition-colors">
                  Full Menu & Categories
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C47A3B] transition-colors">
                  Our Story & Beans
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#C47A3B] transition-colors">
                  Customer Stories & Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C47A3B] transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Address */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              Hours & Hearth
            </h4>
            <div className="space-y-1.5 text-xs text-[#E6D7C3]/80">
              <p className="font-medium text-white">Monday – Friday</p>
              <p>7:30 AM – 10:30 PM</p>
              <p className="font-medium text-white pt-1">Saturday – Sunday</p>
              <p>8:00 AM – 11:30 PM</p>
              <p className="pt-2 text-[#C47A3B] font-medium">Bakes out fresh at 8:00 AM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#826955] gap-4">
          <p>© {new Date().getFullYear()} Caffeine Cove. Handcrafted with care.</p>
          <p className="flex items-center gap-1">
            <span>Brewed with</span>
            <Heart className="w-3.5 h-3.5 text-[#C47A3B] fill-[#C47A3B]" />
            <span>in Bandra West, Mumbai</span>
          </p>
        </div>
      </div>

      {/* Embedded In-Website Video Modal */}
      <RickRollModal
        isOpen={isRickRollOpen}
        onClose={() => setIsRickRollOpen(false)}
        title="Connect with Caffeine Cove"
        subtitle="Thanks for stopping by! Enjoy our special VIP secret transmission right here:"
      />
    </footer>
  );
};
