import { useRef } from "react"
import useTilt from "../../hooks/useTilt"
import { useCart } from "../../context/CartContext"
import flyToCart from "../../animations/flyToCart"
import { useNavigate } from "react-router-dom"

export default function ProductCard({ title }) {

    const { ref, handleMove, reset } = useTilt()
    const { addToCart } = useCart()

    const handleAdd = () => {
        flyToCart(ref.current)   // SAME element fly karega
        addToCart({ title })
    }
    const navigate = useNavigate()

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            onClick={() => navigate("/product")}
            className="
        backdrop-blur-xl
        bg-white/10 dark:bg-white/5
        border border-white/10
        rounded-3xl
        p-10
        transition-transform duration-200
        transform-gpu
      "
        >

            <h3 className="mb-6 text-xl font-semibold">{title}</h3>

            <button
                onClick={handleAdd}
                className="px-4 py-2 rounded-full border border-white/20"
            >
                Add to Cart
            </button>

        </div>
    )
}