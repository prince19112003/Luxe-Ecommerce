import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Store, 
  ChevronRight,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(searchParams.get('type') === 'seller' ? 'seller' : 'buyer');
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', storeName: '' });
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password, role);
        toast.success(`Welcome back to Luxe!`, {
           icon: '🔓',
           style: { background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }
        });
        navigate(role === 'seller' ? '/seller' : '/');
      } else {
        await register({ ...formData, role });
        toast.success(`Account created successfully!`, {
          icon: '✨',
          style: { background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }
        });
        navigate(role === 'seller' ? '/seller' : '/');
      }
    } catch (error) {
      toast.error('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-luxe-black min-h-screen flex items-start lg:items-center justify-center pt-28 pb-10 px-6 relative">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Branding */}
        <div className="hidden lg:block space-y-8">
           <Link to="/" className="flex items-center gap-3 group text-decoration-none">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">L</div>
              <span className="text-4xl font-black font-outfit text-white tracking-tighter">LUXE</span>
           </Link>
           
           <div className="space-y-6">
              <h2 className="text-white text-5xl font-black font-outfit uppercase tracking-tighter leading-[0.9]">
                Step Into The <br/> <span className="text-transparent stroke-text">Elite Circle</span>
              </h2>
              <p className="text-white/40 text-lg font-medium max-w-md leading-relaxed">
                Join our exclusive global network of luxury connoisseurs and master creators. Experience curated excellence redefined.
              </p>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-8 rounded-[2.5rem] border-white/5">
                 <ShieldCheck size={32} className="text-white/40 mb-4" />
                 <p className="text-white font-black uppercase tracking-widest text-xs mb-1">Authentic Vault</p>
                 <p className="text-white/20 text-[10px] font-medium uppercase tracking-widest leading-relaxed">Verified multi-factor security layering.</p>
              </div>
              <div className="glass-panel p-8 rounded-[2.5rem] border-white/5">
                 <Sparkles size={32} className="text-white/40 mb-4" />
                 <p className="text-white font-black uppercase tracking-widest text-xs mb-1">Elite Access</p>
                 <p className="text-white/20 text-[10px] font-medium uppercase tracking-widest leading-relaxed">First-look privileges on world-class drops.</p>
              </div>
           </div>
        </div>

        {/* Right: Auth Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 md:p-12 rounded-[3rem] border-white/10 relative overflow-hidden group shadow-2xl"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
           
           <div className="relative z-10">
              <div className="flex gap-3 mb-8 p-1 glass-panel rounded-2xl border-white/5">
                 <button 
                   onClick={() => setIsLogin(true)}
                   className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                     isLogin ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                   }`}
                 >
                   Sign In
                 </button>
                 <button 
                   onClick={() => setIsLogin(false)}
                   className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                     !isLogin ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                   }`}
                 >
                   Join Luxe
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                 {!isLogin && (
                   <div className="space-y-2">
                      <label className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] ml-2">Display Identity</label>
                       <div className="relative">
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input 
                          type="text" 
                          required
                          placeholder={role === 'seller' ? "Business Owner Name" : "Lord/Lady Name"} 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 text-sm font-medium"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                   </div>
                 )}

                 {!isLogin && role === 'seller' && (
                   <div className="space-y-2">
                      <label className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] ml-2">Store Identity</label>
                      <div className="relative">
                        <Store className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input 
                          type="text" 
                          required
                          placeholder="TechZone Official" 
                          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 text-sm font-medium"
                          value={formData.storeName}
                          onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                        />
                      </div>
                   </div>
                 )}

                 <div className="space-y-2">
                    <label className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] ml-2">Secure Link</label>
                    <div className="relative">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="curator@luxe.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 text-sm font-medium"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] ml-2">Vault Access Key</label>
                    <div className="relative">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input 
                        type={showPass ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 text-sm font-medium"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                 </div>

                 <div className="pt-4 space-y-6">
                    <div className="flex gap-4 p-1.5 glass-panel rounded-2xl border-white/5">
                       <button 
                         type="button"
                         onClick={() => setRole('buyer')}
                         className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                           role === 'buyer' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white/40'
                         }`}
                       >
                         <User size={14} /> Connoisseur
                       </button>
                       <button 
                         type="button"
                         onClick={() => setRole('seller')}
                         className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                           role === 'seller' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white/40'
                         }`}
                       >
                         <Store size={14} /> Enterprise
                       </button>
                    </div>

                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-premium py-5 text-xs font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 group disabled:opacity-50"
                    >
                       {isLoading ? (
                         <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                       ) : (
                         <>
                           {isLogin ? 'Access Vault' : 'Initialize Account'}
                           <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                         </>
                       )}
                    </button>
                 </div>
              </form>
              
              <div className="mt-8 text-center">
                 <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                    By entering, you agree to our <span className="text-white/40 hover:text-white cursor-pointer underline">Sovereign Terms</span>
                 </p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}
