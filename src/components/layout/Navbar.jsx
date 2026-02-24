export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-40 backdrop-blur-xl bg-white/10 dark:bg-black/20 border-b border-white/10">

            <div className="max-w-7xl mx-auto flex justify-between p-4">

                <h1 className="font-bold">LUXE</h1>

                <div className="flex gap-6">
                    <a href="#">Shop</a>
                    <a href="#">About</a>
                    <div id="cart-icon" className="cursor-pointer">
                        🛒
                    </div>
                   
                </div>

            </div>

        </nav>
    )
}