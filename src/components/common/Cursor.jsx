import { useEffect, useRef, useState } from "react"

export default function Cursor() {

    const cursorRef = useRef(null)

    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    // Track real mouse
    useEffect(() => {
        const move = (e) => {
            setMouse({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", move)
        return () => window.removeEventListener("mousemove", move)
    }, [])

    // Smooth follow (lerp)
    useEffect(() => {
        const lerp = (start, end, factor) => start + (end - start) * factor

        const animate = () => {
            setPosition((prev) => ({
                x: lerp(prev.x, mouse.x, 0.15),
                y: lerp(prev.y, mouse.y, 0.15),
            }))
            requestAnimationFrame(animate)
        }

        animate()
    }, [mouse])

    // Detect hover elements
    useEffect(() => {
        const hoverElements = document.querySelectorAll("button, a")

        hoverElements.forEach((el) => {
            el.addEventListener("mouseenter", () => setIsHovering(true))
            el.addEventListener("mouseleave", () => setIsHovering(false))
        })
    }, [])

    return (
        <div
            ref={cursorRef}
            className={`
        fixed z-[999] pointer-events-none
        rounded-full border mix-blend-difference
        transition-all duration-300
        ${isHovering ? "w-16 h-16" : "w-6 h-6"}
      `}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
        />
    )
}