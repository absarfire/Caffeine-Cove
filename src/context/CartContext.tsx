import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { MenuItem, CAFE_INFO } from '../data/menuData.js';
import {
  CartItemType,
  calculateCartTotals,
  validatePromoCode,
  CartCalculationResult
} from '../utils/cartCalculations.js';

interface CartContextType {
  items: CartItemType[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedPromo: string | null;
  promoError: string | null;
  promoSuccess: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  cartTotals: CartCalculationResult;
  lastAddedItem: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'caffeine_cove_cart_v1';
const ADDRESS_KEY = 'caffeine_cove_address_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItemType[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deliveryAddress, setDeliveryAddress] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ADDRESS_KEY);
      return saved || 'Hill Road, Bandra West, Mumbai 400050';
    } catch {
      return 'Hill Road, Bandra West, Mumbai 400050';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart to storage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ADDRESS_KEY, deliveryAddress);
    } catch (e) {
      console.warn('Could not save address to storage', e);
    }
  }, [deliveryAddress]);

  const addToCart = (item: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          category: item.category,
          imageUrl: item.imageUrl,
          imagePosition: item.imagePosition
        }
      ];
    });

    setLastAddedItem(item.name);
    setTimeout(() => {
      setLastAddedItem((curr) => (curr === item.name ? null : curr));
    }, 2500);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((i) => {
          if (i.id === itemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItemType[];
    });
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    setPromoError(null);
    setPromoSuccess(null);
  };

  const applyPromoCode = (code: string): boolean => {
    setPromoError(null);
    setPromoSuccess(null);
    const result = validatePromoCode(code, items);
    if (result.isValid) {
      setAppliedPromo(result.code);
      setPromoSuccess(result.message);
      return true;
    } else {
      setPromoError(result.message);
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError(null);
    setPromoSuccess(null);
  };

  const cartTotals = useMemo(
    () => calculateCartTotals(items, appliedPromo),
    [items, appliedPromo]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedPromo,
        promoError,
        promoSuccess,
        applyPromoCode,
        removePromoCode,
        deliveryAddress,
        setDeliveryAddress,
        cartTotals,
        lastAddedItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
