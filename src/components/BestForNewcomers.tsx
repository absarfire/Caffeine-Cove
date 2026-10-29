import React, { useMemo } from 'react';
import { Plus, Check, Star, Sparkles, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData.js';
import { useCart } from '../context/CartContext.js';

interface BestForNewcomersProps {
  onExploreMenu?: () => void;
}

export const BestForNewcomers: React.FC<BestForNewcomersProps> = ({ onExploreMenu }) => {
  const { addToCart, items } = useCart();

  const newcomerItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.bestForNewcomers).slice(0, 4),
    []
  );

  const cartItemCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.id, (map.get(item.id) || 0) + item.quantity);
    }
    return map;
  }, [items]);

  return (
    <section id="bestsellers" className="py-16 pt-20 scroll-mt-20 bg-[#F9F5F0] border-y border-[#E6D7C3]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-xs font-semibold tracking-wider text-[#C47A3B] uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-[#C47A3B] text-[#C47A3B]" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#25160C] tracking-tight">
            Our Bestsellers
          </h2>
          <p className="mt-3 text-base text-[#5A3E25]">
            Our most popular handcrafted sips and treats, cherished by our regulars every day.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newcomerItems.map((item) => {
            const count = cartItemCounts.get(item.id) || 0;
            return (
              <div
                key={item.id}
                className="group bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#E6D7C3] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#E6D7C3]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ objectPosition: item.imagePosition || 'center' }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute top-3 left-3 bg-[#3D2817]/85 backdrop-blur-sm text-[#FDFBF7] text-[11px] font-semibold px-2.5 py-1 rounded-full z-10">
                      {item.category}
                    </div>
                    {item.badge && (
                      <div className="absolute top-3 right-3 bg-[#C47A3B] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm z-10">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-lg font-bold text-[#25160C] group-hover:text-[#C47A3B] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-bold text-base text-[#C47A3B] whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#5A3E25] line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Why It's a Bestseller Line */}
                    <div className="p-2.5 rounded-xl bg-[#F4ECE1]/80 border border-[#E6D7C3]/80 mb-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#826955] uppercase mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C47A3B]" />
                        <span>Why it's a bestseller:</span>
                      </div>
                      <p className="text-xs italic text-[#3D2817] leading-relaxed">
                        "{item.whyTryThis}"
                      </p>
                    </div>

                    {/* Ingredients summary */}
                    <div className="text-[11px] text-[#826955] flex flex-wrap gap-1">
                      <span className="font-medium text-[#5A3E25]">Contains:</span>
                      <span>{item.ingredients.slice(0, 3).join(', ')}...</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => addToCart(item)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C47A3B] min-h-[44px] active:scale-98 ${
                      count > 0
                        ? 'bg-[#E6D7C3] text-[#25160C] hover:bg-[#DDA15E]'
                        : 'bg-[#3D2817] text-[#FDFBF7] hover:bg-[#C47A3B]'
                    }`}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    {count > 0 ? (
                      <>
                        <Check className="w-4 h-4 text-[#3D2817]" />
                        <span>Added ({count} in cart) • Add More</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart • ₹{item.price}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Full Menu Button */}
        {onExploreMenu && (
          <div className="mt-12 text-center px-4">
            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#3D2817] text-[#FDFBF7] font-semibold text-sm hover:bg-[#C47A3B] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#C47A3B] min-h-[48px]"
            >
              <span>Explore Full Menu</span>
              <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export const Bestsellers = BestForNewcomers;
