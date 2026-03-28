import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { searchProducts } from '../data/products';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchProducts(query);

  return (
    <div className="bg-luxe-black min-h-screen max-w-7xl mx-auto px-4 md:px-6 pt-32 pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-black font-outfit text-white mb-2 flex items-center gap-2">
          <Search size={24} className="text-luxe-red" /> 
          Search Results for "{query}"
        </h1>
        <p className="text-white/40">{results.length} products found matching your search</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {results.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-white/20" />
          </div>
          <h2 className="text-2xl font-black font-outfit text-white mb-4">No results found</h2>
          <p className="text-white/40 max-w-sm mx-auto mb-8">
            We couldn't find any products matching your search. Try different keywords or browse our categories.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/">
              <button className="btn-premium px-8 py-3 text-xs font-black uppercase tracking-widest">Return Home</button>
            </Link>
            <Link to="/category/electronics">
              <button className="btn-premium px-8 py-3 text-xs font-black uppercase tracking-widest bg-transparent text-white border-white/20 hover:bg-white/10">Browse Shop</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
