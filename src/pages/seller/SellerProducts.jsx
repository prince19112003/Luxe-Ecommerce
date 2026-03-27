import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Package
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function SellerProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeActions, setActiveActions] = useState(null);
  const { products, addProduct, removeProduct } = useStore();

  const sellerProducts = products.filter(p => p.sellerId === 2); // Mock: products belonging to logged in seller

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: `Luxury Masterpiece ${products.length + 1}`,
      brand: "Luxe Elite",
      category: "fashion",
      price: 45000,
      mrp: 55000,
      stock: 10,
      images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400"],
      sellerId: 2
    };
    addProduct(newProduct);
    toast.success('Asset Minted Successfully!');
  };
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
           <h1 className="text-white text-5xl font-black font-outfit uppercase tracking-tighter mb-4">Vault <span className="text-white/20">Inventory</span></h1>
           <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Managing Curated Asset Gallery</p>
        </div>
        <button 
          onClick={handleAddProduct}
          className="btn-premium px-10 py-5 flex items-center gap-3 text-xs font-black uppercase tracking-widest"
        >
           <Plus size={20} /> Mint New Entry
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-6">
         <div className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
            <input 
               type="text" 
               placeholder="Search by ID, Name or SKU..." 
               className="w-full bg-white/5 border border-white/10 rounded-none pl-16 pr-6 py-5 text-white text-sm focus:outline-none focus:border-white/30 transition-all font-medium"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
         </div>
         <div className="flex gap-4">
            <div className="relative group">
               <select className="bg-white/5 border border-white/10 text-white pl-8 pr-12 py-5 rounded-none appearance-none focus:outline-none focus:border-white/30 text-[10px] font-black uppercase tracking-widest cursor-pointer">
                  <option className="bg-luxe-dark">All Collections</option>
                  <option className="bg-luxe-dark">Fashion</option>
                  <option className="bg-luxe-dark">Timepieces</option>
               </select>
               <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
            </div>
            <button className="p-5 glass-panel rounded-none border-white/5 text-white/40 hover:text-white transition-all">
               <ArrowUpDown size={20} />
            </button>
         </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
         <AnimatePresence>
            {sellerProducts.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-panel p-8 rounded-none border-white/10 relative group hover:border-white transition-all"
              >
                 <div className="flex gap-8 mb-8">
                    <div className="w-24 h-24 rounded-none overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                       <img src={p.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-start justify-between">
                          <div>
                             <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-1">ID: LUX-{p.id}</p>
                             <h3 className="text-white text-xl font-black font-outfit uppercase tracking-tight truncate leading-tight mb-2">{p.name}</h3>
                          </div>
                          <div className="relative">
                             <button 
                                onClick={() => setActiveActions(activeActions === p.id ? null : p.id)}
                                className="p-2 text-white/20 hover:text-white transition-all"
                             >
                                <MoreVertical size={20} />
                             </button>
                             
                             <AnimatePresence>
                                {activeActions === p.id && (
                                  <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="absolute right-0 mt-2 w-48 bg-black rounded-none p-2 z-20 border-2 border-white shadow-2xl"
                                  >
                                     <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                                        <Edit size={14} /> Edit Listing
                                     </button>
                                     <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                                        <Eye size={14} /> View Live
                                     </button>
                                     <button 
                                       onClick={() => {
                                         removeProduct(p.id);
                                         toast.error('Asset Archived');
                                       }}
                                       className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all font-black uppercase tracking-tighter"
                                     >
                                        <Trash2 size={14} /> Archive Entry
                                     </button>
                                  </motion.div>
                                )}
                             </AnimatePresence>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                             p.stock > 10 ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
                          }`}>
                             {p.stock > 10 ? 'In Stock' : 'Low Reserve'}
                          </span>
                          <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{p.stock} Units</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-end justify-between pt-8 border-t border-white/5">
                    <div>
                       <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-1">List Price</p>
                       <p className="text-2xl font-black font-outfit text-white tracking-tighter">₹{p.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Mkt Value</p>
                       <p className="text-sm font-bold text-white/40">₹{p.mrp.toLocaleString()}</p>
                    </div>
                 </div>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Empty State Mock */}
      {sellerProducts.length === 0 && (
         <div className="py-40 text-center glass-panel rounded-[4rem] border-dashed border-white/10 flex flex-col items-center">
            <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center text-white/10 mb-10">
               <Package size={48} />
            </div>
            <h2 className="text-white text-3xl font-black font-outfit uppercase tracking-tighter mb-4">No Asset Found</h2>
            <p className="text-white/40 font-medium max-w-sm mb-12">Begin your empire by listing your first world-class masterpiece.</p>
            <button className="btn-premium px-12 py-5 text-xs font-black uppercase tracking-[0.3em]">
               Initiate Listing
            </button>
         </div>
      )}
    </div>
  );
}
