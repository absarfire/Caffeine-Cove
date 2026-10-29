import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  validatePromoCode
} from './cartCalculations.ts';
import type { CartItemType } from './cartCalculations.ts';

const mockCoffee: CartItemType = {
  id: 'cappuccino',
  name: 'Cappuccino',
  price: 140,
  quantity: 2, // 280
  category: 'Coffee',
  imageUrl: ''
};

const mockDessert: CartItemType = {
  id: 'tiramisu-cup',
  name: 'Tiramisu Cup',
  price: 240,
  quantity: 1, // 240
  category: 'Desserts',
  imageUrl: ''
};

test('calculateCartTotals calculates subtotal and standard delivery correctly', () => {
  const result = calculateCartTotals([mockCoffee]); // 280
  assert.equal(result.subtotal, 280);
  assert.equal(result.itemCount, 2);
  assert.equal(result.deliveryFee, 40); // subtotal < 500
  assert.equal(result.grandTotal, 320); // 280 + 40
  assert.equal(result.isEligibleForFreeDelivery, false);
  assert.equal(result.amountNeededForFreeDelivery, 220);
});

test('calculateCartTotals gives free delivery when subtotal >= 500', () => {
  const result = calculateCartTotals([mockCoffee, mockDessert]); // 280 + 240 = 520
  assert.equal(result.subtotal, 520);
  assert.equal(result.deliveryFee, 0);
  assert.equal(result.isEligibleForFreeDelivery, true);
  assert.equal(result.grandTotal, 520);
});

test('validatePromoCode WELCOME10 gives 10% discount on entire subtotal', () => {
  const promo = validatePromoCode('welcome10', [mockCoffee]); // 280 subtotal
  assert.equal(promo.isValid, true);
  assert.equal(promo.discountAmount, 28); // 10% of 280 is 28

  const totals = calculateCartTotals([mockCoffee], 'WELCOME10');
  assert.equal(totals.promoDiscount, 28);
  assert.equal(totals.grandTotal, 280 - 28 + 40); // 292
});

test('validatePromoCode SWEET20 applies 20% only to Desserts', () => {
  // Only coffee: SWEET20 should be invalid
  const invalidCase = validatePromoCode('SWEET20', [mockCoffee]);
  assert.equal(invalidCase.isValid, false);
  assert.match(invalidCase.message, /only valid for items from our Desserts menu/i);

  // Coffee (280) + Dessert (240): 20% of 240 = 48
  const validCase = validatePromoCode('SWEET20', [mockCoffee, mockDessert]);
  assert.equal(validCase.isValid, true);
  assert.equal(validCase.discountAmount, 48);

  const totals = calculateCartTotals([mockCoffee, mockDessert], 'SWEET20');
  assert.equal(totals.promoDiscount, 48);
  assert.equal(totals.grandTotal, 520 - 48 + 0); // 472
});

test('validatePromoCode rejects invalid codes cleanly', () => {
  const result = validatePromoCode('DISCOUNT99', [mockCoffee]);
  assert.equal(result.isValid, false);
  assert.match(result.message, /Invalid promo code/i);
});
