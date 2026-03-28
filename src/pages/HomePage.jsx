import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Star, 
  ShieldCheck, 
  Crown,
  Sparkles
} from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import CountdownTimer from '../components/ui/CountdownTimer';
import { products } from '../data/products';

const HERO_SLIDES = [
  {
    title: "Timeless Elegance",
    subtitle: "Spring / Summer 2024 Collection",
    desc: "Experience the pinnacle of luxury with our curated selection of high-end fashion and accessories.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070",
    cta: "Explore Collection"
  },
  {
    title: "Elite Soundscape",
    subtitle: "Precision Audio Engineering",
    desc: "Discover the world's most sophisticated audio equipment for the true audiophile.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=2065",
    cta: "Shop Audio"
  },
  {
    title: "Masterful Interiors",
    subtitle: "Modern Minimalist Design",
    desc: "Transform your living space with artisan furniture and bespoke decor pieces.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2069",
    cta: "View Designs"
  }
];

const CATEGORIES = [
  { name: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2071', count: '1.2k+ Products' },
  { name: 'Tech', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070', count: '850+ Products' },
  { name: 'Home', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2070', count: '420+ Products' },
  { name: 'Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=2070', count: '640+ Products' }
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 10);
  const flashDeals = products.slice(10, 18);

  return (
    <div className="bg-luxe-black overflow-hidden pt-52">
      {/* Hero Section */}
      <section className="relative h-[90vh] mx-6 mt-6 rounded-[3rem] overflow-hidden group">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000 }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
          loop
          className="h-full w-full"
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide key={i} className="relative">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img src={slide.image} className="absolute inset-0 w-full h-full object-cover scale-105 animate-[zoom-out_20s_infinite_linear]" alt="" />
              
              <div className="relative z-20 h-full flex items-center px-12 md:px-24">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full text-white/60 text-xs font-black uppercase tracking-[0.3em] mb-6">
                      <Crown size={14} className="text-white" /> Selection 2024
                    </span>
                    <h2 className="text-white/60 font-medium text-lg md:text-xl uppercase tracking-[0.4em] mb-4">
                      {slide.subtitle}
                    </h2>
                    <h1 className="text-white text-6xl md:text-8xl font-black font-outfit uppercase tracking-tighter mb-8 leading-[0.9]">
                      {slide.title.split(' ')[0]} <br/> 
                      <span className="text-transparent stroke-text">{slide.title.split(' ')[1]}</span>
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl mb-12 max-w-xl font-medium leading-relaxed">
                      {slide.desc}
                    </p>
                    <div className="flex items-center gap-6">
                      <Link to="/category/all">
                        <button className="btn-premium px-10 py-5 text-sm uppercase tracking-widest font-black flex items-center gap-3">
                          {slide.cta} <ArrowRight size={18} />
                        </button>
                      </Link>
                      <button className="group/btn flex items-center gap-4 text-white/60 hover:text-white transition-all font-bold">
                        Learn More <span className="w-12 h-px bg-white/20 group-hover/btn:w-16 transition-all" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="absolute bottom-12 right-24 z-30 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="hero-prev p-4 glass-panel rounded-2xl text-white hover:bg-white/10 transition-all">
            <ChevronRight size={24} className="rotate-180" />
          </button>
          <button className="hero-next p-4 glass-panel rounded-2xl text-white hover:bg-white/10 transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-24 max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-white text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter mb-4">Exclusive <span className="text-white/20">Departments</span></h2>
            <p className="text-white/40 text-lg font-medium">Curation of finest products across premium categories.</p>
          </div>
          <Link to="/category/all" className="group flex items-center gap-3 text-white/60 hover:text-white transition-all font-black uppercase tracking-widest text-xs">
            View All Categories <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat, i) => (
            <Link key={i} to={`/category/${cat.name.toLowerCase()}`}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden group cursor-pointer border border-white/5"
              >
                <img src={cat.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
                  <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em] mb-2">{cat.count}</p>
                  <h3 className="text-white text-3xl font-black font-outfit uppercase tracking-tight">{cat.name}</h3>
                  <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <span className="w-8 h-px bg-white/40" />
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Shop Now</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] -mr-64 -mt-32" />
        <div className="max-w-[1440px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 p-12 glass-panel rounded-[3rem]">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-black shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <Zap size={36} fill="black" />
              </div>
              <div>
                <h3 className="text-white text-4xl font-black font-outfit uppercase tracking-tighter">Midnight <span className="text-white/40">Drop</span></h3>
                <p className="text-white/40 font-bold tracking-widest uppercase text-xs mt-1">Limited luxury quantities available</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hidden lg:block">Ending In</span>
              <CountdownTimer />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Membership Section */}
      <section className="py-24 mx-6">
        <div className="max-w-[1440px] mx-auto h-[600px] glass-panel rounded-[4rem] flex flex-col items-center justify-center text-center p-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=2070')] bg-cover opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
          
          <div className="relative z-10 flex flex-col items-center">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="mb-10 text-white/20"
             >
                <Sparkles size={80} strokeWidth={1} />
             </motion.div>
             <h2 className="text-white text-5xl md:text-8xl font-black font-outfit uppercase tracking-tighter mb-8 max-w-4xl leading-[0.9]">
               Unlock The <br/> <span className="text-transparent stroke-text">Luxe Circle</span>
             </h2>
             <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mb-12">
               Join our exclusive elite membership for early access to drops, private styling, and worldwide white-glove delivery.
             </p>
             <Link to="/login">
               <button className="btn-premium px-12 py-6 text-sm uppercase tracking-[0.3em] font-black group">
                  Become An Insider 
                  <span className="inline-block group-hover:translate-x-2 transition-transform ml-4">→</span>
               </button>
             </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-white text-4xl md:text-6xl font-black font-outfit uppercase tracking-tighter">New <span className="text-white/20">Arrivals</span></h2>
          <Link to="/category/all" className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-sm font-black uppercase tracking-widest">
            Explore All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Branding Values */}
      <section className="py-24 border-t border-white/5 mx-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Authenticity", desc: "Every product is verified by our network of luxury curators for guaranteed authenticity." },
            { icon: Crown, title: "Exclusivity", desc: "Access limited run drops and collaborative pieces you won't find anywhere else." },
            { icon: Sparkles, title: "Curation", desc: "We don't stock everything. We stock the best. Experience expert-curated excellence." }
          ].map((item, i) => (
             <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <item.icon size={32} strokeWidth={1} />
                </div>
                <h4 className="text-white text-xl font-black font-outfit uppercase tracking-wider mb-4">{item.title}</h4>
                <p className="text-white/30 text-sm font-medium leading-relaxed max-w-[280px]">{item.desc}</p>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
}
