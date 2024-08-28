import React, { useContext } from 'react'
import Button from './UI/Button'
import CartContext from '../Store/CartContext'

export default function MealItem({ item }) {
    const { addItem } = useContext(CartContext)
    const addItemToCartHandler = () => {
        addItem(item)
    }
    return (
        <div className='border w-full hover:bg-cyan-950  border-gray-500 rounded p-4 '>
            <div className='max-h-60 w-full flex justify-center bg-white'>
                <img className='w-auto h-60 overflow-hidden ' src={item.images[0]} alt="This is a restorent menu" />
            </div>
            <div className='text-gray-300 mt-8'>
                <h2 className='text-lg text-orange-400'>{item.title}</h2>
                <p>${item.price}</p>
                <div className='mt-5'>
                    <Button onClick={addItemToCartHandler} className='w-full bg-slate-700 hover:bg-white hover:text-black py-2 cursor-pointer'>Add To Cart</Button>
                </div>
            </div>
        </div>
    )
}
