import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ShoppingBag,
  Bell,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { useAuth } from '../../store/useAuth';

const CATEGORIES = [
  { name: 'Electronics', slug: 'electronics', icon: '💻' },
  { name: 'Fashion', slug: 'fashion', icon: '👗' },
  { name: 'Home & Furniture', slug: 'home-furniture', icon: '🏠' },
  { name: 'Beauty', slug: 'beauty', icon: '💄' },
  { name: 'Sports & Fitness', slug: 'sports-fitness', icon: '🏋️' },
  { name: 'Books', slug: 'books', icon: '📚' },
  { name: 'Toys & Baby', slug: 'toys-baby', icon: '🧸' },
  { name: 'Kitchen', slug: 'kitchen', icon: '🍳' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const {
    cart,
    wishlist,
    notifications,
    currency,
    setCurrency,
    markNotificationsAsRead
  } = useStore();
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const SUB_CATEGORIES = {
    'electronics': ['Smartphones', 'Laptops', 'Audio', 'Cameras', 'Televisions'],
    'fashion': ['Menswear', 'Womenswear', 'Accessories', 'Footwear', 'Watches'],
    'home-furniture': ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Decor'],
    'beauty': ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Bath & Body'],
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div
          className={`relative flex items-center justify-between px-8 rounded-[2rem] transition-all duration-500 border border-white/10 ${isScrolled
            ? 'bg-black/80  h-16 shadow-[0_8px_32px_rgba(0,0,0,0.8)]'
            : 'bg-black/40  h-20 shadow-none'
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <motion.div
              whileHover={{ rotate: 180 }}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              L
            </motion.div>
            <span className="text-2xl font-black font-outfit text-white tracking-tighter group-hover:text-white/80 transition-colors">
              LUXE
            </span>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-12 relative z-10"
          >
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search luxury products, brands and more..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors" size={18} />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-6 relative z-10">
            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8 mr-4">
              {['New Arrivals', 'Brands'].map((item) => (
                <button key={item} className="text-sm font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest text-[10px]">
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link to="/profile" className="p-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all relative group">
                <Heart size={20} className="group-hover:text-white" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-black"></span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-white/5 transition-all group">
                <ShoppingCart size={20} className="text-white/60 group-hover:text-white" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-white text-black text-[10px] font-black flex items-center justify-center rounded-full px-1.5 shadow-lg">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    if (!showNotifications) markNotificationsAsRead();
                  }}
                  className="relative p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <Bell size={20} className="text-white/60 group-hover:text-white" />
                  {notifications.some(n => n.unread) && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 glass-dark rounded-3xl p-4 shadow-2xl border border-white/10 z-50"
                    >
                      <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="text-white font-black uppercase text-[10px] tracking-widest">Notifications</h3>
                        <span className="text-[10px] text-white/20 font-bold uppercase">{notifications.length} Total</span>
                      </div>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                        {notifications.map(n => (
                          <div key={n.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                            <p className={`text-[11px] leading-relaxed mb-1 ${n.unread ? 'text-white' : 'text-white/40'}`}>{n.text}</p>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">{n.time}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Currency Selector */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <span className="text-white font-black text-[10px] uppercase tracking-widest">{currency.code}</span>
                  <span className="text-white/40 text-xs">{currency.symbol}</span>
                </button>
                <AnimatePresence>
                  {showCurrencyDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 mt-2 w-24 glass-dark rounded-2xl p-2 border border-white/10 z-50"
                    >
                      {['INR', 'USD', 'EUR'].map(c => (
                        <button
                          key={c}
                          onClick={() => {
                            setCurrency(c);
                            setShowCurrencyDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currency.code === c ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                            }`}
                        >
                          {c}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-6 w-px bg-white/10 mx-2"></div>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-3 pl-2 py-1.5 rounded-xl hover:bg-white/5 transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/20 overflow-hidden">
                      <User size={18} className="text-white" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none mb-1">Welcome</p>
                      <p className="text-xs font-bold text-white leading-none">{user.name.split(' ')[0]}</p>
                    </div>
                    <ChevronDown size={14} className={`text-white/40 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-64 glass-dark rounded-3xl p-3 shadow-2xl border border-white/10"
                      >
                        <div className="p-3 border-b border-white/5 mb-2">
                          <p className="font-outfit font-black text-white">{user.name}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{role} Account</p>
                        </div>
                        <div className="space-y-1">
                          <Link to={role === 'seller' ? '/seller' : '/profile'} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-bold">
                            <Settings size={16} /> Dashboard
                          </Link>
                          <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-bold">
                            <ShoppingBag size={16} /> My Orders
                          </Link>
                          <button
                            onClick={() => { logout(); setShowUserDropdown(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-400/10 transition-all text-sm font-bold mt-2"
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`btn-premium uppercase tracking-widest font-black ml-2 shadow-[0_4px_20px_rgba(255,255,255,0.1)] transition-all duration-500 ${isScrolled ? 'py-1 px-3.5 text-xs rounded-xl' : 'py-1.5 px-4 text-xs rounded-2xl'
                    }`}
                >
                  Join Luxe
                </Link>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white/60 hover:text-white transition-all ml-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar (Desktop) - Only on Home Page with Mega Menu */}
        {isHomePage && !isScrolled && (
          <div className="relative mt-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-start lg:justify-center gap-10 px-10 py-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-x-auto no-scrollbar scroll-smooth mx-4 lg:mx-auto"
            >
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.slug}
                  onMouseEnter={() => setHoveredCategory(cat.slug)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="relative py-4 group/cat flex-shrink-0"
                >
                  <Link
                    to={`/category/${cat.slug}`}
                    className={`flex items-center gap-3 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-all group ${hoveredCategory === cat.slug ? 'text-white' : 'text-white/40 hover:text-white'
                      }`}
                  >
                    <span className={`text-lg transition-all duration-500 ${hoveredCategory === cat.slug ? 'grayscale-0 scale-110' : 'grayscale'}`}>
                      {cat.icon}
                    </span>
                    {cat.name}
                  </Link>

                  <AnimatePresence>
                    {hoveredCategory === cat.slug && SUB_CATEGORIES[cat.slug] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 min-w-[280px]"
                      >
                        <div className="p-8 glass-dark border border-white/10 rounded-[2.5rem] shadow-3xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                          <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 whitespace-nowrap">Explore {cat.name}</h4>
                          <div className="grid grid-cols-1 gap-4">
                            {SUB_CATEGORIES[cat.slug].map((sub) => (
                              <Link
                                key={sub}
                                to={`/category/${cat.slug}?sub=${sub.toLowerCase()}`}
                                className="text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-between group/item"
                              >
                                {sub}
                                <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-white/40">→</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-dark border-b border-white/10 mt-2 mx-6 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-2xl focus:outline-none focus:border-white/30"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              </form>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white active:bg-white/10 transition-all border border-white/5"
                  >
                    <span>{cat.icon}</span>
                    {cat.name.split(' ')[0]}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}