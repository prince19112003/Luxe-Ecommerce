import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock users database
const MOCK_USERS = [
  { id: 1, role: 'buyer', name: 'Arjun Mehta', email: 'arjun@luxe.com', phone: '9876543210', password: '123456', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80', luxeCoins: 2450, wallet: 1200 },
  { id: 2, role: 'seller', name: 'TechZone Official', email: 'seller@luxe.com', phone: '9876500000', password: '123456', avatar: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=80', storeName: 'TechZone', gstin: '27AAPFU0939F1ZV' },
];

export const useAuth = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      role: null, // 'buyer' | 'seller' | null
      authError: null,
      isLoading: false,

      login: (email, password, role = 'buyer') => {
        set({ isLoading: true, authError: null });
        // simulate async
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const user = MOCK_USERS.find(
              u => u.email === email && u.password === password && u.role === role
            );
            if (user) {
              const { password: _pw, ...safeUser } = user;
              set({ user: safeUser, isAuthenticated: true, role: user.role, isLoading: false, authError: null });
              resolve(safeUser);
            } else {
              set({ isLoading: false, authError: 'Invalid email or password. Try arjun@luxe.com / 123456 (buyer) or seller@luxe.com / 123456 (seller)' });
              reject(new Error('Invalid credentials'));
            }
          }, 800);
        });
      },

      register: (userData) => {
        set({ isLoading: true, authError: null });
        return new Promise((resolve) => {
          setTimeout(() => {
            const newUser = {
              id: Date.now(),
              ...userData,
              luxeCoins: 100,
              wallet: 0,
            };
            const { password: _pw, ...safeUser } = newUser;
            set({ user: safeUser, isAuthenticated: true, role: userData.role, isLoading: false });
            resolve(safeUser);
          }, 1000);
        });
      },

      logout: () => set({ user: null, isAuthenticated: false, role: null }),

      updateProfile: (updates) =>
        set(state => ({ user: { ...state.user, ...updates } })),

      clearError: () => set({ authError: null }),

      // Addresses (buyer)
      addresses: [
        { id: 1, type: 'Home', name: 'Arjun Mehta', phone: '9876543210', addressLine: 'Flat 4B, Sunrise Apartments', city: 'Delhi', state: 'Delhi', pincode: '110016', isDefault: true },
        { id: 2, type: 'Office', name: 'Arjun Mehta', phone: '9876543210', addressLine: '44 Connaught Place, Block A', city: 'Delhi', state: 'Delhi', pincode: '110001', isDefault: false },
      ],
      addAddress: (address) =>
        set(state => ({ addresses: [...state.addresses, { id: Date.now(), ...address }] })),
      updateAddress: (id, updates) =>
        set(state => ({ addresses: state.addresses.map(a => a.id === id ? { ...a, ...updates } : a) })),
      deleteAddress: (id) =>
        set(state => ({ addresses: state.addresses.filter(a => a.id !== id) })),
      setDefaultAddress: (id) =>
        set(state => ({ addresses: state.addresses.map(a => ({ ...a, isDefault: a.id === id })) })),
    }),
    {
      name: 'luxe-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
        addresses: state.addresses,
      }),
    }
  )
);
