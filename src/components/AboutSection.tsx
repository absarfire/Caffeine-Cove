import React from 'react';
import { Heart, Coffee, Leaf, Users, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/menuData.js';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-[#F9F5F0] border-t border-[#E6D7C3]/60 relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=80"
                alt="Barista carefully pulling espresso shot at Caffeine Cove"
                loading="lazy"
                decoding="async"
                className="w-full h-64 sm:h-80 lg:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#25160C]/70 via-[#25160C]/20 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 text-white">
                <p className="font-serif text-base sm:text-lg font-bold">Est. 2021 • Bandra West</p>
                <p className="text-xs text-white/80">Where slow mornings meet handcrafted rituals.</p>
              </div>
            </div>

            {/* Decorative Mini Box */}
            <div className="absolute -bottom-4 right-2 lg:-bottom-6 lg:-right-6 bg-[#3D2817] text-[#FDFBF7] p-3.5 sm:p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-[#C47A3B] animate-gentle-float">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C47A3B] flex items-center justify-center shadow-inner shrink-0">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold">Made with Passion</p>
                <p className="text-[11px] text-[#E6D7C3]">100% ethically sourced</p>
              </div>
            </div>
          </div>

          {/* Text Story Side */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-xs font-semibold tracking-wider text-[#C47A3B] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C47A3B]" />
              <span>Our Little Haven</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#25160C] tracking-tight">
              A cozy hideaway built on curiosity & roasted beans.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5A3E25] leading-relaxed">
              <p>
                Caffeine Cove began as an intimate weekend dream between two childhood friends who believed that good coffee should never be rushed. Tucked away under the rain trees of Whispering Pines Lane in Bandra, we built a sanctuary where the smell of freshly ground Arabica beans mingles with cinnamon and bubbling sourdough.
              </p>
              <p>
                We roast small batches twice a week, source our tea leaves directly from organic hill gardens in Assam and Darjeeling, and handcraft our fruit syrups and herbal infusions from scratch each morning. Whether you’re finding solace in an 18-hour cold brew, sketching in our sunlit corner, or savoring a warm tiramisu cup, you are always family at our counter.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6D7C3] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <Coffee className="w-6 h-6 text-[#C47A3B] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-serif font-bold text-sm text-[#25160C] group-hover:text-[#C47A3B] transition-colors">Artisanal Roasts</h4>
                <p className="text-xs text-[#826955] mt-1">Single-origin micro-lots roasted with precision and care.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6D7C3] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <Leaf className="w-6 h-6 text-[#C47A3B] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-serif font-bold text-sm text-[#25160C] group-hover:text-[#C47A3B] transition-colors">Fresh Ingredients</h4>
                <p className="text-xs text-[#826955] mt-1">Zero artificial concentrates; real fruits, spices, and dairy.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E6D7C3] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                <Users className="w-6 h-6 text-[#C47A3B] mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="font-serif font-bold text-sm text-[#25160C] group-hover:text-[#C47A3B] transition-colors">Community First</h4>
                <p className="text-xs text-[#826955] mt-1">A warm living room for artists, thinkers, and lovers of sips.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
