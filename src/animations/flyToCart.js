import gsap from "gsap"

export default function flyToCart(element) {

    const cart = document.getElementById("cart-icon")

    if (!cart || !element) return

    const clone = element.cloneNode(true)

    const start = element.getBoundingClientRect()
    const end = cart.getBoundingClientRect()

    clone.style.position = "fixed"
    clone.style.left = start.left + "px"
    clone.style.top = start.top + "px"
    clone.style.width = start.width + "px"
    clone.style.zIndex = 9999
    clone.style.pointerEvents = "none"

    document.body.appendChild(clone)

    gsap.to(clone, {
        x: end.left - start.left,
        y: end.top - start.top,
        scale: 0.2,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
            clone.remove()
        }
    })
}