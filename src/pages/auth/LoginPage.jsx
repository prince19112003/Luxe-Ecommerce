import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ShoppingBag, Store, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../store/useAuth';
import toast from 'react-hot-toast';

const buyerBenefits = ['10M+ Products', 'Free & Fast Delivery', 'Easy Returns', 'Exclusive Deals'];
const sellerBenefits = ['Zero Commission Setup', 'Reach Crores of Buyers', 'Payment in 7 Days', 'Free Seller Support'];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('type') === 'seller' ? 'seller' : 'buyer');
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', gstin: '', storeName: '' });
  const navigate = useNavigate();
  const { login, register, isLoading, authError, clearError } = useAuth();

  const handleChange = (e) => {
    clearError();
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password, tab);
      toast.success(`Welcome back! 🎉`, { style: { borderLeft: '4px solid #E53935' } });
      navigate(tab === 'seller' ? '/seller' : '/');
    } catch {}
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all required fields');
      return;
    }
    try {
      await register({ ...form, role: tab });
      toast.success('Account created! Welcome to Luxe 🎉');
      navigate(tab === 'seller' ? '/seller' : '/');
    } catch {}
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col w-1/2 luxe-gradient p-12 text-white relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/10 rounded-full" />
        <div className="relative z-10 flex-1 flex flex-col justify-between">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-16">
              <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-luxe-red font-black text-xl font-outfit">L</span>
              </div>
              <span className="font-black text-3xl font-outfit">Luxe</span>
            </Link>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h1 className="text-4xl font-black font-outfit leading-tight mb-4">
                {tab === 'buyer' ? 'Shop Premium,\nShop Smart.' : 'Sell More,\nEarn More.'}
              </h1>
              <p className="text-white/75 text-lg mb-8">
                {tab === 'buyer' ? 'Join 5 crore+ happy customers on India\'s fastest growing e-commerce platform.' : 'Join 2 lakh+ sellers on India\'s fastest growing marketplace.'}
              </p>
              <div className="space-y-3">
                {(tab === 'buyer' ? buyerBenefits : sellerBenefits).map(b => (
                  <div key={b} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-yellow-300 flex-shrink-0" />
                    <span className="text-white/90 font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur border border-white/20">
            <p className="text-yellow-300 text-xs font-bold uppercase tracking-wider mb-1">💡 Quick Login</p>
            <p className="text-white/80 text-sm"><strong>Buyer:</strong> arjun@luxe.com / 123456</p>
            <p className="text-white/80 text-sm"><strong>Seller:</strong> seller@luxe.com / 123456</p>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Tab Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            {[
              { val: 'buyer', icon: <ShoppingBag size={16} />, label: 'Buyer' },
              { val: 'seller', icon: <Store size={16} />, label: 'Seller' },
            ].map(t => (
              <button key={t.val} onClick={() => { setTab(t.val); clearError(); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === t.val ? 'bg-white text-luxe-red shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {t.icon} {t.label} Account
              </button>
            ))}
          </div>

          <motion.div key={`${tab}-${mode}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-black font-outfit text-gray-900 mb-1">
              {mode === 'login' ? `${tab === 'buyer' ? '👋' : '🏪'} Welcome Back!` : `Create ${tab === 'buyer' ? 'Buyer' : 'Seller'} Account`}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {mode === 'login' ? 'Sign in to your account to continue' : 'Fill in the details below to get started'}
            </p>

            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">
                {authError}
              </div>
            )}

            <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{tab === 'seller' ? 'Business Owner Name' : 'Full Name'} *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Arjun Mehta" className="luxe-input" required />
                  </div>
                  {tab === 'seller' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Store Name *</label>
                        <input name="storeName" value={form.storeName} onChange={handleChange} placeholder="TechZone Official" className="luxe-input" required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">GSTIN Number</label>
                        <input name="gstin" value={form.gstin} onChange={handleChange} placeholder="27AAPFU0939F1ZV" className="luxe-input" />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="98765 43210" className="luxe-input" />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder={tab === 'seller' ? 'seller@luxe.com' : 'arjun@luxe.com'}
                  className="luxe-input" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange}
                    placeholder="••••••••" className="luxe-input pr-10" required />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {mode === 'register' && (
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to Luxe's <a href="#" className="text-luxe-red font-medium">Terms of Service</a> and <a href="#" className="text-luxe-red font-medium">Privacy Policy</a>
                </p>
              )}
              <button type="submit" disabled={isLoading}
                className="btn-luxe w-full py-3 rounded-2xl text-base font-bold flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Please wait...
                  </>
                ) : (
                  <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); clearError(); }}
                  className="text-luxe-red font-bold hover:underline">
                  {mode === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
