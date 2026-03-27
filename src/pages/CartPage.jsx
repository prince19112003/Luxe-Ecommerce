import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const mrpTotal = cart.reduce((acc, item) => acc + (item.mrp * item.quantity), 0);
  const savings = mrpTotal - subtotal;
  const delivery = subtotal > 10000 ? 0 : 500;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your collection is empty!');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="bg-luxe-black min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-32 h-32 glass-panel rounded-full flex items-center justify-center mb-10 text-white/10"
        >
          <ShoppingBag size={56} />
        </motion.div>
        <h1 className="text-white text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter mb-6">Your Collection <span className="text-white/20">Is Empty</span></h1>
        <p className="text-white/40 text-lg mb-12 max-w-sm font-medium">Curate your finest selection from our exclusive world-class gallery.</p>
        <Link to="/">
          <button className="btn-premium px-12 py-5 text-xs font-black uppercase tracking-[0.3em]">
            Start Curating
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-luxe-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-12">
           <Link to="/" className="hover:text-white transition-all">Home</Link>
           <ChevronRight size={10} />
           <span className="text-white/60">Your Collection</span>
        </div>

        <h1 className="text-white text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter mb-16 leading-none">
          Shopping <span className="text-white/20">Collection</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence>
              {cart.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-8 rounded-[2.5rem] border-white/5 flex flex-col sm:flex-row gap-8 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
                  
                  <div className="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/5">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">{item.brand}</p>
                          <h3 className="text-white text-xl font-black font-outfit uppercase tracking-tight">{item.name}</h3>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-3 glass-card rounded-2xl text-white/20 hover:text-red-400 hover:border-red-400/20 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-6">Masterpiece Edition</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center glass-panel rounded-2xl p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-3 text-white/40 hover:text-white transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-black text-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-3 text-white/40 hover:text-white transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-black font-outfit text-white leading-none mb-1 tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">₹{(item.mrp * item.quantity).toLocaleString()} Listing</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="p-8 glass-panel rounded-[2.5rem] border-white/5 border-dashed flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-white/40">
                    <Tag size={20} />
                  </div>
                  <p className="text-white text-sm font-bold uppercase tracking-widest">Luxury Promo Code</p>
               </div>
               <button className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all">
                  Apply Discount
               </button>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
               <div className="glass-panel p-10 rounded-[3rem] border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                  
                  <h3 className="text-white text-xl font-black font-outfit uppercase tracking-widest mb-10">Investment <span className="text-white/20">Summary</span></h3>

                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                       <span className="text-white/40">Listing Price</span>
                       <span className="text-white">₹{mrpTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                       <span className="text-white/40">Elite Savings</span>
                       <span className="text-green-400 tracking-tight">- ₹{savings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                       <span className="text-white/40">White Glove Delivery</span>
                       <span className="text-white font-black">{delivery === 0 ? 'COMPLIMENTARY' : `₹${delivery}`}</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 mb-10">
                    <div className="flex justify-between items-baseline">
                       <span className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">Total Commitment</span>
                       <span className="text-4xl font-black font-outfit text-white tracking-tighter">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    className="w-full btn-premium py-6 flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.3em] group"
                  >
                    Proceed To Vault <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center">
                    <ShieldCheck size={20} className="text-white/40 mb-3" />
                    <p className="text-white font-bold text-[10px] uppercase tracking-widest mb-1">Authentic</p>
                  </div>
                  <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center">
                    <Truck size={20} className="text-white/40 mb-3" />
                    <p className="text-white font-bold text-[10px] uppercase tracking-widest mb-1">Insured</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
