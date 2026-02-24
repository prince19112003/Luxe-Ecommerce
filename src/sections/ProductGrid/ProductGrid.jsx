import ProductCard from "./ProductCard"
import { useRef } from "react"
import useRevealAnimation from "../../hooks/useRevealAnimation"

export default function ProductGrid() {

    const products = [
        "Vision Pro Device",
        "Neo Smart Watch",
        "Ultra Sound Pods",
        "AI Glasses"
    ]
    const sectionRef = useRef()

    useRevealAnimation(sectionRef)
    return (

        <section ref={sectionRef} className="min-h-screen">

            <h2 className="text-5xl font-bold mb-20 text-center">
                Featured Products
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

                {products.map((p, i) => (
                    <ProductCard key={i} title={p} />
                ))}

            </div>

        </section>
    )
}