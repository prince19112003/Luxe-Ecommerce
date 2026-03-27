import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  LogOut, 
  Bell, 
  Settings,
  ChevronRight,
  Package,
  Clock,
  CheckCircle2,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useStore } from '../../store/useStore';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, logout, role } = useAuth();
  const { wishlist, toggleWishlist } = useStore();

  const MENU_ITEMS = [
    { id: 'orders', name: 'Orders', icon: ShoppingBag, desc: 'Track your luxury pieces' },
    { id: 'wishlist', name: 'Wishlist', icon: Heart, desc: 'Your curated selection' },
    { id: 'addresses', name: 'Addresses', icon: MapPin, desc: 'Secure delivery locations' },
    { id: 'payments', name: 'Payments', icon: CreditCard, desc: 'Vaulted instruments' },
    { id: 'settings', name: 'Settings', icon: Settings, desc: 'Account preferences' },
  ];

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-luxe-black min-h-screen pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
             <div className="glass-panel p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10 flex flex-col items-center text-center">
                   <div className="w-24 h-24 rounded-[2rem] bg-white text-black flex items-center justify-center text-4xl font-black mb-6 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                      {user?.name?.[0] || 'U'}
                   </div>
                   <h2 className="text-white text-3xl font-black font-outfit uppercase tracking-tighter mb-2">{user?.name}</h2>
                   <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em] mb-8">Elite Member since 2024</p>
                   <button className="w-full py-4 glass-card rounded-2xl text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] border-white/5 group-hover:border-white/20">
                      Edit Profile
                   </button>
                </div>
             </div>

             <nav className="glass-panel p-4 rounded-[3rem] border-white/5 space-y-2">
                {MENU_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-5 rounded-[2rem] transition-all group ${
                      activeTab === item.id ? 'bg-white text-black' : 'text-white/40 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                         activeTab === item.id ? 'bg-black/10' : 'glass-panel group-hover:bg-white/10'
                       }`}>
                          <item.icon size={20} />
                       </div>
                       <div className="text-left">
                          <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{item.name}</p>
                          <p className={`text-[10px] font-medium leading-none ${activeTab === item.id ? 'text-black/40' : 'text-white/20'}`}>{item.desc}</p>
                       </div>
                    </div>
                    <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0'}`} />
                  </button>
                ))}
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-5 p-5 rounded-[2rem] text-red-400 hover:bg-red-400/10 transition-all mt-4"
                >
                   <div className="w-12 h-12 glass-panel border-red-400/20 rounded-2xl flex items-center justify-center">
                      <LogOut size={20} />
                   </div>
                   <div className="text-left">
                      <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">Logout</p>
                      <p className="text-[10px] font-medium leading-none text-red-400/40">Securely exit vault</p>
                   </div>
                </button>
             </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8">
             <AnimatePresence mode="wait">
                {activeTab === 'orders' && (
                  <motion.div
                    key="orders"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-12"
                  >
                    <div>
                       <h2 className="text-white text-5xl font-black font-outfit uppercase tracking-tighter mb-4">Your <span className="text-white/20">Orders</span></h2>
                       <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Tracking curated pieces world-wide</p>
                    </div>

                    {useStore.getState().orders.map((order, i) => (
                      <div key={order.id} className="glass-panel p-10 rounded-none border-white/10 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            <div className="flex items-center gap-8">
                               <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-none flex items-center justify-center text-white/20">
                                  <Package size={32} strokeWidth={1} />
                               </div>
                               <div>
                                  <p className="text-white font-black font-outfit text-xl mb-1 uppercase tracking-tight">{order.id}</p>
                                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{order.date} · {order.items} Items</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-12">
                               <div className="text-right">
                                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 flex items-center justify-end gap-2 ${order.status?.toLowerCase().includes('delivered') ? 'text-green-400' : 'text-white'}`}>
                                     {order.status?.toLowerCase().includes('delivered') ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                                     {order.status}
                                  </p>
                                  <p className="text-white font-black text-xl">₹{order.total}</p>
                               </div>
                               <button className="p-4 bg-white/5 border border-white/10 rounded-none text-white/60 hover:text-white transition-all hover:border-white">
                                  <ChevronRight size={20} />
                                </button>
                            </div>
                         </div>
                      </div>
                    ))}

                    {useStore.getState().orders.length === 0 && (
                      <div className="py-20 text-center glass-panel rounded-none border-dashed border-white/10">
                        <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">No Orders Found</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'wishlist' && (
                  <motion.div
                    key="wishlist"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-12"
                  >
                     <div className="flex items-center justify-between">
                        <div>
                           <h2 className="text-white text-5xl font-black font-outfit uppercase tracking-tighter mb-4">Private <span className="text-white/20">Wishlist</span></h2>
                           <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Your carefully curated preference</p>
                        </div>
                        <span className="text-white/10 text-6xl font-black font-outfit">{wishlistProducts.length}</span>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {wishlistProducts.map((product) => (
                           <div key={product.id} className="glass-panel p-6 rounded-[2.5rem] border-white/5 relative group">
                              <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                                 <img src={product.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                                 <button 
                                   onClick={() => toggleWishlist(product.id)}
                                   className="absolute top-4 right-4 p-3 glass-card rounded-xl text-white hover:text-red-400 transition-all"
                                 >
                                    <Trash2 size={18} />
                                 </button>
                              </div>
                              <p className="text-white font-black text-lg mb-1 truncate uppercase tracking-tight">{product.name}</p>
                              <div className="flex items-center justify-between">
                                 <p className="text-white/40 font-black text-xl tracking-tighter">₹{product.price.toLocaleString()}</p>
                                 <Link to={`/product/${product.id}`} className="p-3 glass-card rounded-xl text-white/40 hover:text-white transition-all">
                                    <ExternalLink size={18} />
                                 </Link>
                              </div>
                           </div>
                        ))}
                     </div>

                     {wishlistProducts.length === 0 && (
                        <div className="py-24 text-center glass-panel rounded-[4rem] border-dashed border-white/10">
                           <p className="text-white/20 text-xs font-black uppercase tracking-[0.4em]">Empty Gallery</p>
                        </div>
                     )}
                  </motion.div>
                )}
             </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
