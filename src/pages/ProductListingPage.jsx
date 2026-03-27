import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, 
  ChevronDown, 
  Grid, 
  List, 
  Star, 
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';

const CATEGORIES = ['Electronics', 'Fashion', 'Home Decor', 'Beauty', 'Sports', 'Books', 'Toys', 'Kitchen'];
const BRANDS = ['Apple', 'Sony', 'Samsung', 'Luxe Maison', 'Elite Wear', 'Zenith'];
const RATINGS = [4, 3, 2];
const PRICE_RANGES = [
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹20,000', min: 5000, max: 20000 },
  { label: '₹20,000 - ₹50,000', min: 20000, max: 50000 },
  { label: 'Over ₹50,000', min: 50000, max: Infinity }
];

export default function ProductListingPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Filters state
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (slug && slug !== 'all') {
      result = result.filter(p => p.category.toLowerCase().includes(slug.toLowerCase()));
    }
    
    if (query) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedRating) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    if (selectedPrice) {
      result = result.filter(p => p.price >= selectedPrice.min && p.price <= selectedPrice.max);
    }

    return result;
  }, [slug, query, selectedBrands, selectedRating, selectedPrice]);

  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    if (sortBy === 'price-low') arr.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') arr.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [filteredProducts, sortBy]);

  return (
    <div className="bg-luxe-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">
             <Link to="/" className="hover:text-white transition-all">Home</Link>
             <ChevronRight size={10} />
             <span className="text-white/60">Collection</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-white text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter leading-none mb-4">
                {slug ? slug.replace('-', ' ') : 'All Products'} <span className="text-white/20">({sortedProducts.length})</span>
              </h1>
              <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em]">Curated high-performance selection</p>
            </div>
            
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setShowFilters(!showFilters)}
                 className={`lg:hidden flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
                   showFilters ? 'bg-white border-white text-black' : 'glass-panel text-white border-white/10'
                 }`}
               >
                 <SlidersHorizontal size={18} /> Filters
               </button>
               
               <div className="relative group">
                 <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                   className="bg-white/5 border border-white/10 text-white pl-6 pr-12 py-3 rounded-2xl appearance-none focus:outline-none focus:border-white/30 text-xs font-bold uppercase tracking-widest cursor-pointer"
                 >
                   <option value="relevance" className="bg-luxe-dark">Relevance</option>
                   <option value="price-low" className="bg-luxe-dark">Price: Low to High</option>
                   <option value="price-high" className="bg-luxe-dark">Price: High to Low</option>
                   <option value="rating" className="bg-luxe-dark">Highest Rated</option>
                 </select>
                 <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={16} />
               </div>

               <div className="hidden sm:flex glass-panel p-1 rounded-xl">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                 >
                   <Grid size={18} />
                 </button>
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                 >
                   <List size={18} />
                 </button>
               </div>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar Filters */}
          <aside className={`fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-0 lg:block lg:w-72 bg-luxe-black lg:bg-transparent p-10 lg:p-0 transition-all duration-500 overflow-y-auto ${
            showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
             <div className="lg:hidden flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black font-outfit uppercase text-white tracking-tighter">Refine</h2>
                <button onClick={() => setShowFilters(false)} className="p-3 glass-panel rounded-2xl text-white">
                  <X size={24} />
                </button>
             </div>

             <div className="space-y-10 lg:sticky lg:top-32">
                {/* Categories */}
                <div>
                   <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Departments</h3>
                   <div className="space-y-3">
                      {CATEGORIES.map(cat => (
                        <Link 
                          key={cat} 
                          to={`/category/${cat.toLowerCase().replace(' ', '-')}`}
                          className={`flex items-center justify-between text-sm font-medium transition-colors ${
                            slug === cat.toLowerCase().replace(' ', '-') ? 'text-white' : 'text-white/40 hover:text-white'
                          }`}
                        >
                          {cat}
                          <ChevronRight size={14} className={slug === cat.toLowerCase().replace(' ', '-') ? 'opacity-100' : 'opacity-0'} />
                        </Link>
                      ))}
                   </div>
                </div>

                {/* Brands */}
                <div>
                   <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Brands</h3>
                   <div className="grid grid-cols-2 gap-3">
                      {BRANDS.map(brand => (
                        <button 
                          key={brand}
                          onClick={() => {
                            setSelectedBrands(prev => 
                               prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                            )
                          }}
                          className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${
                            selectedBrands.includes(brand) 
                            ? 'bg-white border-white text-black' 
                            : 'glass-panel border-white/5 text-white/40 hover:border-white/20'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Price */}
                <div>
                   <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">Investment Range</h3>
                   <div className="space-y-3">
                      {PRICE_RANGES.map(range => (
                        <button 
                          key={range.label}
                          onClick={() => setSelectedPrice(selectedPrice === range ? null : range)}
                          className={`w-full text-left text-sm font-medium transition-all flex items-center gap-3 ${
                            selectedPrice === range ? 'text-white' : 'text-white/40 hover:text-white'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border border-white/20 flex items-center justify-center ${selectedPrice === range ? 'bg-white border-white' : 'bg-transparent'}`}>
                             {selectedPrice === range && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                          </div>
                          {range.label}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Rating */}
                <div>
                   <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">User Rating</h3>
                   <div className="space-y-3">
                      {RATINGS.map(rate => (
                        <button 
                          key={rate}
                          onClick={() => setSelectedRating(selectedRating === rate ? null : rate)}
                          className={`w-full flex items-center gap-2 text-sm font-medium transition-all ${
                            selectedRating === rate ? 'text-white' : 'text-white/40 hover:text-white'
                          }`}
                        >
                          <div className="flex gap-1">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} size={14} fill={i < rate ? "white" : "none"} className={i < rate ? "text-white" : "text-white/10"} />
                             ))}
                          </div>
                          <span>& Above</span>
                        </button>
                      ))}
                   </div>
                </div>

                {/* Clear All */}
                {(selectedBrands.length > 0 || selectedRating || selectedPrice) && (
                   <button 
                     onClick={() => { setSelectedBrands([]); setSelectedRating(null); setSelectedPrice(null); }}
                     className="w-full py-4 glass-panel rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all"
                   >
                     Clear All Filters
                   </button>
                )}
             </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
             {sortedProducts.length > 0 ? (
               <div className={viewMode === 'grid' ? 
                 "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : 
                 "flex flex-col gap-8"
               }>
                 {sortedProducts.map((p, i) => (
                   <motion.div 
                     key={p.id}
                     initial={{ opacity: 0, scale: 0.95 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.4, delay: i * 0.05 }}
                   >
                     <ProductCard product={p} />
                   </motion.div>
                 ))}
               </div>
             ) : (
               <div className="glass-panel py-32 rounded-[4rem] text-center border-dashed border-white/10">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                     <TrendingUp size={48} className="text-white/10" />
                  </div>
                  <h2 className="text-3xl font-black font-outfit uppercase text-white mb-4">No Matches Found</h2>
                  <p className="text-white/40 font-medium max-w-sm mx-auto mb-10">Adjust your criteria or broaden your preference for the perfect match.</p>
                  <button 
                    onClick={() => { setSelectedBrands([]); setSelectedRating(null); setSelectedPrice(null); }}
                    className="btn-premium px-10 py-5 text-xs font-black uppercase tracking-widest"
                  >
                    Reset Collection
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
