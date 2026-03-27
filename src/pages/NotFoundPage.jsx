import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <h1 className="text-[12rem] font-black font-outfit text-gray-100 leading-none select-none">404</h1>
          <div className="relative -mt-20">
            <h2 className="text-4xl font-black font-outfit text-gray-900 mb-6">Oops! Lost in Space?</h2>
            <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
              We couldn't find the page you were looking for. It might have moved, or the link is just broken.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <button className="btn-luxe px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 shadow-luxe-lg">
                  <Home size={18} /> Take Me Home
                </button>
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="btn-outline-luxe px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2"
              >
                <ArrowLeft size={18} /> Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
