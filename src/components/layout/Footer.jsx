import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones,
  ArrowRight
} from 'lucide-react';
import { 
  FaInstagram, 
  FaXTwitter, 
  FaFacebookF, 
  FaYoutube 
} from 'react-icons/fa6';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-luxe-black border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
      {/* Background Decorative Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-white/5 blur-[120px] rounded-full -mb-48" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16 border-b border-white/5">
          {[
            { icon: ShieldCheck, title: 'Secure Payment', desc: '100% Secure SSL encrypted checkout' },
            { icon: Truck, title: 'Express Delivery', desc: 'World-class logistics for fast shipping' },
            { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle free return policy' },
            { icon: Headphones, title: '24/7 Support', desc: 'Dedicated luxury assistance team' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-5 p-6 glass-card rounded-3xl">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black shadow-lg">
                <item.icon size={24} />
              </div>
              <div>
                <p className="font-outfit font-black text-white text-sm uppercase tracking-wider">{item.title}</p>
                <p className="text-white/40 text-xs font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 py-20">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-black text-xl">L</div>
              <span className="text-3xl font-black font-outfit text-white tracking-tighter">LUXE</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-10">
              Defining the future of luxury e-commerce. Experience curated premium brands and world-class service redefined for the modern connoisseur.
            </p>
            <div className="flex items-center gap-4">
              {[FaInstagram, FaXTwitter, FaFacebookF, FaYoutube].map((Icon, i) => (
                <button key={i} className="p-3 glass-card rounded-none text-white/40 hover:text-white hover:border-white transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-outfit font-black text-white text-xs uppercase tracking-[0.2em] mb-8">Categories</h4>
            <ul className="space-y-4">
              {['Fashion', 'Electronics', 'Home Decor', 'Beauty', 'Jewelry'].map(link => (
                <li key={link}>
                  <Link to={`/category/${link.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-white text-sm font-medium transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-outfit font-black text-white text-xs uppercase tracking-[0.2em] mb-8">Customer Care</h4>
            <ul className="space-y-4">
              {['Track Order', 'Shipping Info', 'Returns', 'Privacy Policy', 'Terms'].map(link => (
                <li key={link}>
                  <Link to="#" className="text-white/40 hover:text-white text-sm font-medium transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden group">
            <h4 className="font-outfit font-black text-white text-xs uppercase tracking-[0.2em] mb-4 relative z-10">Luxe Insider</h4>
            <p className="text-white/40 text-xs mb-6 relative z-10 leading-relaxed font-medium">Subscribe for exclusive invitations to new arrivals and private sales.</p>
            <div className="relative z-10">
              <input 
                type="text" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 text-white pl-4 pr-12 py-3 rounded-2xl focus:outline-none focus:border-white/30 text-xs"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                <ArrowRight size={16} />
              </button>
            </div>
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            © {year} LUXE GLOBAL ENTERPRISE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-20 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-20 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-20 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
          </div>
        </div>
      </div>
    </footer>
  );
}
