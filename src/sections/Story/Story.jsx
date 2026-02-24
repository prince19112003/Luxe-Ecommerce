import { useEffect, useRef } from "react"
import { initStoryAnimation } from "./storyAnimation"

export default function Story() {

    const containerRef = useRef(null)

    useEffect(() => {
        initStoryAnimation(containerRef.current)
    }, [])

    return (

        <section
            ref={containerRef}
            className="relative"
        >

            {/* Panel 1 */}
            <div className="story-panel h-screen flex items-center justify-center text-center px-6">

                <div>
                    <h2 className="text-5xl md:text-7xl font-bold">
                        Designed for Visionaries
                    </h2>
                    <p className="mt-6 opacity-70">
                        Crafted with precision. Animated with perfection.
                    </p>
                </div>

            </div>

            {/* Panel 2 */}
            <div className="story-panel h-screen flex items-center justify-center text-center px-6">

                <div>
                    <h2 className="text-5xl md:text-7xl font-bold">
                        Motion Meets Minimal
                    </h2>
                    <p className="mt-6 opacity-70">
                        Experience scroll like never before.
                    </p>
                </div>

            </div>

            {/* Panel 3 */}
            <div className="story-panel h-screen flex items-center justify-center text-center px-6">

                <div>
                    <h2 className="text-5xl md:text-7xl font-bold">
                        Ultra Unique Experience
                    </h2>
                    <p className="mt-6 opacity-70">
                        Every interaction feels alive.
                    </p>
                </div>

            </div>

        </section>

    )
}