import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setTheme(prefersDark ? "dark" : "light")
    }, [])

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}