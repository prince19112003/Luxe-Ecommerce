import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PageTransition from "./components/layout/PageTransition";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail"

function AnimatedRoutes() {

    const location = useLocation();

    return (
        <AnimatePresence mode="wait">

            <Routes location={location} key={location.pathname}>

                <Route
                    path="/product"
                    element={
                        <PageTransition>
                            <ProductDetail />
                        </PageTransition>
                    }
                />

            </Routes>

        </AnimatePresence>
    );
}

export default AnimatedRoutes;