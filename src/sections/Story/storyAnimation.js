import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const initStoryAnimation = (container) => {

    const sections = container.querySelectorAll(".story-panel")

    sections.forEach((panel) => {

        gsap.fromTo(panel,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: panel,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        )

    })

}