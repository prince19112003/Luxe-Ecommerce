import { Canvas } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import FloatingModel from "./FloatingModel"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ProductShowcase() {

    const modelRef = useRef(null)
    const sectionRef = useRef(null)

    useEffect(() => {

        if (!modelRef.current) return

        const ctx = gsap.context(() => {

            gsap.to(modelRef.current.rotation, {
                y: Math.PI * 2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            })

            gsap.to(modelRef.current.position, {
                z: -2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "bottom top",
                    scrub: true,
                }
            })

        }, sectionRef)

        return () => ctx.revert()

    }, [])

    return (
        <section ref={sectionRef} className="h-[200vh]">

            <div className="sticky top-0 h-screen">

                <Canvas camera={{ position: [0, 0, 5] }}>

                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} />

                    <FloatingModel ref={modelRef} />

                </Canvas>

            </div>

        </section>
    )
}