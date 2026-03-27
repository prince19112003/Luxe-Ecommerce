import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  User, 
  Bell, 
  LogOut,
  Menu,
  X,
  Store,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';

export default function SellerLayout() {
  const { user, logout, role } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (role !== 'seller') return <Navigate to="/" replace />;

  const NAV_ITEMS = [
    { name: 'Dashboard', path: '/seller', icon: LayoutDashboard },
    { name: 'My Products', path: '/seller/products', icon: Package },
    { name: 'Orders', path: '/seller/orders', icon: ShoppingBag },
    { name: 'Payments', path: '/seller/payments', icon: DollarSign },
    { name: 'Brand Story', path: '/seller/profile', icon: Store },
  ];

  const BOTTOM_ITEMS = [
    { name: 'Settings', path: '/seller/settings', icon: Settings },
    { name: 'Support', path: '/seller/support', icon: HelpCircle },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 p-6">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-luxe-red rounded-2xl flex items-center justify-center text-white font-black text-xl font-outfit shadow-luxe-md">L</div>
        <span className="text-2xl font-black font-outfit text-gray-900">Luxe <span className="text-[10px] text-luxe-red uppercase tracking-widest block -mt-1">Seller Central</span></span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                isActive 
                ? 'bg-red-50 text-luxe-red shadow-sm' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-luxe-red' : 'text-gray-400'} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="pt-6 border-t border-gray-100 space-y-1">
        {BOTTOM_ITEMS.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
          >
            <item.icon size={20} className="text-gray-400" />
            {item.name}
          </Link>
        ))}
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all mt-4"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Luxe</span>
              <span>/</span>
              <span className="text-gray-900">{location.pathname === '/seller' ? 'Dashboard' : location.pathname.split('/').pop()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 text-gray-400 hover:text-luxe-red hover:bg-red-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-luxe-red rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-100"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black font-outfit text-gray-900 leading-none">{user?.storeName || 'TechZone'}</p>
                <p className="text-[10px] font-bold text-green-600">Active Seller</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-luxe-red flex items-center justify-center text-white font-black shadow-luxe-sm">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from 'react';
