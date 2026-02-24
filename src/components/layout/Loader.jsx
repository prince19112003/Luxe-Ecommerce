import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Loader({ onFinish }) {

    const [progress, setProgress] = useState(0)

    useEffect(() => {

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => onFinish(), 500)
                    return 100
                }
                return prev + 5
            })
        }, 80)

    }, [])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-[9999]"
        >

            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl font-bold tracking-widest"
            >
                LUXE
            </motion.h1>

            <div className="w-64 h-[2px] bg-white/20 mt-10 overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-200"
                    style={{ width: `${progress}%` }}
                />
            </div>

        </motion.div>
    )
}