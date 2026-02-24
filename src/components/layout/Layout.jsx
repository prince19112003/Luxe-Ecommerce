import LightGlow from "../common/LightGlow"
import Cursor from "../common/Cursor"
import Navbar from "./Navbar"
import CartSidebar from "../cart/CartSidebar"
import useSmoothScroll from "../../hooks/useSmoothScroll"
import { useCart } from "../../context/CartContext"
import { motion } from "framer-motion"

export default function Layout({ children }) {

    useSmoothScroll()

    const { open } = useCart()

    return (
        <div className="relative overflow-hidden">

            <LightGlow />
            <Cursor />
            <Navbar />

            {/* Main content with depth effect */}
            <motion.main
                animate={{
                    scale: open ? 0.95 : 1,
                    filter: open ? "blur(4px)" : "blur(0px)"
                }}
                transition={{ duration: 0.4 }}
                className="relative z-10 pt-20 min-h-screen"
            >
                {children}
            </motion.main>

            <CartSidebar />

        </div>
    )
}