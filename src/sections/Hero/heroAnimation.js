import { motion } from "framer-motion"

export const heroText = {
    hidden: { opacity: 0, y: 80 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: "easeOut"
        }
    }
}