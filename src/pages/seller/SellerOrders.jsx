import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  ExternalLink,
  MoreVertical
} from 'lucide-react';
import { sellerMockData } from '../../data/sellerData';

export default function SellerOrders() {
  const [activeTab, setActiveTab] = useState('all');
  const { recentOrders } = sellerMockData;

  const TABS = [
    { id: 'all', name: 'All Bookings', count: 12 },
    { id: 'pending', name: 'Awaiting', count: 4 },
    { id: 'shipped', name: 'In Transit', count: 6 },
    { id: 'delivered', name: 'Completed', count: 2 },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
           <h1 className="text-white text-5xl font-black font-outfit uppercase tracking-tighter mb-4">Command <span className="text-white/20">Logistics</span></h1>
           <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Tracking Elite Dispatches</p>
        </div>
        <div className="flex glass-panel p-1.5 rounded-[2rem] border-white/5">
           {TABS.map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                 activeTab === tab.id ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'
               }`}
             >
               {tab.name} <span className={`ml-2 ${activeTab === tab.id ? 'text-black/40' : 'text-white/10'}`}>({tab.count})</span>
             </button>
           ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative group">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
           <input 
              type="text" 
              placeholder="Filter by Order ID, Client or Country..." 
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] pl-16 pr-6 py-5 text-white text-sm focus:outline-none focus:border-white/30 transition-all font-medium"
           />
        </div>
        <button className="px-8 py-5 glass-panel rounded-[2rem] border-white/5 text-white/40 hover:text-white transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
           <Filter size={18} /> Advanced Filter
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
         <AnimatePresence>
            {recentOrders.map((order, i) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-10 rounded-[3rem] border-white/5 relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
                 
                 <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 relative z-10">
                    <div className="flex items-center gap-8">
                       <div className="w-20 h-20 glass-card rounded-[1.5rem] flex items-center justify-center text-white/20 group-hover:text-white transition-colors">
                          <Package size={32} strokeWidth={1} />
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                             <span className="text-white font-black font-outfit text-xl uppercase tracking-wider">{order.id}</span>
                             <span className="px-2 py-0.5 glass-panel rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest">Vaulted Shipment</span>
                          </div>
                          <p className="text-white font-bold text-sm mb-1">{order.buyer}</p>
                          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Placed on {order.date}</p>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-12">
                       <div>
                          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Inventory Status</p>
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                             <span className="text-xs font-black uppercase tracking-widest text-white">Processed</span>
                          </div>
                       </div>
                       
                       <div className="text-right">
                          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Investment</p>
                          <p className="text-2xl font-black font-outfit text-white tracking-tighter">₹{order.amount.toLocaleString()}</p>
                       </div>

                       <div className="flex items-center gap-3">
                          <button className="p-4 glass-card rounded-2xl text-white/40 hover:text-white transition-all">
                             <Truck size={20} />
                          </button>
                          <button className="p-4 glass-card rounded-2xl text-white/40 hover:text-white transition-all">
                             <ExternalLink size={20} />
                          </button>
                          <button className="p-4 glass-card rounded-2xl text-white/40 hover:text-white transition-all">
                             <MoreVertical size={20} />
                          </button>
                       </div>
                    </div>
                 </div>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Pagination Mock */}
      <div className="flex items-center justify-center gap-3 pt-12">
         {[1, 2, 3].map(p => (
            <button key={p} className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${p === 1 ? 'bg-white text-black shadow-lg' : 'glass-panel text-white/20 hover:text-white'}`}>
               {p}
            </button>
         ))}
      </div>
    </div>
  );
}
