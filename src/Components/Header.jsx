import React, { useContext } from 'react'
import logo from '../assets/logo.png';
import CartContext from '../Store/CartContext';
import UserProgressContex from '../Store/UserProgressContext';

export default function Header() {
    const { items } = useContext(CartContext)
    const { showCart } = useContext(UserProgressContex)
    const totalCartItemsAmmount = items.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    return (
        <div className='flex h-24 sticky bg-bg bg-opacity-90 top-0 items-center justify-between'>
            <div>
                <img className='w-14' src={logo} alt="A restorent Logo" />
            </div>
            <div>
                <button onClick={showCart} className='text-slate-100 border px-3 py-2 rounded-md hover:bg-slate-100 hover:text-slate-900'> Cart ({totalCartItemsAmmount})</button>
            </div>
        </div>
    )
}
