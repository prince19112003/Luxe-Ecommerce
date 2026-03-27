import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Bell, 
  Plus,
  Zap,
  Star,
  ChevronRight
} from 'lucide-react';
import { sellerMockData } from '../../data/sellerData';

export default function SellerDashboard() {
  const { stats, recentOrders, activity } = sellerMockData;

  const STAT_CARDS = [
    { label: 'Net Revenue', value: '₹1,45,200', growth: '+12.5%', icon: DollarSign, color: 'text-white' },
    { label: 'Elite Orders', value: '42', growth: '+2.4%', icon: ShoppingBag, color: 'text-white' },
    { label: 'Active Pieces', value: '18', growth: 'Stable', icon: Package, color: 'text-white' },
    { label: 'Elite Rating', value: '4.9', growth: '+0.1%', icon: Star, color: 'text-white' },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-white text-5xl font-black font-outfit uppercase tracking-tighter mb-4">Empire <span className="text-white/20">Control</span></h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Managing Luxe Excellence</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="p-4 glass-card rounded-2xl text-white/40 hover:text-white transition-all relative">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full border-2 border-black" />
           </button>
           <button className="btn-premium px-8 py-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
              <Plus size={18} /> Launch New Piece
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STAT_CARDS.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-white/10 transition-colors" />
             <div className="relative z-10">
                <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-white/40 mb-6">
                   <stat.icon size={24} strokeWidth={1.5} />
                </div>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <h3 className="text-white text-3xl font-black font-outfit tracking-tighter mb-4">{stat.value}</h3>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                   stat.growth.startsWith('+') ? 'bg-green-400/10 text-green-400' : 'bg-white/5 text-white/40'
                }`}>
                   {stat.growth.startsWith('+') ? <ArrowUpRight size={12} /> : null}
                   {stat.growth}
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Recent Performance Chart (Mock) */}
        <div className="lg:col-span-8 glass-panel p-12 rounded-[4rem] border-white/5 relative overflow-hidden">
           <div className="flex items-center justify-between mb-12">
              <h3 className="text-white text-2xl font-black font-outfit uppercase tracking-widest">Growth <span className="text-white/20">Dynamics</span></h3>
              <div className="flex gap-4">
                 {['7D', '1M', '1Y'].map(t => (
                    <button key={t} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${t === '7D' ? 'bg-white text-black' : 'text-white/20 hover:text-white'}`}>
                       {t}
                    </button>
                 ))}
              </div>
           </div>
           
           <div className="h-80 flex items-end justify-between gap-4">
              {[60, 45, 85, 30, 95, 55, 75].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6 group">
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${val}%` }}
                     transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                     className="w-full max-w-[40px] glass-panel border-white/10 group-hover:bg-white group-hover:border-white transition-all duration-500 rounded-2xl relative overflow-hidden"
                   >
                      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                   </motion.div>
                   <span className="text-white/20 text-[10px] font-black uppercase tracking-widest">Day {i+1}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 glass-panel p-10 rounded-[3rem] border-white/5">
           <h3 className="text-white text-xl font-black font-outfit uppercase tracking-widest mb-10">Elite <span className="text-white/20">Feed</span></h3>
           <div className="space-y-8">
              {activity.map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                   <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-white/40 group-hover:text-white transition-colors flex-shrink-0">
                      <Zap size={20} strokeWidth={1} />
                   </div>
                   <div>
                      <p className="text-white/80 text-sm font-medium leading-relaxed">{item.text}</p>
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mt-2">{item.time}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-12 py-4 glass-card rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white hover:border-white/20 transition-all">
              View History Log
           </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="glass-panel rounded-[4rem] border-white/5 overflow-hidden">
         <div className="p-10 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-white text-2xl font-black font-outfit uppercase tracking-widest">Recent <span className="text-white/20">Transactions</span></h3>
            <button className="text-white/40 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Export Ledger</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                     <th className="px-10 py-6">Reference</th>
                     <th className="px-10 py-6">Connoisseur</th>
                     <th className="px-10 py-6">Placement</th>
                     <th className="px-10 py-6 text-right">Investment</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {recentOrders.map((order, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                       <td className="px-10 py-8 font-outfit font-black text-white uppercase tracking-wider">{order.id}</td>
                       <td className="px-10 py-8">
                          <p className="text-white font-bold leading-none mb-1">{order.buyer}</p>
                          <p className="text-white/20 text-[10px] font-black uppercase tracking-widest">Elite Account</p>
                       </td>
                       <td className="px-10 py-8">
                          <span className="px-3 py-1.5 glass-panel rounded-xl text-white text-[10px] font-black uppercase tracking-widest">
                             {order.date}
                          </span>
                       </td>
                       <td className="px-10 py-8 text-right font-black font-outfit text-white text-xl tracking-tighter">
                          ₹{order.amount.toLocaleString()}
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
