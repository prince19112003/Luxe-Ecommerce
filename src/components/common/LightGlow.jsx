import { useEffect, useState } from "react"

export default function LightGlow() {

    const [pos, setPos] = useState({ x: 50, y: 50 })

    useEffect(() => {
        const move = (e) => {
            const x = (e.clientX / window.innerWidth) * 100
            const y = (e.clientY / window.innerHeight) * 100
            setPos({ x, y })
        }

        window.addEventListener("mousemove", move)
        return () => window.removeEventListener("mousemove", move)
    }, [])

    return (
        <div
            className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
            style={{
                background: `
          radial-gradient(
            600px at ${pos.x}% ${pos.y}%,
            rgba(255,255,255,0.12),
            transparent 60%
          )
        `
            }}
        />
    )
}