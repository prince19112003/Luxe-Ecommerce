import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  
  const { cart, wishlist } = useStore();
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6">
        <div 
          className={`relative flex items-center justify-between px-8 rounded-[2rem] transition-all duration-500 overflow-hidden ${
            isScrolled 
            ? 'glass-dark h-16 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
            : 'bg-black/40 backdrop-blur-md h-20 border border-white/5'
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
              <Link to="/profile" className="p-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-black"></span>
                )}
              </Link>
              
              <Link to="/cart" className="p-2.5 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all relative">
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-white text-black text-[10px] font-black flex items-center justify-center rounded-full px-1.5 shadow-lg">
                    {cart.length}
                  </span>
                )}
              </Link>

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
                <Link to="/login" className="btn-premium py-2.5 px-6 text-xs uppercase tracking-widest font-black ml-2 shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
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

        {/* Categories Bar (Desktop) */}
        {!isScrolled && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center justify-center gap-10 px-8 py-4 glass-panel rounded-full overflow-x-auto no-scrollbar"
          >
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.slug} 
                to={`/category/${cat.slug}`}
                className="flex items-center gap-2 whitespace-nowrap text-[11px] font-black uppercase tracking-[0.15em] text-white/40 hover:text-white transition-all group"
              >
                <span className="text-base grayscale group-hover:grayscale-0 transition-all duration-500 scale-90 group-hover:scale-110">
                  {cat.icon}
                </span>
                {cat.name}
              </Link>
            ))}
          </motion.div>
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