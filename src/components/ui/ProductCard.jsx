import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
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

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation for quick view if needed
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="product-card-glass group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="block relative">
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-xl backdrop-blur-md border transition-all duration-300 ${
            isWishlisted 
            ? 'bg-white border-white text-black' 
            : 'bg-black/20 border-white/10 text-white/40 hover:text-white hover:border-white/30'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "black" : "none"} />
        </button>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">
            -{product.discount}% OFF
          </div>
        )}

        {/* Image Container */}
        <div className="product-image-container relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
             <button 
                onClick={handleQuickView}
                className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
             >
                <Eye size={20} />
             </button>
             <button 
                onClick={handleAddToCart}
                className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
             >
                <ShoppingCart size={20} />
             </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{product.brand}</p>
           <h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-white/80 transition-colors mb-2">{product.name}</h3>
           
           <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md">
                 <Star size={10} className="text-white fill-white" />
                 <span className="text-[10px] font-bold text-white">{product.rating}</span>
              </div>
              <span className="text-[10px] text-white/20 font-medium">({product.reviews.length} Reviews)</span>
           </div>

           <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-black font-outfit text-white">₹{product.price.toLocaleString()}</p>
                <p className="text-[10px] text-white/20 line-through font-bold">₹{product.mrp.toLocaleString()}</p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="btn-premium px-4 py-2 text-[10px] font-black uppercase tracking-widest"
              >
                Add
              </motion.button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
