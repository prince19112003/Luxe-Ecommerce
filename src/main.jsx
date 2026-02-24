import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CartProvider } from "./context/CartContext"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <ThemeProvider>
  //   <App />
  // </ThemeProvider>

  <CartProvider>
    <App />
  </CartProvider>
)