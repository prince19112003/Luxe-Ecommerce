import { BrowserRouter } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

import Layout from "./components/layout/Layout"
import AnimatedRoutes from "./AnimatedRoutes"
import Loader from "./components/layout/Loader"

function App() {

  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>

      <AnimatePresence mode="wait">

        {loading ? (
          <Loader key="loader" onFinish={() => setLoading(false)} />
        ) : (
          <Layout key="layout">
            <AnimatedRoutes />
          </Layout>
        )}

      </AnimatePresence>

    </BrowserRouter>
  )
}

export default App