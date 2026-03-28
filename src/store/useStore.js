import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '../data/products';

// ─── Cart + Wishlist + UI Store ───
export const useStore = create(
  persist(
    (set, get) => ({
      // Products
      products: initialProducts,
      addProduct: (product) => set(state => ({ products: [product, ...state.products] })),
      removeProduct: (id) => set(state => ({ products: state.products.filter(p => p.id !== id) })),
      updateProduct: (id, updates) => set(state => ({ products: state.products.map(p => p.id === id ? { ...p, ...updates } : p) })),

      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        const existing = get().cart.find(i => i.id === product.id);
        if (existing) {
          set(state => ({
            cart: state.cart.map(i =>
              i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
            )
          }));
        } else {
          set(state => ({ cart: [...state.cart, { ...product, quantity }] }));
        }
      },
      removeFromCart: (id) => set(state => ({ cart: state.cart.filter(i => i.id !== id) })),
      updateQuantity: (id, quantity) => {
        if (quantity < 1) return get().removeFromCart(id);
        set(state => ({ cart: state.cart.map(i => i.id === id ? { ...i, quantity } : i) }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getCartMRP: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.mrp * item.quantity, 0);
      },
      getCartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (productId) => {
        const exists = get().wishlist.includes(productId);
        if (exists) {
          set(state => ({ wishlist: state.wishlist.filter(id => id !== productId) }));
        } else {
          set(state => ({ wishlist: [...state.wishlist, productId] }));
        }
      },
      isWishlisted: (id) => get().wishlist.includes(id),
      removeFromWishlist: (id) => set(state => ({ wishlist: state.wishlist.filter(wid => wid !== id) })),

      // Recently Viewed
      recentlyViewed: [],
      addToRecentlyViewed: (product) => {
        const filtered = get().recentlyViewed.filter(p => p.id !== product.id);
        set({ recentlyViewed: [product, ...filtered].slice(0, 10) });
      },

      // Promo Code
      promoCode: null,
      discountPercentage: 0,
      applyPromoCode: (code) => {
        const codes = {
          'LUXE20': 20,
          'FIRST10': 10,
          'ELITE50': 50
        };
        if (codes[code]) {
          set({ promoCode: code, discountPercentage: codes[code] });
          return true;
        }
        return false;
      },

      // Currency
      currency: { code: 'INR', symbol: '₹', rate: 1 },
      setCurrency: (currencyCode) => {
        const currencies = {
          'INR': { code: 'INR', symbol: '₹', rate: 1 },
          'USD': { code: 'USD', symbol: '$', rate: 0.012 },
          'EUR': { code: 'EUR', symbol: '€', rate: 0.011 }
        };
        set({ currency: currencies[currencyCode] });
      },

      // Notifications
      notifications: [
        { id: 1, text: "Price dropped on your wishlist item: Samsung S24", time: "2h ago", unread: true },
        { id: 2, text: "Your order LX-71234 has been delivered", time: "5h ago", unread: false },
        { id: 3, text: "New Collection: Summer Elite '26 is now live", time: "1d ago", unread: true },
      ],
      markNotificationsAsRead: () => set(state => ({
        notifications: state.notifications.map(n => ({ ...n, unread: false }))
      })),

      // Search
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      // Checkout
      checkoutAddress: null,
      setCheckoutAddress: (address) => set({ checkoutAddress: address }),
      selectedPayment: 'upi',
      setSelectedPayment: (method) => set({ selectedPayment: method }),

      // Orders (buyer)
      orders: [
        { id: "LX-71234", date: "2026-03-20", status: "delivered", total: 124999, items: [{ name: "Samsung Galaxy S24 Ultra", qty: 1, price: 124999, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80" }], address: "Flat 4B, Green Park, Delhi 110016" },
        { id: "LX-71198", date: "2026-03-15", status: "shipped", total: 24990, items: [{ name: "Sony WH-1000XM5", qty: 1, price: 24990, image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=80" }], address: "Flat 4B, Green Park, Delhi 110016" },
        { id: "LX-70945", date: "2026-03-10", status: "delivered", total: 7294, items: [{ name: "Levi's Jeans", qty: 2, price: 2299, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=80" }, { name: "boAt Rockerz", qty: 2, price: 1299, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=80" }], address: "Flat 4B, Green Park, Delhi 110016" },
      ],
      addOrder: (order) => set(state => ({ orders: [order, ...state.orders], cart: [] })),
    }),
    {
      name: 'luxe-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        orders: state.orders,
      }),
    }
  )
);
