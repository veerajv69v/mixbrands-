import { Product, User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@mixbrands.com',
    role: 'admin',
    password: 'password123'
  },
  {
    id: 'u2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    password: 'password123'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Air Velocity Nitro',
    brand: 'Nike',
    price: 180,
    description: 'Experience the ultimate in speed and comfort with the Air Velocity Nitro. Designed for the modern athlete, these sneakers feature breathable mesh and responsive cushioning.',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'],
    sizes: [7, 8, 9, 10, 11, 12],
    category: 'Running',
    stock: 25,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Restorative Hair Mask',
    brand: 'Act+Acre',
    price: 45,
    description: 'A deeply nourishing treatment that repairs damaged hair and restores shine. Plant-based and cold-processed for maximum potency.',
    images: ['https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1000&auto=format&fit=crop'],
    sizes: [100, 200], // ml
    category: 'Haircare',
    stock: 40,
    featured: true,
  },
  {
    id: 'p3',
    name: 'Amber Glow Serum',
    brand: 'Mix Lab',
    price: 65,
    description: 'Rich in antioxidants, this facial oil hydrates and illuminates your complexion. Housed in UV-protective amber glass.',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop'],
    sizes: [30, 50], // ml
    category: 'Skincare',
    stock: 15,
  },
  {
    id: 'p4',
    name: 'Hydra-Cool Gel',
    brand: 'Mix Lab',
    price: 38,
    description: 'A refreshing gel moisturizer that instantly soothes and hydrates thirsty skin. Perfect for daily use.',
    images: ['https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1000&auto=format&fit=crop'],
    sizes: [50], // ml
    category: 'Skincare',
    stock: 60,
  },
  {
    id: 'p5',
    name: 'Violet Therapy Set',
    brand: 'Luxe Care',
    price: 120,
    originalPrice: 150,
    description: 'Complete color-correcting haircare system. Keeps blonde and silver hair bright and brass-free.',
    images: ['https://images.unsplash.com/photo-1620917670396-980b6e98c76b?q=80&w=1000&auto=format&fit=crop'],
    sizes: [1], // set
    category: 'Haircare',
    stock: 8,
  },
  {
    id: 'p6',
    name: 'Daily Essentials Kit',
    brand: 'Glossier',
    price: 85,
    description: 'The ultimate "no-makeup" makeup set. Includes cleanser, priming moisturizer, and lip balm.',
    images: ['https://images.unsplash.com/photo-1556228720-1987aa6c5895?q=80&w=1000&auto=format&fit=crop'],
    sizes: [1], // set
    category: 'Makeup',
    stock: 25,
    featured: true,
  },
  {
    id: 'p7',
    name: 'The Body Lotion',
    brand: 'Nécessaire',
    price: 28,
    description: 'A fast-absorbing, fragrance-free daily moisturizer with Niacinamide and Peptides. Strengthens skin barrier.',
    images: ['https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1000&auto=format&fit=crop'],
    sizes: [200], // ml
    category: 'Body',
    stock: 100,
  },
  {
    id: 'p8',
    name: 'Balance & Hydrate Set',
    brand: 'The Ordinary',
    price: 35,
    description: 'Clinical formulations with integrity. A simple, effective regimen for balanced hydration.',
    images: ['https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=1000&auto=format&fit=crop'],
    sizes: [1], // set
    category: 'Skincare',
    stock: 55,
  },
  {
    id: 'p9',
    name: 'Relief Body Oil',
    brand: 'Mender',
    price: 52,
    description: 'A luxurious botanical oil blend designed to soothe muscles and nourish skin post-workout.',
    images: ['https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1000&auto=format&fit=crop'],
    sizes: [100], // ml
    category: 'Body',
    stock: 12,
  },
  {
    id: 'p10',
    name: 'Luxe Lifestyle Edit',
    brand: 'Mix Curated',
    price: 250,
    description: 'Our editors picks: A premium selection of skincare, fragrance, and accessories for the modern woman.',
    images: ['https://images.unsplash.com/photo-1552664152-320d3f114227?q=80&w=1000&auto=format&fit=crop'],
    sizes: [1], // set
    category: 'Lifestyle',
    stock: 5,
    featured: true,
  }
];