import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {

    const [cart, setCart] = useState([])
    const [open, setOpen] = useState(false)

    const addToCart = (item) => {
        setCart(prev => [...prev, item])
        setOpen(true)
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, open, setOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)