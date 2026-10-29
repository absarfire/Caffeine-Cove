# Caffeine Cove ☕

A warm, cozy, and responsive single-page web application for **Caffeine Cove**, an artisanal café and roastery in Bandra West, Mumbai.

Built with **React**, **TypeScript**, **Tailwind CSS**, and **Express** (local full-stack server).

---

## 🌟 Features

- **Cozy Brand Aesthetic**: Cream background (`#FDFBF7`), coffee-brown text (`#3D2817`), and caramel accents (`#C47A3B`) with Playfair Display serif headings and Inter body typography.
- **Sticky Top Navbar**: Brand logo, smooth-scroll links (Home, Menu, About, Gallery, Contact), item-count cart badge, and a mobile hamburger menu.
- **Hero Showcase**: Tagline, quick highlights, and "View Menu" / "Order Now" action buttons.
- **"Our Bestsellers"**: 4 customer favorite picks (Cappuccino, Lemon Tea, Tiramisu Cup, Garlic Bread) with tasting notes.
- **Comprehensive Menu (18 Items)**:
  - **Coffee**: Espresso, Cappuccino, Caffè Latte, Cold Brew
  - **Tea**: Lemon Tea, Iced Peach Tea, Hibiscus Tea, Butterfly Pea Tea
  - **Desserts**: Chocolate Brownie, New York Cheesecake slice, Tiramisu Cup, Blueberry Muffin, Vanilla Ice Cream Scoop
  - **Snacks & Shakes**: Cheese Sandwich, Veg Puff, Chocolate Milkshake, Strawberry Smoothie, Garlic Bread
  - Full ingredient lists, calorie counts, and prices in Indian Rupees (₹60–₹250).
- **Slide-out Cart & Simulated Checkout**:
  - Add, remove, update quantities, subtotal, delivery fee, and grand total.
  - **Promo Codes**:
    - `WELCOME10`: 10% off entire order.
    - `SWEET20`: 20% off items in the Desserts category only.
    - Clear error validation for invalid codes.
  - **Delivery Location**: Address input with a dynamically updating Google Maps embed showing the typed location.
  - **Simulated Checkout**: Clicking "Place Order" shows a processing animation and opens an in-website embedded video modal featuring our fun secret VIP transmission.
- **Location & Contact**:
  - 42 Whispering Pines Lane, Off Pali Hill, Bandra West, Mumbai 400050.
  - Opening hours, embedded Google Maps, and direct WhatsApp reservation button.

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run Unit Tests**:
   ```bash
   npm test
   ```

---

## ☁️ Deploying to Vercel

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Caffeine Cove"
   git remote add origin https://github.com/your-username/caffeine-cove.git
   git push -u origin main
   ```

2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and select your GitHub repository.
   - Framework Preset: **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**:
   - Click **Deploy**. Your café website will be live in seconds!
