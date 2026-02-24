import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScroll() {

    const sectionRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {

        const section = sectionRef.current
        const container = containerRef.current

        const totalWidth = container.scrollWidth

        gsap.to(container, {
            x: () => -(totalWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => "+=" + totalWidth,
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        })

    }, [])

    return (

        <section ref={sectionRef} className="relative h-[300vh]">

            <div
                ref={containerRef}
                className="flex h-screen items-center gap-20 px-20"
            >

                {/* CARD 1 */}
                <div className="min-w-[80vw] h-[70vh] rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl">
                    Future Device
                </div>

                {/* CARD 2 */}
                <div className="min-w-[80vw] h-[70vh] rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl">
                    Ultra Watch
                </div>

                {/* CARD 3 */}
                <div className="min-w-[80vw] h-[70vh] rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl">
                    AI Glass
                </div>

                {/* CARD 4 */}
                <div className="min-w-[80vw] h-[70vh] rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl">
                    Sound Pods
                </div>

            </div>

        </section>
    )
}