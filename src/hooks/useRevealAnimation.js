import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function useRevealAnimation(ref) {

    useEffect(() => {

        if (!ref.current) return

        gsap.fromTo(ref.current,
            {
                opacity: 0,
                scale: 0.96,
                y: 80
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        )

    }, [ref])
}