import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-96 h-96 bg-white rounded-full blur-[120px]"
      />

      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 20, letterSpacing: "1.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onComplete}
          className="text-white text-6xl md:text-8xl font-black font-outfit uppercase tracking-[0.5em] pl-[0.5em]"
        >
          LUXE
        </motion.h1>
        
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-white to-transparent mt-4"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-white text-center text-xs uppercase tracking-[0.3em] mt-6"
        >
          Elevating Your Lifestyle
        </motion.p>
      </div>

      {/* Decorative Particle Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: "-=100",
              opacity: [0, 0.5, 0] 
            }}
            transition={{ 
              duration: 2 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
