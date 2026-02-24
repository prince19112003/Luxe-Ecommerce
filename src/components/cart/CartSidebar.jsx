import { motion } from "framer-motion"
import { useCart } from "../../context/CartContext"

export default function CartSidebar() {

    const { cart, open, setOpen } = useCart()

    return (

        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: open ? 0 : "100%" }}
            transition={{ duration: 0.5 }}
            className="
        fixed right-0 top-0
        h-full w-80
        backdrop-blur-xl
        bg-black/40
        border-l border-white/10
        z-50
        p-6
      "
        >

            <button onClick={() => setOpen(false)}>
                Close
            </button>

            <h2 className="text-xl mt-4">Cart</h2>

            {cart.map((item, i) => (
                <div key={i} className="mt-4">
                    {item.title}
                </div>
            ))}

        </motion.div>

    )
}