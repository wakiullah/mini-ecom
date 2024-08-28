import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Products from './Components/Products'
import { CartContextProvider } from './Store/CartContext'
import Modal from './Components/UI/Modal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <><CartContextProvider>

      <div className='max-w-screen-lg m-auto'>
        <Modal />
        <Header />
        <Products />
      </div>
    </CartContextProvider>
    </>
  )
}

export default App
