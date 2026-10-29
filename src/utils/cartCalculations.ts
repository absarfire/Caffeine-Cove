export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: 'Coffee' | 'Tea' | 'Desserts' | 'Snacks & Shakes';
  imageUrl: string;
  imagePosition?: string;
}

export interface PromoValidationResult {
  isValid: boolean;
  code: string;
  discountAmount: number;
  message: string;
}

export interface CartCalculationResult {
  subtotal: number;
  dessertSubtotal: number;
  itemCount: number;
  promoCode: string | null;
  promoDiscount: number;
  promoMessage: string | null;
  deliveryFee: number;
  grandTotal: number;
  isEligibleForFreeDelivery: boolean;
  amountNeededForFreeDelivery: number;
}

export const FREE_DELIVERY_THRESHOLD = 500;
export const STANDARD_DELIVERY_FEE = 40;

export function validatePromoCode(
  rawCode: string,
  items: CartItemType[]
): PromoValidationResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) {
    return {
      isValid: false,
      code: '',
      discountAmount: 0,
      message: 'Please enter a promo code.'
    };
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dessertSubtotal = items
    .filter((item) => item.category === 'Desserts')
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (code === 'WELCOME10') {
    if (subtotal === 0) {
      return {
        isValid: false,
        code,
        discountAmount: 0,
        message: 'Cart is empty. Add items to apply WELCOME10.'
      };
    }
    const discount = Math.round(subtotal * 0.10);
    return {
      isValid: true,
      code,
      discountAmount: discount,
      message: '10% discount applied to your order!'
    };
  }

  if (code === 'SWEET20') {
    if (dessertSubtotal === 0) {
      return {
        isValid: false,
        code,
        discountAmount: 0,
        message: 'SWEET20 is only valid for items from our Desserts menu.'
      };
    }
    const discount = Math.round(dessertSubtotal * 0.20);
    return {
      isValid: true,
      code,
      discountAmount: discount,
      message: `20% dessert discount applied (-₹${discount})!`
    };
  }

  return {
    isValid: false,
    code,
    discountAmount: 0,
    message: 'Invalid promo code. Valid codes: WELCOME10, SWEET20'
  };
}

export function calculateCartTotals(
  items: CartItemType[],
  appliedPromo: string | null = null
): CartCalculationResult {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const dessertSubtotal = items
    .filter((item) => item.category === 'Desserts')
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  let promoDiscount = 0;
  let promoMessage: string | null = null;
  let validPromoCode: string | null = null;

  if (appliedPromo) {
    const promoResult = validatePromoCode(appliedPromo, items);
    if (promoResult.isValid) {
      promoDiscount = promoResult.discountAmount;
      promoMessage = promoResult.message;
      validPromoCode = promoResult.code;
    }
  }

  const isEligibleForFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = subtotal === 0 ? 0 : isEligibleForFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  const amountNeededForFreeDelivery = isEligibleForFreeDelivery
    ? 0
    : Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const grandTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);

  return {
    subtotal,
    dessertSubtotal,
    itemCount,
    promoCode: validPromoCode,
    promoDiscount,
    promoMessage,
    deliveryFee,
    grandTotal,
    isEligibleForFreeDelivery,
    amountNeededForFreeDelivery
  };
}
