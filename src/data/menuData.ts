export interface MenuItem {
  id: string;
  name: string;
  category: 'Coffee' | 'Tea' | 'Desserts' | 'Snacks & Shakes';
  description: string;
  price: number; // in INR ₹
  ingredients: string[];
  imageUrl: string;
  imagePosition?: string;
  imageFit?: 'cover' | 'contain';
  isPopular?: boolean;
  bestForNewcomers?: boolean;
  whyTryThis?: string;
  badge?: string;
  calories?: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE (4 items)
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Coffee',
    description: 'A harmonious double shot of dark-roast espresso, steamed velvety whole milk, and a dense, billowy foam crown dusted with cocoa.',
    price: 140,
    ingredients: ['Double espresso', 'Steamed whole milk', 'Microfoam', 'Valrhona cocoa powder'],
    imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 70%',
    isPopular: true,
    bestForNewcomers: true,
    whyTryThis: 'Our signature double-shot espresso with velvety steamed milk and a rich cocoa-dusted microfoam crown.',
    badge: 'Bestseller',
    calories: '120 kcal'
  },
  {
    id: 'caffe-latte',
    name: 'Caffè Latte',
    category: 'Coffee',
    description: 'Smooth, comforting espresso folded gently into warm textured milk with a delicate, handcrafted leaf latte art topper.',
    price: 150,
    ingredients: ['Espresso roast', 'Steamed whole milk', 'Light milk foam'],
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 80%',
    calories: '150 kcal'
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    category: 'Coffee',
    description: 'Single-origin Arabica beans slow-steeped for 18 hours in cold filtered water. Ultra-smooth, naturally sweet, with low acidity over ice.',
    price: 160,
    ingredients: ['18-hour cold steeped single-origin Arabica', 'Triple-filtered mountain water', 'Hand-cut ice'],
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 6%',
    badge: 'Barista Pick',
    calories: '5 kcal'
  },

  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Coffee',
    description: 'A concentrated double shot of our house roast crowned with dense hazelnut crema, offering deep bittersweet cocoa and toasted almond notes.',
    price: 100,
    ingredients: ['100% Arabica single-origin beans', 'Pressurized mountain spring water'],
    imageUrl: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?auto=format&fit=crop&w=800&q=80',
    badge: 'Classic',
    calories: '5 kcal'
  },

  // TEA (4 items)
  {
    id: 'lemon-tea',
    name: 'Lemon Tea',
    category: 'Tea',
    description: 'Crisp Assam orthodox black tea brewed golden, infused with freshly squeezed juicy lemons, wild forest honey, and bruised organic garden mint.',
    price: 90,
    ingredients: ['Assam black tea leaves', 'Fresh lemon juice', 'Organic wild forest honey', 'Garden mint leaves'],
    imageUrl: '/lemon-tea.jpg',
    imagePosition: 'center center',
    isPopular: true,
    bestForNewcomers: true,
    whyTryThis: 'An uplifting citrus refresher brewed with golden orthodox leaves, soothing wild forest honey, and fragrant garden mint.',
    badge: 'Popular',
    calories: '45 kcal'
  },
  {
    id: 'iced-peach-tea',
    name: 'Iced Peach Tea',
    category: 'Tea',
    description: 'Sun-drenched orchard peach puree shaken with cold-brewed Assam black tea, poured over crystal ice with fresh garden mint and ripe peach slices.',
    price: 140,
    ingredients: ['Cold-brewed Assam black tea', 'Sun-ripened orchard peach puree', 'Fresh garden mint', 'Pure cane sugar syrup', 'Crystal ice cubes'],
    imageUrl: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 40%',
    badge: 'Refreshing',
    calories: '85 kcal'
  },
  {
    id: 'hibiscus-tea',
    name: 'Hibiscus Tea',
    category: 'Tea',
    description: 'Vibrant ruby-red whole Egyptian hibiscus calyces steeped in a clear glass cup with crushed wild berries and raw honey for a floral, uplifting sip.',
    price: 120,
    ingredients: ['Whole Egyptian dried hibiscus calyces', 'Dried wild cranberries', 'Raw forest honey', 'Fresh orange peel essence'],
    imageUrl: '/hibiscus-tea.jpg',
    imagePosition: 'center 20%',
    badge: 'Caffeine-Free',
    calories: '35 kcal'
  },
  {
    id: 'butterfly-pea-tea',
    name: 'Butterfly Pea Tea',
    category: 'Tea',
    description: 'A mesmerizing, vivid sapphire-blue iced tea brewed from sun-dried butterfly pea blossoms, chilled over crystal ice with fresh garden mint and wild honey.',
    price: 130,
    ingredients: ['Sun-dried butterfly pea blossoms', 'Crushed kaffir lime zest', 'Fresh garden mint sprig', 'Organic wild blossom honey', 'Crystal ice cubes'],
    imageUrl: '/butterfly-pea-tea.jpg',
    imagePosition: 'center 40%',
    badge: 'Vivid Blue',
    calories: '20 kcal'
  },


  // DESSERTS (5 items)
  {
    id: 'chocolate-brownie',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    description: 'Fudgy, dense Belgian chocolate square baked with browned butter, roasted walnut chunks, and finished with Maldon sea salt flakes.',
    price: 160,
    ingredients: ['Belgian dark chocolate (70%)', 'Dutch cocoa', 'Browned unsalted butter', 'California walnuts', 'Flaky Maldon sea salt'],
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    badge: 'Decadent',
    calories: '380 kcal'
  },
  {
    id: 'new-york-cheesecake-slice',
    name: 'New York Cheesecake slice',
    category: 'Desserts',
    description: 'Authentic dense and creamy Philadelphia cream cheese filling on a buttery cinnamon-graham crust, kissed with Meyer lemon zest and vanilla.',
    price: 220,
    ingredients: ['Philadelphia cream cheese', 'Cinnamon graham cracker crust', 'Madagascar vanilla bean', 'Sour cream', 'Meyer lemon zest'],
    imageUrl: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=800&q=80',
    badge: 'Chef Favorite',
    calories: '420 kcal'
  },
  {
    id: 'tiramisu-cup',
    name: 'Tiramisu Cup',
    category: 'Desserts',
    description: 'Traditional Italian dessert layered in a glass: espresso-drenched ladyfinger biscuits, whipped mascarpone zabaglione, and rich raw Dutch cocoa.',
    price: 240,
    ingredients: ['Savoiardi ladyfingers', 'Caffeine Cove double espresso', 'Italian mascarpone', 'Free-range egg yolk cream', 'Dutch cocoa dusting'],
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 85%',
    isPopular: true,
    bestForNewcomers: true,
    whyTryThis: 'An airy, cloud-like Italian indulgence soaked with our fresh espresso that literally melts on your tongue.',
    badge: 'Signature',
    calories: '360 kcal'
  },
  {
    id: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    category: 'Desserts',
    description: 'Tender, golden buttermilk muffin bursting with plump, wild handpicked blueberries, crowned with a crunchy cinnamon turbinado sugar crumb.',
    price: 130,
    ingredients: ['Cultivated wild blueberries', 'Buttermilk muffin sponge', 'Pure vanilla extract', 'Turbinado brown sugar streusel'],
    imageUrl: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=80',
    calories: '280 kcal'
  },
  {
    id: 'vanilla-ice-cream-scoop',
    name: 'Vanilla Ice Cream Scoop',
    category: 'Desserts',
    description: 'Artisanal slow-churned double cream gelato speckled with fragrant black Madagascar vanilla bean caviar. Pure, simple perfection.',
    price: 90,
    ingredients: ['Fresh heavy cream', 'Whole milk', 'Madagascar Bourbon vanilla bean caviar', 'Pure cane sugar'],
    imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80',
    calories: '180 kcal'
  },

  // SNACKS & SHAKES (4 items)
  {
    id: 'cheese-sandwich',
    name: 'Cheese Sandwich',
    category: 'Snacks & Shakes',
    description: 'A comforting blend of sharp yellow cheddar and stretchy mozzarella between thick butter-griddled multigrain bread with spicy green herb chutney.',
    price: 140,
    ingredients: ['Sharp cheddar', 'Mozzarella', 'Artisan multigrain sourdough', 'Salted dairy butter', 'Cilantro mint chutney'],
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    badge: 'Comfort Food',
    calories: '390 kcal'
  },
  {
    id: 'chocolate-milkshake',
    name: 'Chocolate Milkshake',
    category: 'Snacks & Shakes',
    description: 'Thick, creamy retro milkshake blended with rich Belgian dark chocolate ganache, double-vanilla ice cream, topped with whipped cream swirl.',
    price: 170,
    ingredients: ['Belgian dark chocolate ganache', 'Vanilla bean gelato', 'Cold whole milk', 'Whipped dairy cream', 'Dark chocolate curls'],
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    imagePosition: 'center 26%',
    badge: 'Rich & Creamy',
    calories: '450 kcal'
  },
  {
    id: 'strawberry-smoothie',
    name: 'Strawberry Smoothie',
    category: 'Snacks & Shakes',
    description: 'Sun-ripened sweet strawberries whirled with thick unsweetened Greek yogurt, soaked chia seeds, and raw blossom honey for a revitalizing boost.',
    price: 180,
    ingredients: ['Fresh alpine strawberries', 'Thick Greek yogurt', 'Black chia seeds', 'Cold almond/dairy milk', 'Raw blossom honey'],
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    badge: 'Refreshing',
    calories: '210 kcal'
  },
  {
    id: 'garlic-bread',
    name: 'Garlic Bread',
    category: 'Snacks & Shakes',
    description: 'Crusty freshly baked artisanal baguette slices brushed with slow-roasted garlic herb butter, toasted until crisp, and sprinkled with aged parmesan.',
    price: 130,
    ingredients: ['French baguette', 'Slow-roasted confit garlic', 'Cultured salted butter', 'Fresh Italian flat parsley', 'Aged parmesan cheese'],
    imageUrl: '/garlic-bread.jpg',
    imagePosition: 'center center',
    isPopular: true,
    bestForNewcomers: true,
    whyTryThis: 'Golden crisp baguette edges giving way to an irresistibly aromatic garlic-butter center topped with bubbling cheese.',
    badge: 'Warm & Savory',
    calories: '310 kcal'
  }
];

export const CAFE_INFO = {
  name: 'Caffeine Cove',
  tagline: 'Artisanal roasts, comforting sips, and handcrafted treats in every cup.',
  subtagline: 'Nestled in the cozy corners of the city, Caffeine Cove is your sanctuary for slow mornings, warm conversations, and honest flavors.',
  address: '42 Whispering Pines Lane, Off Pali Hill, Bandra West, Mumbai 400050',
  city: 'Mumbai',
  phone: '+91 98200 12345',
  email: 'hello@caffeinecove.cafe',
  openingHours: {
    weekdays: '7:30 AM – 10:30 PM (Mon – Fri)',
    weekends: '8:00 AM – 11:30 PM (Sat – Sun)',
  },
  promoCodes: [
    {
      code: 'WELCOME10',
      description: '10% off entire order',
      discountType: 'percentage',
      discountValue: 0.10,
    },
    {
      code: 'SWEET20',
      description: '20% off desserts only',
      discountType: 'category_percentage',
      discountValue: 0.20,
      targetCategory: 'Desserts',
    }
  ],
  deliveryFee: 40,
  freeDeliveryThreshold: 500,
  rickRollUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  rickRollEmbedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&playsinline=1'
};

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    title: 'Cozy Morning Corner',
    caption: 'Soft sunlight, warm leather armchairs, and the aroma of freshly ground Arabica.'
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    title: 'Espresso Bar Precision',
    caption: 'Every shot dialed in and extracted with calibrated temperature and pressure.'
  },
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    title: 'The Sunlit Patio',
    caption: 'Our leafy outdoor garden seating where laughter and conversations flow freely.'
  },
  {
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    title: 'Handcrafted Latte Art',
    caption: 'Pouring velvety microfoam hearts and rosettas with barista love.'
  },
  {
    url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80',
    title: 'Freshly Baked Trays',
    caption: 'Warm pastries and buttery croissants coming straight from our dawn ovens.'
  },
  {
    url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    title: 'Evening Café Lights',
    caption: 'Fairy lights and acoustic jazz as the evening crowd gathers for dessert.'
  }
];
