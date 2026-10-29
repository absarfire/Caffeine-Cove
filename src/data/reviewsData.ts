export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  favoriteItem?: string;
  avatarColor: string;
}

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aanya Sharma',
    location: 'Pali Hill, Bandra',
    rating: 5,
    date: 'Yesterday',
    comment: 'The Cappuccino here ruined all other coffee for me in the best way possible. The velvety microfoam and rich double shot is my absolute happy place. The team genuinely knows their craft!',
    favoriteItem: 'Cappuccino',
    avatarColor: '#C47A3B'
  },
  {
    id: 'rev-2',
    author: 'Rohan Mehta',
    location: 'Khar West, Mumbai',
    rating: 5,
    date: '3 days ago',
    comment: 'Real talk: the freshly brewed Iced Peach Tea with organic orchard peach puree and fresh mint is the most refreshing summer drink in Mumbai. The balance of Assam black tea and crisp sweetness is perfection.',
    favoriteItem: 'Iced Peach Tea',
    avatarColor: '#3D2817'
  },
  {
    id: 'rev-3',
    author: 'Dr. Priya Desai',
    location: 'Bandra West',
    rating: 5,
    date: '1 week ago',
    comment: 'I host quiet Saturday catch-ups here. The Italian mascarpone in their Tiramisu Cup is sublime—light, espresso-infused, and not overly sweet. Truly an artisanal neighborhood sanctuary.',
    favoriteItem: 'Tiramisu Cup',
    avatarColor: '#826955'
  },
  {
    id: 'rev-4',
    author: 'Karan Varma',
    location: 'Carter Road',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Their 18-hour cold brew gave me the smoothest kick without any sharp bitterness. Pair it with the warm garlic bread straight from their morning oven. 10/10 cozy vibe!',
    favoriteItem: 'Cold Brew & Garlic Bread',
    avatarColor: '#DDA15E'
  },
  {
    id: 'rev-5',
    author: 'Simran & Kabir',
    location: 'Santacruz',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The acoustic background jazz, the aroma of freshly ground beans, and warm hospitality make Caffeine Cove feel like home. Also, asking Oliver the barista for recommendations was delightful!',
    favoriteItem: 'Caffè Latte & Veg Puff',
    avatarColor: '#5A3E25'
  }
];
