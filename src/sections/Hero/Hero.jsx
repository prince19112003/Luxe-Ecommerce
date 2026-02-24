import { motion } from "framer-motion"
import { heroText } from "./heroAnimation"
import { useState } from "react"
import MagneticButton from "../../components/ui/MagneticButton"

export default function Hero() {

    const [mouse, setMouse] = useState({ x: 0, y: 0 })

    const handleMove = (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5
        const y = (e.clientY / window.innerHeight) - 0.5
        setMouse({ x, y })
    }

    return (

        <section
            onMouseMove={handleMove}
            className="h-screen flex items-center justify-center relative overflow-hidden"
        >

            {/* Background glow */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-white/10 dark:bg-white/5"
                style={{
                    transform: `translate(${mouse.x * 50}px,${mouse.y * 50}px)`
                }}
            />

            {/* Text */}
            <motion.div
                variants={heroText}
                initial="hidden"
                animate="show"
                className="text-center z-10"
            >

                <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                    Experience Future
                </h1>

                <p className="mt-6 opacity-70">
                    Apple-level minimal. Ultra unique motion.
                </p>
                <MagneticButton>
                    Explore Now
                </MagneticButton>
            </motion.div>
            

        </section>
    )
}