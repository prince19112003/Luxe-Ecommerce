import { forwardRef } from "react"

const FloatingModel = forwardRef((props, ref) => {

    return (
        <mesh ref={ref}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={"white"} />
        </mesh>
    )
})

export default FloatingModel