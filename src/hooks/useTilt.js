import { useRef } from "react"

export default function useTilt() {

    const ref = useRef(null)

    const handleMove = (e) => {

        const rect = ref.current.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = -(y - centerY) / 20
        const rotateY = (x - centerX) / 20

        ref.current.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const reset = () => {
        ref.current.style.transform = "rotateX(0) rotateY(0)"
    }

    return { ref, handleMove, reset }
}