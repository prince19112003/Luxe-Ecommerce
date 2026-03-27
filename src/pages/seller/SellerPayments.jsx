import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Vault, 
  ShieldCheck, 
  TrendingUp,
  Download,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { sellerMockData } from '../../data/sellerData';

export default function SellerPayments() {
  const { payments } = sellerMockData;

  const SETTLEMENT_CARDS = [
    { label: 'Available Balance', value: '₹1,24,500', icon: Vault, desc: 'Ready for withdrawal' },
    { label: 'Pending Settlement', value: '₹20,700', icon: Clock, desc: 'In verification phase' },
    { label: 'Last Disbursement', value: '₹45,000', icon: CreditCard, desc: 'Processed on 20 Mar' }
  ];

  const Clock = ({ size, className }) => <ShieldCheck size={size} className={className} />; // Fallback or replacement for UI feel

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
           <h1 className="text-white text-5xl font-black font-outfit uppercase tracking-tighter mb-4">Capital <span className="text-white/20">Vault</span></h1>
           <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Managing Elite Revenue Stream</p>
        </div>
        <button className="btn-premium px-10 py-5 flex items-center gap-3 text-xs font-black uppercase tracking-widest group">
           Withdraw To Vault <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {SETTLEMENT_CARDS.map((card, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             className="glass-panel p-10 rounded-[3rem] border-white/5 relative overflow-hidden group"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                 <div className="w-14 h-14 glass-panel border-white/10 rounded-2xl flex items-center justify-center text-white/40 mb-8 group-hover:scale-110 transition-transform">
                    <card.icon size={28} strokeWidth={1.5} />
                 </div>
                 <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{card.label}</p>
                 <h3 className="text-white text-4xl font-black font-outfit tracking-tighter mb-4">{card.value}</h3>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{card.desc}</p>
              </div>
           </motion.div>
         ))}
      </div>

      {/* Transaction Ledger */}
      <div className="glass-panel rounded-[4rem] border-white/5 overflow-hidden">
         <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h3 className="text-white text-2xl font-black font-outfit uppercase tracking-widest">Revenue <span className="text-white/20">Ledger</span></h3>
            <div className="flex items-center gap-4">
               <button className="px-6 py-3 glass-panel rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-2">
                  <Calendar size={14} /> Date Range
               </button>
               <button className="px-6 py-3 glass-panel rounded-xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all flex items-center gap-2">
                  <Download size={14} /> Download PDF
               </button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white/5 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                     <th className="px-10 py-6">Transaction Ref</th>
                     <th className="px-10 py-6">Method</th>
                     <th className="px-10 py-6">Period</th>
                     <th className="px-10 py-6">Status</th>
                     <th className="px-10 py-6 text-right">Credit</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {payments.map((p, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition-colors">
                       <td className="px-10 py-8 font-outfit font-black text-white uppercase tracking-wider">{p.id}</td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 glass-card rounded-lg flex items-center justify-center text-white/40">
                                <CreditCard size={16} />
                             </div>
                             <span className="text-white font-bold text-sm">{p.method}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-white/40 text-xs font-medium">{p.date}</td>
                       <td className="px-10 py-8">
                          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                             p.status === 'Completed' ? 'bg-green-400/10 text-green-400' : 'bg-white/5 text-white/20'
                          }`}>
                             {p.status}
                          </span>
                       </td>
                       <td className="px-10 py-8 text-right font-black font-outfit text-white text-xl tracking-tighter">
                          ₹{p.amount.toLocaleString()}
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Analytical Trends Mock */}
      <div className="glass-panel p-12 rounded-[4rem] border-white/5">
         <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-white/40 shadow-xl">
               <TrendingUp size={32} strokeWidth={1} />
            </div>
            <div>
               <h3 className="text-white text-4xl font-black font-outfit uppercase tracking-tighter">Wealth <span className="text-white/20">Velocity</span></h3>
               <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Growth projection for next 30 sessions</p>
            </div>
         </div>
         
         <div className="h-64 flex items-end gap-2 px-8">
            {[20, 35, 25, 45, 60, 55, 75, 65, 90, 85, 95].map((val, i) => (
               <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="flex-1 glass-panel border-white/10 rounded-t-xl group relative cursor-pointer"
               >
                  <div className="absolute inset-x-0 bottom-full mb-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="px-2 py-1 bg-white text-black text-[10px] font-black rounded-md shadow-lg">+{val}%</span>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
