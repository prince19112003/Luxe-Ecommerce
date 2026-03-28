import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';
import ProductCard from '../components/ui/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id || p.id.toString() === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('highlights');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { addToCart, toggleWishlist, wishlist, addToRecentlyViewed, recentlyViewed, currency } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
      style: {
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '12px 24px',
      }
    });
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryStatus('Delivery by tomorrow, 11 AM');
    } else {
      setDeliveryStatus('Invalid pincode');
    }
  };

  return (
    <div className="bg-luxe-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-12">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to={`/category/${product.category}`} className="hover:text-white transition-colors">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-white/60">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div 
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-white/5 border border-white/5 group cursor-zoom-in"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePos({ x, y });
              }}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: 1, 
                  scale: isZoomed ? 2 : 1,
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                }}
                transition={{ duration: isZoomed ? 0.2 : 0.6 }}
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-8 right-8 p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 z-10 ${
                  isWishlisted 
                  ? 'bg-white border-white text-black' 
                  : 'bg-black/20 border-white/10 text-white/40 hover:text-white'
                }`}
              >
                <Heart size={24} fill={isWishlisted ? "black" : "none"} />
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-white scale-95 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-4">{product.brand}</p>
              <h1 className="text-white text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-6 mb-10">
                <div className="flex items-center gap-2 px-3 py-1.5 glass-panel rounded-xl">
                  <Star size={16} fill="white" className="text-white" />
                  <span className="text-white font-black text-sm">{product.rating}</span>
                </div>
                <span className="text-white/20 text-xs font-bold uppercase tracking-widest">{product.reviews.length} Verified Reviews</span>
                <div className="h-4 w-px bg-white/10"></div>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: product.description,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('Link copied to clipboard!');
                    }
                  }}
                  className="text-white/40 hover:text-white flex items-center gap-2 transition-all"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <div className="glass-panel p-8 rounded-[2.5rem] mb-10 border-white/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                 
                 <div className="relative z-10">
                   <div className="flex items-baseline gap-4 mb-2">
                     <span className="text-5xl font-black font-outfit text-white tracking-tighter">
                       {currency.symbol}{(product.price * currency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                     </span>
                     <span className="text-white/20 text-lg line-through font-bold">
                       {currency.symbol}{(product.mrp * currency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                     </span>
                     <span className="text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded-md">
                        {product.discount}% OFF
                     </span>
                   </div>
                   
                   <div className="flex items-center gap-4 mb-8">
                     <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                       <Check size={14} /> In Stock
                     </p>
                     {product.stock < 50 && (
                       <span className="text-red-400 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-red-400/10 rounded-full animate-pulse">
                         Only {product.stock} left in stock!
                       </span>
                     )}
                   </div>

                   {/* Variants Selector */}
                   <div className="mb-8">
                     <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">
                       {product.category === 'fashion' ? 'Select Size' : 'Select Storage'}
                     </p>
                     <div className="flex flex-wrap gap-3">
                       {(product.category === 'fashion' 
                         ? ['S', 'M', 'L', 'XL'] 
                         : ['128GB', '256GB', '512GB', '1TB']
                       ).map(variant => (
                         <button
                           key={variant}
                           onClick={() => setSelectedVariant(variant)}
                           className={`px-6 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                             selectedVariant === variant 
                             ? 'bg-white border-white text-black' 
                             : 'glass-panel border-white/10 text-white/40 hover:border-white/30'
                           }`}
                         >
                           {variant}
                         </button>
                       ))}
                     </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center glass-panel rounded-2xl p-1">
                          <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 text-white/40 hover:text-white transition-all"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center font-black text-white">{quantity}</span>
                          <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-3 text-white/40 hover:text-white transition-all"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={handleAddToCart}
                          className="flex-1 btn-premium py-5 text-sm uppercase tracking-[0.2em] font-black group"
                        >
                          <span className="flex items-center justify-center gap-3">
                            <ShoppingCart size={20} /> Add to Collection
                          </span>
                        </button>
                      </div>
                      <button className="w-full py-5 rounded-[1.5rem] border border-white/10 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-all">
                        Buy Now
                      </button>
                   </div>
                 </div>
              </div>

              {/* Extras */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center">
                  <Truck size={24} className="text-white/40 mb-4" />
                  <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">Mirror Logistics</p>
                  <p className="text-white/20 text-[10px] font-medium leading-relaxed">Complimentary express shipping worldwide.</p>
                </div>
                <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center">
                  <ShieldCheck size={24} className="text-white/40 mb-4" />
                  <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">Vault Insured</p>
                  <p className="text-white/20 text-[10px] font-medium leading-relaxed">Full insurance coverage until hand-delivery.</p>
                </div>
              </div>

              {/* Delivery Check */}
              <div className="glass-panel p-6 rounded-[2rem] border-white/5">
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Concierge Delivery Check</p>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder="Enter Global ZIP" 
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                  <button 
                    onClick={checkDelivery}
                    className="px-6 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest"
                  >
                    Check
                  </button>
                </div>
                {deliveryStatus && (
                  <p className={`mt-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${deliveryStatus.includes('tomorrow') ? 'text-green-400' : 'text-red-400'}`}>
                    <Check size={12} /> {deliveryStatus}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Tabs */}
        <section className="mt-32">
          <div className="flex gap-8 mb-12 border-b border-white/5">
            {['highlights', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs font-black uppercase tracking-[0.3em] transition-all relative ${
                  activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/40'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </button>
            ))}
          </div>

          <div className="glass-panel p-12 rounded-[4rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {activeTab === 'highlights' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-medium">
                    <ul className="space-y-6 text-white/60">
                      {product.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <div key={i} className="flex justify-between border-b border-white/5 pb-4">
                        <span className="text-white/20 text-xs font-bold uppercase tracking-widest">{key}</span>
                        <span className="text-white font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-12">
                    <div className="flex items-center justify-between mb-8">
                       <div>
                          <h3 className="text-2xl font-black font-outfit uppercase text-white mb-2">Connoisseur Feedback</h3>
                          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Insights from the global elite</p>
                       </div>
                       <button 
                         onClick={() => setShowReviewModal(true)}
                         className="px-8 py-4 glass-panel border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                       >
                         Write a Review
                       </button>
                    </div>
                    {product.reviews.map((r, i) => (
                      <div key={i} className="glass-card p-8 rounded-[2.5rem] border-white/5">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 font-black text-xs border border-white/10">
                              {r.user.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-white font-black uppercase tracking-widest text-xs mb-1">{r.user}</p>
                              <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Verified Connoisseur</p>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, star) => (
                              <Star key={star} size={14} fill={star < r.rating ? "white" : "none"} className={star < r.rating ? "text-white" : "text-white/10"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-white/60 font-medium leading-relaxed">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 1 && (
          <section className="mt-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-white text-3xl md:text-5xl font-black font-outfit uppercase tracking-tighter">Recently <span className="text-white/20">Viewed</span></h2>
            </div>
            <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8">
              {recentlyViewed.filter(p => p.id !== product.id).map(p => (
                <div key={p.id} className="min-w-[280px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Collection */}
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-white text-3xl md:text-5xl font-black font-outfit uppercase tracking-tighter">Acclaimed <span className="text-white/20">Collection</span></h2>
            <Link to={`/category/${product.category}`} className="text-white/40 hover:text-white transition-all text-sm font-black uppercase tracking-widest">
              View All <ChevronRight size={16} className="inline ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass-dark border border-white/10 rounded-[3rem] p-12 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-black font-outfit uppercase text-white tracking-tighter mb-2">Submit Review</h2>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-10">Share your experience with this masterpiece</p>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-white text-[10px] font-black uppercase tracking-widest mb-3">Rating</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} className="p-1">
                          <Star size={24} className="text-white/20 hover:text-white transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-black uppercase tracking-widest mb-3">Your Perspective</p>
                    <textarea 
                      placeholder="What makes this piece unique?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:border-white/30 h-32"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      toast.success('Your review has been submitted for verification.');
                      setShowReviewModal(false);
                    }}
                    className="w-full btn-premium py-5 text-xs font-black uppercase tracking-widest"
                  >
                    Authenticate Review
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
