import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Products from './Components/Products'
import { CartContextProvider } from './Store/CartContext'
import Modal from './Components/UI/Modal'
import { UserProgressContexProvider } from './Store/UserProgressContext'
import Cart from './Components/Cart'
import CheckOut from './Components/Checkout'

function App() {

  return (
    <UserProgressContexProvider>
      <CartContextProvider>

        <div className='max-w-screen-lg m-auto'>
          <Cart />
          <CheckOut />
          <Header />
          <Products />
        </div>
      </CartContextProvider>
    </UserProgressContexProvider>
  )
}

export default App
