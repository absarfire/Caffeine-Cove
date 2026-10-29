import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Plus,
  Check,
  Info,
  Flame,
  Sparkles,
  ShoppingBag,
  SlidersHorizontal,
  Sliders,
  Star,
  CheckCircle2,
  X
} from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/menuData.js';
import { useCart } from '../context/CartContext.js';

type CategoryFilter = 'All' | 'Coffee' | 'Tea' | 'Desserts' | 'Snacks & Shakes';
type DietFilter = 'all' | 'bestsellers' | 'under150';
type SortOption = 'default' | 'price-asc' | 'price-desc';

interface MenuPageProps {
  onBackToHome: () => void;
  onOpenCart: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackToHome, onOpenCart }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [dietFilter, setDietFilter] = useState<DietFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredientItem, setSelectedIngredientItem] = useState<MenuItem | null>(null);

  // Customization modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [tempChoice, setTempChoice] = useState<'Hot' | 'Iced'>('Hot');
  const [sweetnessChoice, setSweetnessChoice] = useState<'Regular' | 'Half-Sweet' | 'Zero Sugar'>('Regular');
  const [milkChoice, setMilkChoice] = useState<'Classic Whole Milk' | 'Oat Milk (+₹30)' | 'Almond Milk (+₹30)'>('Classic Whole Milk');
  const [serveWarm, setServeWarm] = useState<boolean>(true);

  const { addToCart, items, cartTotals } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories: CategoryFilter[] = ['All', 'Coffee', 'Tea', 'Desserts', 'Snacks & Shakes'];

  const filteredItems = useMemo(() => {
    let result = MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesDiet = true;
      if (dietFilter === 'bestsellers') {
        matchesDiet = Boolean(item.bestForNewcomers || item.isPopular);
      } else if (dietFilter === 'under150') {
        matchesDiet = item.price <= 150;
      }

      return matchesCategory && matchesSearch && matchesDiet;
    });

    if (sortOption === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, dietFilter, sortOption]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of MENU_ITEMS) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  const cartItemCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.id, (map.get(item.id) || 0) + item.quantity);
    }
    return map;
  }, [items]);

  const handleOpenCustomize = (item: MenuItem) => {
    setCustomizingItem(item);
    setTempChoice(item.name.toLowerCase().includes('iced') || item.id === 'cold-brew' ? 'Iced' : 'Hot');
    setSweetnessChoice('Regular');
    setMilkChoice('Classic Whole Milk');
    setServeWarm(true);
  };

  const handleConfirmCustomize = () => {
    if (!customizingItem) return;
    addToCart(customizingItem);
    setCustomizingItem(null);
  };

  return (
    <div className="pt-28 pb-24 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E6D7C3]/60">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4ECE1] text-[#3D2817] hover:bg-[#E6D7C3] hover:text-[#25160C] text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
          >
            <ArrowLeft className="w-4 h-4 text-[#C47A3B]" />
            <span>Back to Café Home</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#826955]">
              Showing <strong className="text-[#3D2817]">{filteredItems.length}</strong> of {MENU_ITEMS.length} items
            </span>
            {cartTotals.itemCount > 0 && (
              <button
                onClick={onOpenCart}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3D2817] text-[#FDFBF7] text-xs font-semibold hover:bg-[#C47A3B] transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#DDA15E]" />
                <span>View Cart ({cartTotals.itemCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-xs font-semibold tracking-wider text-[#C47A3B] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C47A3B]" />
            <span>Complete Collection</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#25160C] tracking-tight">
            The Full Cove Menu
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5A3E25]">
            Explore our handcrafted coffees, artisan teas, oven-fresh pastries, and savory gourmet bites. All recipes made with honest, uncompromised ingredients.
          </p>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E6D7C3]/80">
          {/* Category Tabs with horizontal scroll on small screens */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full md:w-auto scroll-smooth justify-start md:justify-center shrink-0" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 focus:outline-none focus:ring-2 focus:ring-[#C47A3B] min-h-[40px] ${
                  activeCategory === cat
                    ? 'bg-[#3D2817] text-[#FDFBF7] shadow-sm scale-102'
                    : 'bg-[#F4ECE1] text-[#5A3E25] hover:bg-[#E6D7C3] hover:text-[#25160C]'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 text-[11px] opacity-75 font-normal">
                    ({categoryCounts[cat] || 0})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#826955] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, tea, treats..."
              className="w-full pl-9 pr-14 py-2.5 text-xs sm:text-sm rounded-full bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] placeholder-[#826955] focus:outline-none focus:ring-2 focus:ring-[#C47A3B] focus:bg-white transition-all min-h-[42px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs font-semibold text-[#826955] hover:text-[#25160C]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filter Chips & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 mb-8 px-1">
          <div className="flex flex-wrap items-center gap-2 text-xs w-full sm:w-auto">
            <span className="text-[#826955] font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C47A3B]" />
              <span>Filter:</span>
            </span>
            <button
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium min-h-[36px] ${
                dietFilter === 'all'
                  ? 'bg-[#C47A3B] text-white font-semibold shadow-xs'
                  : 'bg-[#F4ECE1] text-[#5A3E25] hover:bg-[#E6D7C3]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietFilter('bestsellers')}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 text-xs font-medium min-h-[36px] ${
                dietFilter === 'bestsellers'
                  ? 'bg-[#C47A3B] text-white font-semibold shadow-xs'
                  : 'bg-[#F4ECE1] text-[#5A3E25] hover:bg-[#E6D7C3]'
              }`}
            >
              <Star className="w-3 h-3 fill-current" />
              <span>Customer Favorites</span>
            </button>
            <button
              onClick={() => setDietFilter('under150')}
              className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium min-h-[36px] ${
                dietFilter === 'under150'
                  ? 'bg-[#C47A3B] text-white font-semibold shadow-xs'
                  : 'bg-[#F4ECE1] text-[#5A3E25] hover:bg-[#E6D7C3]'
              }`}
            >
              Budget Friendly (≤ ₹150)
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
            <span className="text-[#826955] font-medium shrink-0">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#F4ECE1] border border-[#E6D7C3] text-[#25160C] font-medium focus:outline-none focus:ring-2 focus:ring-[#C47A3B] min-h-[36px]"
            >
              <option value="default">Featured Selection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-[#F9F5F0] rounded-2xl border border-[#E6D7C3] max-w-lg mx-auto">
            <p className="font-serif text-xl font-bold text-[#25160C] mb-2">No matching items found</p>
            <p className="text-xs text-[#5A3E25] mb-4">
              We couldn't find anything matching your filters. Try selecting "All Items" or searching for a different treat!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setDietFilter('all');
                setSortOption('default');
              }}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-[#3D2817] text-white hover:bg-[#C47A3B] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Menu Grid with subtle hover lift and card polish */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const count = cartItemCounts.get(item.id) || 0;
            return (
              <article
                key={item.id}
                className="group bg-[#FDFBF7] rounded-3xl overflow-hidden border border-[#E6D7C3] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Overlay & Badges */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#E6D7C3]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ objectPosition: item.imagePosition || 'center' }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-[#3D2817]/90 backdrop-blur-sm text-[#FDFBF7] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {item.badge && (
                        <span className="bg-[#C47A3B] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {item.calories && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
                        <Flame className="w-3 h-3 text-[#DDA15E]" />
                        <span>{item.calories}</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-xl font-bold text-[#25160C] group-hover:text-[#C47A3B] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-bold text-lg text-[#C47A3B] whitespace-nowrap">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5A3E25] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Ingredients preview & toggle */}
                    <div className="pt-3 border-t border-[#F4ECE1]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#826955]">
                          Ingredients
                        </span>
                        <button
                          onClick={() => setSelectedIngredientItem(item)}
                          className="text-[11px] text-[#C47A3B] hover:underline flex items-center gap-0.5"
                          title="View all ingredients"
                        >
                          <Info className="w-3 h-3" />
                          <span>Details</span>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.ingredients.slice(0, 3).map((ing, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-[#F4ECE1] text-[#5A3E25] font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                        {item.ingredients.length > 3 && (
                          <span className="text-[10px] text-[#826955] py-0.5">
                            +{item.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions: Quick Add & Customize */}
                <div className="p-5 sm:p-6 pt-0 space-y-2">
                  <button
                    onClick={() => addToCart(item)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C47A3B] ${
                      count > 0
                        ? 'bg-[#E6D7C3] text-[#25160C] hover:bg-[#DDA15E]'
                        : 'bg-[#3D2817] text-[#FDFBF7] hover:bg-[#C47A3B]'
                    }`}
                    aria-label={`Add ${item.name} to cart`}
                  >
                    {count > 0 ? (
                      <>
                        <Check className="w-4 h-4 text-[#3D2817]" />
                        <span>In Cart ({count}) • Add Another</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart • ₹{item.price}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenCustomize(item)}
                    className="w-full py-1.5 px-3 rounded-lg text-[11px] font-medium text-[#826955] hover:text-[#25160C] hover:bg-[#F4ECE1] transition-colors flex items-center justify-center gap-1"
                  >
                    <Sliders className="w-3 h-3 text-[#C47A3B]" />
                    <span>Customize (Milk, Temp, Sweetness)</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Back to Home Bottom Link */}
        <div className="mt-16 text-center pt-8 border-t border-[#E6D7C3]/60">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3D2817] hover:text-[#C47A3B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Caffeine Cove Homepage</span>
          </button>
        </div>
      </div>

      {/* Ingredient Details Modal */}
      {selectedIngredientItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FDFBF7] max-w-md w-full rounded-3xl p-5 sm:p-6 border border-[#E6D7C3] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedIngredientItem(null)}
              className="absolute top-4 right-4 text-[#826955] hover:text-[#25160C] text-lg font-bold p-1 rounded-full hover:bg-[#F4ECE1]"
              aria-label="Close ingredient modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#E6D7C3] shrink-0">
                <img
                  src={selectedIngredientItem.imageUrl}
                  alt={selectedIngredientItem.name}
                  style={{ objectPosition: selectedIngredientItem.imagePosition || 'center' }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#25160C]">
                  {selectedIngredientItem.name}
                </h4>
                <p className="text-xs text-[#C47A3B] font-semibold">
                  {selectedIngredientItem.category} • ₹{selectedIngredientItem.price}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5A3E25] mb-4 leading-relaxed">
              {selectedIngredientItem.description}
            </p>

            <div className="mb-6">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#826955] mb-2">
                Full Ingredients & Recipe Notes:
              </h5>
              <ul className="space-y-1.5">
                {selectedIngredientItem.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#3D2817]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C47A3B]" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                addToCart(selectedIngredientItem);
                setSelectedIngredientItem(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[#3D2817] text-[#FDFBF7] text-xs font-semibold hover:bg-[#C47A3B] transition-colors"
            >
              Add to Cart (₹{selectedIngredientItem.price})
            </button>
          </div>
        </div>
      )}

      {/* Item Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FDFBF7] max-w-md w-full rounded-3xl p-5 sm:p-6 border border-[#E6D7C3] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCustomizingItem(null)}
              className="absolute top-4 right-4 text-[#826955] hover:text-[#25160C] p-1.5 rounded-full hover:bg-[#F4ECE1]"
              aria-label="Close customization modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#E6D7C3] shrink-0">
                <img
                  src={customizingItem.imageUrl}
                  alt={customizingItem.name}
                  style={{ objectPosition: customizingItem.imagePosition || 'center' }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#25160C]">
                  Customize {customizingItem.name}
                </h4>
                <p className="text-xs text-[#C47A3B] font-semibold">
                  Base Price: ₹{customizingItem.price}
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {/* Temperature preference for beverages */}
              {(customizingItem.category === 'Coffee' || customizingItem.category === 'Tea') && (
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1.5">
                    Temperature
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Hot', 'Iced'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTempChoice(t as 'Hot' | 'Iced')}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                          tempChoice === t
                            ? 'bg-[#3D2817] text-white border-[#3D2817]'
                            : 'bg-[#F4ECE1] text-[#5A3E25] border-[#E6D7C3] hover:border-[#C47A3B]'
                        }`}
                      >
                        {t === 'Hot' ? '☕ Hot & Steamed' : '🧊 Iced & Chilled'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweetness */}
              <div>
                <label className="block text-xs font-bold text-[#3D2817] mb-1.5">
                  Sweetness Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Regular', 'Half-Sweet', 'Zero Sugar'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSweetnessChoice(s as any)}
                      className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition-all ${
                        sweetnessChoice === s
                          ? 'bg-[#3D2817] text-white border-[#3D2817]'
                          : 'bg-[#F4ECE1] text-[#5A3E25] border-[#E6D7C3] hover:border-[#C47A3B]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Choice (for Coffee/Tea) */}
              {(customizingItem.category === 'Coffee' || customizingItem.category === 'Tea') && (
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1.5">
                    Milk Base
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Classic Whole Milk', 'Oat Milk (+₹30)', 'Almond Milk (+₹30)'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMilkChoice(m as any)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center min-h-[38px] ${
                          milkChoice === m
                            ? 'bg-[#3D2817] text-white border-[#3D2817]'
                            : 'bg-[#F4ECE1] text-[#5A3E25] border-[#E6D7C3] hover:border-[#C47A3B]'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Warm it up for pastries */}
              {(customizingItem.category === 'Desserts' || customizingItem.category === 'Snacks & Shakes') && (
                <div>
                  <label className="block text-xs font-bold text-[#3D2817] mb-1.5">
                    Oven Warmth
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: '🔥 Warm from oven', val: true },
                      { label: 'Room temperature', val: false }
                    ].map((opt) => (
                      <button
                        key={String(opt.val)}
                        type="button"
                        onClick={() => setServeWarm(opt.val)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all min-h-[38px] ${
                          serveWarm === opt.val
                            ? 'bg-[#3D2817] text-white border-[#3D2817]'
                            : 'bg-[#F4ECE1] text-[#5A3E25] border-[#E6D7C3] hover:border-[#C47A3B]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#E6D7C3]">
              <span className="text-xs text-[#826955] text-center sm:text-left">
                {tempChoice} • {sweetnessChoice}
              </span>
              <button
                onClick={handleConfirmCustomize}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#3D2817] text-[#FDFBF7] text-xs sm:text-sm font-semibold hover:bg-[#C47A3B] transition-colors shadow-sm min-h-[44px]"
              >
                Add Customized to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
