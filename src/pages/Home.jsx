import Hero from "../sections/Hero/Hero"
import Story from "../sections/Story/Story"
import ProductShowcase from "../sections/ProductShowcase/ProductShowcase"
import ProductGrid from "../sections/ProductGrid/ProductGrid"
import HorizontalScroll from "../sections/HorizontalScroll/HorizontalScroll"

export default function Home() {
    return (
        <>
            <Hero />
            <Story />
            <ProductShowcase />
            <HorizontalScroll />
            <ProductGrid />
        </>
    )
}