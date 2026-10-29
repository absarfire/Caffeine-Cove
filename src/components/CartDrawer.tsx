import React, { useState, useEffect } from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Tag,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useCart } from '../context/CartContext.js';
import { RickRollModal } from './RickRollModal.js';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedPromo,
    promoError,
    promoSuccess,
    applyPromoCode,
    removePromoCode,
    deliveryAddress,
    setDeliveryAddress,
    cartTotals
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [tip, setTip] = useState<number>(0);
  const [baristaNotes, setBaristaNotes] = useState<string>('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderNoticeOpen, setOrderNoticeOpen] = useState(false);

  // Address for Map Embed: debounce or direct
  const [debouncedMapAddress, setDebouncedMapAddress] = useState(deliveryAddress);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMapAddress(deliveryAddress || 'Bandra West, Mumbai');
    }, 600);
    return () => clearTimeout(timer);
  }, [deliveryAddress]);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    debouncedMapAddress || 'Bandra West, Mumbai'
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    setIsProcessingOrder(true);

    setTimeout(() => {
      setIsProcessingOrder(false);
      setOrderNoticeOpen(true);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn" role="dialog" aria-modal="true" aria-label="Shopping Cart Drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen sm:max-w-md bg-[#FDFBF7] shadow-2xl border-l border-[#E6D7C3] flex flex-col justify-between h-[100dvh] max-h-[100dvh]">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E6D7C3] flex items-center justify-between bg-[#F9F5F0]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#3D2817] flex items-center justify-center text-white shrink-0">
                <ShoppingBag className="w-4 h-4 text-[#DDA15E]" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#25160C]">Your Cove Cart</h2>
                <p className="text-xs text-[#826955]">
                  {cartTotals.itemCount} {cartTotals.itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#826955] hover:text-[#25160C] hover:bg-[#E6D7C3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4ECE1] text-[#826955] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#25160C]">Your cart is empty</h3>
                <p className="text-xs text-[#5A3E25] max-w-xs mx-auto">
                  Looks like you haven't picked your treats yet. Browse our coffees, artisan teas, or desserts!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#3D2817] text-white text-xs font-semibold hover:bg-[#C47A3B] transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Bar */}
                <div className="p-3.5 rounded-2xl bg-[#F4ECE1] border border-[#E6D7C3]">
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-[#3D2817]">
                      {cartTotals.isEligibleForFreeDelivery
                        ? '🎉 You unlocked Free Delivery!'
                        : `Add ₹${cartTotals.amountNeededForFreeDelivery} more for Free Delivery`}
                    </span>
                    <span className="text-[#C47A3B]">
                      {Math.min(100, Math.round((cartTotals.subtotal / 500) * 100))}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E6D7C3] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C47A3B] h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${Math.min(100, (cartTotals.subtotal / 500) * 100)}%`
                      }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#826955]">
                      Order Items
                    </span>
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-[#826955] hover:text-red-700 underline"
                    >
                      Clear All
                    </button>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E6D7C3] shadow-xs"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ objectPosition: item.imagePosition || 'center' }}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#E6D7C3]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-bold text-[#25160C] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#826955]">
                          ₹{item.price} each • <span className="font-semibold text-[#C47A3B]">₹{item.price * item.quantity}</span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 bg-[#F4ECE1] rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#3D2817] hover:bg-[#E6D7C3] transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#25160C]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#3D2817] hover:bg-[#E6D7C3] transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Box */}
                <div className="p-4 rounded-2xl bg-[#F9F5F0] border border-[#E6D7C3] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="promo-input" className="text-xs font-bold uppercase tracking-wider text-[#826955] flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-[#C47A3B]" />
                      <span>Promo Code</span>
                    </label>
                    <span className="text-[10px] text-[#826955]">
                      Try: <strong className="text-[#C47A3B]">WELCOME10</strong>, <strong className="text-[#C47A3B]">SWEET20</strong>
                    </span>
                  </div>

                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-emerald-900">{appliedPromo} Applied</p>
                          <p className="text-[11px] text-emerald-700">{promoSuccess}</p>
                        </div>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-xs font-semibold text-red-600 hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        id="promo-input"
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="WELCOME10 / SWEET20"
                        className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-[#E6D7C3] text-[#25160C] uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-[#3D2817] text-white text-xs font-semibold hover:bg-[#C47A3B] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}

                  {promoError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{promoError}</span>
                    </div>
                  )}
                </div>

                {/* Delivery Location Section */}
                <div className="p-4 rounded-2xl bg-[#F9F5F0] border border-[#E6D7C3] space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="address-input" className="text-xs font-bold uppercase tracking-wider text-[#826955] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C47A3B]" />
                      <span>Delivery Address</span>
                    </label>
                    <span className="text-[10px] text-[#C47A3B] font-medium">Live Map Preview</span>
                  </div>

                  <input
                    id="address-input"
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter street name, area, or landmark..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6D7C3] text-[#25160C] focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  />

                  {/* Interactive Map Embed */}
                  <div className="w-full h-32 rounded-xl overflow-hidden border border-[#E6D7C3] relative bg-[#E6D7C3]">
                    <iframe
                      title="Dynamic Delivery Map"
                      src={mapEmbedUrl}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] text-[#826955] italic">
                    Map updates automatically as you type your location.
                  </p>
                </div>

                {/* Special Instructions for Barista */}
                <div className="p-4 rounded-2xl bg-[#F9F5F0] border border-[#E6D7C3] space-y-2">
                  <label htmlFor="barista-notes" className="text-xs font-bold uppercase tracking-wider text-[#826955] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C47A3B]" />
                    <span>Barista Notes (Optional)</span>
                  </label>
                  <input
                    id="barista-notes"
                    type="text"
                    value={baristaNotes}
                    onChange={(e) => setBaristaNotes(e.target.value)}
                    placeholder="e.g. Extra hot, oat milk if possible, separate bag..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6D7C3] text-[#25160C] focus:outline-none focus:ring-2 focus:ring-[#C47A3B]"
                  />
                </div>

                {/* Tip the Baristas */}
                <div className="p-4 rounded-2xl bg-[#F9F5F0] border border-[#E6D7C3] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#826955]">
                      Support Our Baristas
                    </span>
                    <span className="text-[10px] text-[#C47A3B] font-semibold">100% goes to staff</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'None', val: 0 },
                      { label: '₹20', val: 20 },
                      { label: '₹50', val: 50 },
                      { label: '₹100', val: 100 },
                    ].map((t) => (
                      <button
                        key={t.val}
                        type="button"
                        onClick={() => setTip(t.val)}
                        className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all min-h-[38px] active:scale-95 ${
                          tip === t.val
                            ? 'bg-[#3D2817] text-white shadow-xs'
                            : 'bg-white text-[#5A3E25] border border-[#E6D7C3] hover:border-[#C47A3B]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E6D7C3] bg-[#F9F5F0] space-y-3 shrink-0">
              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5A3E25]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#25160C]">₹{cartTotals.subtotal}</span>
                </div>

                {cartTotals.promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({cartTotals.promoCode})</span>
                    <span>-₹{cartTotals.promoDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#5A3E25]">
                  <span>Delivery Fee</span>
                  <span>
                    {cartTotals.deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `₹${cartTotals.deliveryFee}`
                    )}
                  </span>
                </div>

                {tip > 0 && (
                  <div className="flex justify-between text-[#C47A3B] font-medium">
                    <span>Barista Tip</span>
                    <span>₹{tip}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#E6D7C3] flex justify-between text-base font-bold text-[#25160C]">
                  <span className="font-serif">Total Amount</span>
                  <span className="text-[#C47A3B]">₹{cartTotals.grandTotal + tip}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessingOrder}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#3D2817] text-[#FDFBF7] font-semibold text-sm hover:bg-[#C47A3B] active:scale-98 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C47A3B] disabled:opacity-75 min-h-[48px]"
              >
                {isProcessingOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#DDA15E]" />
                    <span>Processing Your Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order • ₹{cartTotals.grandTotal + tip}</span>
                    <ArrowRight className="w-4 h-4 text-[#DDA15E]" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* In-website Embedded Video Modal */}
      <RickRollModal
        isOpen={orderNoticeOpen}
        onClose={() => setOrderNoticeOpen(false)}
        title="Online ordering coming soooon! ☕"
        subtitle="Thanks for tasting the dream! While our baristas get everything ready for real online orders, enjoy this exclusive VIP secret transmission right here:"
      />
    </div>
  );
};
