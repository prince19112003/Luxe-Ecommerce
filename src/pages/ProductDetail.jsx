import { useRef } from "react"
import useRevealAnimation from "../hooks/useRevealAnimation"

export default function ProductDetail() {

    const sectionRef = useRef()
    useRevealAnimation(sectionRef)

    return (

        <section ref={sectionRef} className="min-h-screen px-8 py-32">

            <div className="grid md:grid-cols-2 gap-20 max-w-6xl mx-auto">

                {/* LEFT - IMAGE */}
                <div className="sticky top-32 h-[60vh] rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-3xl">
                    Product Image
                </div>

                {/* RIGHT - DETAILS */}
                <div>

                    <h1 className="text-5xl font-bold">
                        Future Device Pro
                    </h1>

                    <p className="mt-6 opacity-70">
                        Ultra minimal Apple-style product experience.
                        Smooth animation, futuristic design and premium feel.
                    </p>

                    <h2 className="mt-10 text-3xl font-semibold">
                        ₹ 49,999
                    </h2>

                    <button className="mt-8 px-6 py-3 rounded-full border border-white/20">
                        Add to Cart
                    </button>

                </div>

            </div>

        </section>
    )
}