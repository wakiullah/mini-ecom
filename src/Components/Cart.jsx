import React, { useContext } from 'react'
import Modal from './UI/Modal'
import UserProgressContex from '../Store/UserProgressContext'
import CartContext from '../Store/CartContext'

export default function Cart() {
    const { progress, hideCart, showCheckout } = useContext(UserProgressContex)
    const { items, removeItem } = useContext(CartContext)

    const totalAmmount = items.reduce((total, item) => total + item.price * item.quantity, 0)


    const hideCartPopupHandler = () => {

        hideCart()
    }
    const showCheckoutHandler = () => {
        showCheckout()
    }

    return (
        <Modal open={progress === 'Cart' ? true : false}>
            <div
                className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                <div className="w-full max-w-xl bg-white shadow-lg rounded-3xl p-6 relative">
                    <svg onClick={hideCartPopupHandler} xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                        <path
                            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                            data-original="#000000"></path>
                        <path
                            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                            data-original="#000000"></path>
                    </svg>

                    <h4 className="text-base font-bold text-gray-800 mt-6">{items.length} Items</h4>

                    <div className="space-y-4 mt-6">
                        {items.map((item, i) => (
                            <div key={i} className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <img src={item.images[0]} className="w-16 h-16 p-2 shrink-0 bg-gray-200 rounded-md" />
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-800">{item.title}</p>
                                        <p className="text-gray-500 text-xs mt-1">{item.quantity} Item</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-base  text-gray-800 mr-4">${item.price}</span>
                                    <span className="text-base font-bold text-gray-800 mr-4">${(item.price * item.quantity).toFixed(2)}</span>

                                    <svg onClick={removeItem} xmlns="http://www.w3.org/2000/svg" className="w-[18px] fill-red-500 inline cursor-pointer" viewBox="0 0 24 24">
                                        <path
                                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                            data-original="#000000"></path>
                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>))}


                    </div>

                    <div className="flex mt-6">
                        <span className="text-base font-bold text-gray-800 flex-1">Total</span>
                        <span className="text-base font-bold text-gray-800">${totalAmmount.toFixed(2)}</span>
                    </div>

                    {items.length !== 0 && <div className="flex max-sm:flex-col gap-4 mt-6 i">
                        <button onClick={showCheckoutHandler} type="button" className="text-sm px-5 w-1/2 py-2.5 ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide">Checkout</button>
                    </div>}
                </div>
            </div>

        </Modal>
    )
}
