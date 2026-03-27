import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SellerLayout from './components/layout/SellerLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import SplashScreen from './components/ui/SplashScreen';

// Buyer Pages
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/auth/LoginPage';
import ProfilePage from './pages/user/ProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';

// Seller Pages
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerOrders from './pages/seller/SellerOrders';
import SellerPayments from './pages/seller/SellerPayments';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith('/seller');

  useEffect(() => {
    // Artificial delay for splash screen or wait for specific assets
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-luxe-black min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" onComplete={() => {}} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen"
          >
            <ScrollToTop />
            <Toaster 
              position="top-center" 
              toastOptions={{
                className: 'bg-black text-white border-2 border-white rounded-none font-bold',
                duration: 4000,
                style: {
                  background: '#000',
                  color: '#fff',
                  border: '2px solid #fff',
                  borderRadius: '0px',
                  padding: '16px 32px',
                  boxShadow: '0 0 30px rgba(255,255,255,0.2)'
                }
              }} 
            />

            {!isSellerRoute && <Navbar />}

            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                  <Route path="/search" element={<PageTransition><SearchResultsPage /></PageTransition>} />
                  <Route path="/category/:slug" element={<PageTransition><ProductListingPage /></PageTransition>} />
                  <Route path="/product/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
                  <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
                  <Route path="/checkout" element={<ProtectedRoute role="buyer"><PageTransition><CheckoutPage /></PageTransition></ProtectedRoute>} />
                  <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                  <Route path="/register" element={<PageTransition><LoginPage /></PageTransition>} />
                  <Route path="/profile" element={<ProtectedRoute role="buyer"><PageTransition><ProfilePage /></PageTransition></ProtectedRoute>} />

                  <Route path="/seller" element={<ProtectedRoute role="seller"><SellerLayout /></ProtectedRoute>}>
                    <Route index element={<PageTransition><SellerDashboard /></PageTransition>} />
                    <Route path="products" element={<PageTransition><SellerProducts /></PageTransition>} />
                    <Route path="orders" element={<PageTransition><SellerOrders /></PageTransition>} />
                    <Route path="payments" element={<PageTransition><SellerPayments /></PageTransition>} />
                    <Route path="profile" element={<PageTransition><div className="p-10 glass-card rounded-3xl"><h1 className="text-2xl font-black font-outfit">Store Profile</h1><p className="text-white/50 mt-2">Manage your luxury brand identity.</p></div></PageTransition>} />
                  </Route>

                  <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
                </Routes>
              </AnimatePresence>
            </main>

            {!isSellerRoute && <Footer />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}