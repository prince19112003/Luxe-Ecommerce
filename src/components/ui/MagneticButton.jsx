import useMagnetic from "../../hooks/useMagnetic"

export default function MagneticButton({ children }) {

    const { ref, handleMove, reset } = useMagnetic()

    return (
        <button
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            className="
        px-6 py-3
        rounded-full
        backdrop-blur-xl
        bg-white/10
        border border-white/20
        transition duration-300
      "
        >
            {children}
        </button>
    )
}