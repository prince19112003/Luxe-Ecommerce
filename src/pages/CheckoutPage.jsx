import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CreditCard, 
  ShoppingBag, 
  ChevronRight, 
  CheckCircle2,
  Lock,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'address', name: 'Delivery Location', icon: MapPin },
  { id: 'payment', name: 'Secure Vault', icon: CreditCard },
  { id: 'review', name: 'Final Review', icon: ShoppingBag }
];

export default function CheckoutPage() {
  const [step, setStep] = useState('address');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { cart, clearCart, addOrder } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 10000 ? 0 : 500;
  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    const newOrder = {
      id: `LX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Secured/In Vault',
      total: total.toLocaleString(),
      items: cart.length,
      address: 'Jubilee Hills, Hyderabad' // Mock address selection
    };

    addOrder(newOrder);
    setIsOrderPlaced(true);
    
    setTimeout(() => {
      navigate('/profile');
    }, 4000);
  };

  if (isOrderPlaced) {
    return (
      <div className="bg-luxe-black min-h-screen pt-40 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-black shadow-[0_0_80px_rgba(255,255,255,0.4)] mb-12"
        >
          <CheckCircle2 size={64} strokeWidth={1.5} />
        </motion.div>
        <h1 className="text-white text-5xl md:text-8xl font-black font-outfit uppercase tracking-tighter mb-6 text-center leading-none">
          Order <span className="text-white/20">Secured</span>
        </h1>
        <p className="text-white/40 text-lg font-medium tracking-widest uppercase mb-12 text-center">Your luxury pieces are being prepared for dispatch.</p>
        <div className="w-16 h-px bg-white/20 mb-12 animate-pulse" />
        <p className="text-white/20 text-xs font-bold uppercase tracking-[0.4em]">Redirecting to Vault Control...</p>
      </div>
    );
  }

  return (
    <div className="bg-luxe-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-20">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div 
                className={`flex flex-col items-center gap-3 transition-all duration-500 ${
                  step === s.id ? 'opacity-100 scale-110' : 'opacity-20 translate-y-2'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${
                  step === s.id ? 'bg-white border-white text-black' : 'border-white/20 text-white'
                }`}>
                  <s.icon size={24} strokeWidth={step === s.id ? 2.5 : 1.5} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white whitespace-nowrap">{s.name}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-20 h-px bg-white/10 mx-6 translate-y-[-10px]" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                  <div>
                    <h2 className="text-white text-4xl font-black font-outfit uppercase tracking-tighter mb-4">Delivery <span className="text-white/20">Location</span></h2>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Select where your pieces will be sent</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-panel p-8 rounded-[2.5rem] border-white/20 relative cursor-pointer ring-2 ring-white group">
                       <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center text-black">
                          <CheckCircle2 size={16} />
                       </div>
                       <p className="text-white font-black uppercase tracking-widest text-xs mb-6">Home Residence</p>
                       <p className="text-white font-bold mb-2">Arjun Mehta</p>
                       <p className="text-white/40 text-sm leading-relaxed mb-6 font-medium">B-402, Highrise Apartments, Jubilee Hills, Hyderabad - 500033</p>
                       <p className="text-white/60 text-xs font-bold">+91 98765 43210</p>
                    </div>

                    <button className="glass-panel p-8 rounded-[2.5rem] border-white/5 border-dashed flex flex-col items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all gap-4">
                       <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center">
                          <Plus size={24} />
                       </div>
                       <p className="text-xs font-black uppercase tracking-[0.2em]">Add Private Address</p>
                    </button>
                  </div>

                  <button 
                    onClick={() => setStep('payment')}
                    className="btn-premium px-12 py-5 text-xs font-black uppercase tracking-[0.3em] ml-auto block group"
                  >
                    Proceed to Vault <ArrowRight size={18} className="inline ml-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                   <div>
                    <h2 className="text-white text-4xl font-black font-outfit uppercase tracking-tighter mb-4">Secure <span className="text-white/20">Vault</span></h2>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Select your preferred payment instrument</p>
                  </div>

                  <div className="space-y-4">
                     {[
                       { id: 'card', name: 'Black Credit Card', info: 'Ending in 4022', icon: CreditCard },
                       { id: 'upi', name: 'Direct UP Link', info: 'Personalised ID', icon: ShieldCheck },
                       { id: 'net', name: 'Private Net Banking', info: 'Elite Portals', icon: Lock }
                     ].map((method) => (
                       <div 
                         key={method.id}
                         className="glass-panel p-8 rounded-[2.5rem] border-white/5 hover:border-white/20 cursor-pointer flex items-center justify-between transition-all group"
                       >
                          <div className="flex items-center gap-8">
                             <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                <method.icon size={28} strokeWidth={1.5} />
                             </div>
                             <div>
                                <p className="text-white font-black uppercase tracking-widest text-sm mb-1">{method.name}</p>
                                <p className="text-white/30 text-xs font-medium">{method.info}</p>
                             </div>
                          </div>
                          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                             <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                       </div>
                     ))}
                  </div>

                  <div className="flex items-center justify-between pt-10">
                     <button onClick={() => setStep('address')} className="text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em]">
                        Back to Location
                     </button>
                     <button 
                       onClick={() => setStep('review')}
                       className="btn-premium px-12 py-5 text-xs font-black uppercase tracking-[0.3em] group"
                     >
                       Finalize Selection <ArrowRight size={18} className="inline ml-4 group-hover:translate-x-2 transition-transform" />
                     </button>
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-10"
                >
                   <div>
                    <h2 className="text-white text-4xl font-black font-outfit uppercase tracking-tighter mb-4">Final <span className="text-white/20">Review</span></h2>
                    <p className="text-white/40 text-sm font-medium uppercase tracking-widest">Verify your collection before commitment</p>
                  </div>

                  <div className="glass-panel p-10 rounded-[3rem] border-white/5 space-y-8">
                     <div className="flex items-start justify-between border-b border-white/5 pb-8">
                        <div>
                           <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Dispatching To</p>
                           <p className="text-white font-bold mb-1">Arjun Mehta</p>
                           <p className="text-white/40 text-sm font-medium">Jubilee Hills, Hyderabad</p>
                        </div>
                        <button onClick={() => setStep('address')} className="text-white/40 hover:text-white text-[10px] font-black">Edit</button>
                     </div>

                     <div className="flex items-start justify-between">
                        <div>
                           <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Payment Method</p>
                           <p className="text-white font-bold mb-1">Black Credit Card</p>
                           <p className="text-white/40 text-sm font-medium">**** 4022</p>
                        </div>
                        <button onClick={() => setStep('payment')} className="text-white/40 hover:text-white text-[10px] font-black">Edit</button>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-10">
                     <button onClick={() => setStep('payment')} className="text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em]">
                        Adjust Vault
                     </button>
                     <button 
                       onClick={handlePlaceOrder}
                       className="btn-premium px-20 py-6 text-sm font-black uppercase tracking-[0.4em] shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
                     >
                       Confirm Commitment
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-4">
             <div className="glass-panel p-10 rounded-[3rem] border-white/5 sticky top-32">
                <h3 className="text-white text-xl font-black font-outfit uppercase tracking-widest mb-10">Order <span className="text-white/20">Inventory</span></h3>
                
                <div className="space-y-6 mb-12">
                   {cart.map(item => (
                     <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 border border-white/5 flex-shrink-0">
                           <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-white font-bold text-xs truncate">{item.name}</p>
                           <p className="text-white/40 text-[10px] uppercase font-medium mt-1">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-white font-black font-outfit text-xs">₹{(item.price * item.quantity).toLocaleString()}</p>
                     </div>
                   ))}
                </div>

                <div className="space-y-4 pt-10 border-t border-white/5">
                   <div className="flex justify-between text-[10px] font-bold tracking-widest text-white/40 uppercase">
                      <span>Investment Balance</span>
                      <span className="text-white">₹{total.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-bold tracking-widest text-white/40 uppercase">
                      <span>Handling Fees</span>
                      <span className="text-white">COMPLIMENTARY</span>
                   </div>
                   <div className="pt-6 flex justify-between items-baseline">
                      <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">Final Commitment</span>
                      <span className="text-2xl font-black font-outfit text-white tracking-tighter">₹{total.toLocaleString()}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
