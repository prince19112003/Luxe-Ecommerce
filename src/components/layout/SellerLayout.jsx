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
    <div className="h-full flex flex-col bg-luxe-black border-r border-white/5 p-6">
      {/* Brand */}
      <Link to="/" className="flex items-center gap-3 mb-10 px-2 group">
        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black font-black text-xl font-outfit shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:rotate-180 transition-transform duration-500">L</div>
        <span className="text-2xl font-black font-outfit text-white tracking-tighter">LUXE <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] block -mt-1 font-bold">Seller Central</span></span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                isActive 
                ? 'glass-panel bg-white/10 text-white shadow-[0_8px_32px_rgba(255,255,255,0.05)]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-white' : 'text-white/20'} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Nav */}
      <div className="pt-6 border-t border-white/5 space-y-2">
        {BOTTOM_ITEMS.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <item.icon size={18} className="text-white/20" />
            {item.name}
          </Link>
        ))}
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 transition-all mt-4"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-luxe-black flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 fixed inset-y-0 left-0 z-50">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white/40 hover:text-white transition-all"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
              <span className="hover:text-white transition-colors cursor-pointer">Luxe</span>
              <span>/</span>
              <span className="text-white">{location.pathname === '/seller' ? 'Dashboard' : location.pathname.split('/').pop().replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2.5 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-white rounded-full border-2 border-black"></span>
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex items-center gap-4 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black font-outfit text-white leading-none mb-1 group-hover:text-white/80 transition-colors uppercase tracking-tight">{user?.storeName || 'TechZone'}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-green-400/80">Active Empire</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform font-outfit">
                {user?.storeName?.[0] || 'S'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar">
           <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Outlet />
              </motion.div>
           </AnimatePresence>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 lg:hidden"
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
