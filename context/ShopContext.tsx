import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order } from '../types';
import { INITIAL_PRODUCTS, MOCK_USERS } from '../constants';
import { supabase } from '../services/supabaseClient';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  isCartOpen: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, pass: string) => void;
  addToCart: (product: Product, size: number) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (shippingAddress: any) => void;
  toggleCart: () => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from local storage or constants
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mix_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mix_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('mix_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mix_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence Effects
  useEffect(() => localStorage.setItem('mix_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('mix_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => {
    if (user) localStorage.setItem('mix_user', JSON.stringify(user));
    else localStorage.removeItem('mix_user');
  }, [user]);
  useEffect(() => localStorage.setItem('mix_orders', JSON.stringify(orders)), [orders]);

  // Fetch orders from Supabase when user changes
  useEffect(() => {
    const fetchSupabaseOrders = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders from Supabase:', error);
          return;
        }

        if (data) {
          // Map Supabase flat structure to app Order structure
          const mappedOrders: Order[] = data.map((sbOrder: any) => ({
            id: sbOrder.id?.toString() || `sb-${Date.now()}`,
            userId: user.id,
            // Since Supabase stores "selected_product" as a summary string, we create a mock item for display
            items: [{
              id: 'summary',
              name: sbOrder.selected_product || 'Order Summary',
              brand: 'Mixed',
              price: sbOrder.total_amount || 0,
              description: '',
              images: ['https://placehold.co/100'], // Placeholder
              sizes: [],
              category: 'Order',
              stock: 0,
              cartId: 'summary-item',
              selectedSize: 0,
              quantity: 1
            }],
            total: sbOrder.total_amount || 0,
            status: 'processing', // Default status from Supabase
            date: sbOrder.created_at || new Date().toISOString(),
            shippingAddress: {
              street: sbOrder.address || '',
              city: sbOrder.city || '',
              state: '',
              zip: sbOrder.zip_code || '',
              country: ''
            }
          }));

          // Merge with local orders or replace? 
          // For this demo, let's prefer Supabase data if available, or just append.
          // Since we want to show the specific implementation, let's set Supabase orders.
          if (mappedOrders.length > 0) {
            setOrders(mappedOrders);
          }
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };

    fetchSupabaseOrders();
  }, [user]);

  // Actions
  const login = (email: string, pass: string) => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === pass);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const signup = (name: string, email: string, pass: string) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      password: pass,
      role: 'customer'
    };
    // In a real app, we'd add to DB. Here we just log them in.
    setUser(newUser);
  };

  const addToCart = (product: Product, size: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.cartId === existing.cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1, cartId: `${product.id}-${size}-${Date.now()}` }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.cartId === cartId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (shippingAddress: any) => {
    if (!user) return;
    
    // Optimistic update for immediate UI feedback (still saves to local storage as backup)
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      userId: user.id,
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress,
    };
    
    // We add it to state so user sees it immediately. 
    // The Checkout page handles the actual Supabase insert.
    // When the user refreshes or logs in again, data comes from Supabase.
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ShopContext.Provider value={{
      products, cart, user, orders, isCartOpen,
      login, logout, signup, addToCart, removeFromCart, updateQuantity, clearCart,
      placeOrder, toggleCart, addProduct, deleteProduct
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
};