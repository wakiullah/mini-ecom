import React, { useContext } from 'react'
import Modal from './UI/Modal'
import UserProgressContex from '../Store/UserProgressContext'
import CartContext from '../Store/CartContext'
import useHttp from '../Hooks/useHttp'

const postMethod = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
}

export default function CheckOut() {
    const { progress, hideCart, hideCheckout } = useContext(UserProgressContex)
    const { items, removeItem, clearCart } = useContext(CartContext)
    const totalAmmount = items.reduce((total, item) => total + item.price * item.quantity, 0)
    const { sentRequest, data, error, isLoading, clearData } = useHttp('https://dummyjson.com/products/add', postMethod)


    const hideCartPopupHandler = () => {
        hideCart()
    }

    const clearCartWithModal = () => {
        hideCheckout()
        clearCart()
        clearData()
    }

    const checkOutSubmitHandler = (e) => {
        e.preventDefault();
        const fd = new FormData(e.target)
        const customerData = Object.fromEntries(fd.entries())
        sentRequest(JSON.stringify({
            order: {
                items,
                customer: customerData
            }
        }))
    }


    if (data && error === undefined) {
        return (
            <Modal open={progress === 'Checkout' ? true : false} >
                <div
                    className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
                    <div className="w-full max-w-xl bg-white shadow-lg rounded-3xl p-6 relative">
                        <svg onClick={clearCartWithModal} xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                            <path
                                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                                data-original="#000000"></path>
                            <path
                                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                                data-original="#000000"></path>
                        </svg>
                        <div className='text-center'>
                            <h2 className='text-green-700 text-lg mb-5'>Success!</h2>
                            <p className='mb-5'>Your order was submitted successfully!</p>
                            <p className="modal-actions">
                                <button type="button" onClick={clearCartWithModal} className="text-sm px-5 w-1/2 py-2.5 ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide">OK</button>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <Modal open={progress === 'Checkout' ? true : false}>
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

                    <div className="space-y-4 mt-6">
                        <h2 className='text-center text-lg font-bold'>{!error ? 'Checkout' : "Something Error!"}</h2>
                        <form onSubmit={checkOutSubmitHandler} className="font-[sans-serif] max-w-4xl mx-auto">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="relative flex items-center sm:col-span-2">
                                    <input type="text" placeholder="Name" name='name'
                                        className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2"
                                        viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path
                                            d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input type="number" placeholder="Phone No." name='mobile'
                                        className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none" />
                                    <svg fill="#bbb" className="w-[18px] h-[18px] absolute right-2" viewBox="0 0 64 64">
                                        <path
                                            d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                                            data-original="#000000"></path>
                                    </svg>
                                </div>

                                <div className="relative flex items-center">
                                    <input type="text" placeholder="Post Code" name='post'
                                        className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" className="w-[18px] h-[18px] absolute right-2"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M20.48 8.301A9.217 9.217 0 0 1 21.25 12c0 5.105-4.145 9.25-9.25 9.25S2.75 17.105 2.75 12 6.895 2.75 12 2.75a.75.75 0 0 0 0-1.5C6.067 1.25 1.25 6.067 1.25 12S6.067 22.75 12 22.75 22.75 17.933 22.75 12c0-1.529-.32-2.983-.896-4.301a.75.75 0 0 0-1.374.602z"
                                            data-original="#000000" />
                                        <path
                                            d="M17 1.25a3.443 3.443 0 0 0-3.442 3.442c0 .594.269 1.317.685 2.023.835 1.421 2.227 2.815 2.227 2.815a.749.749 0 0 0 1.06 0s1.392-1.394 2.227-2.815c.416-.706.685-1.429.685-2.023 0-1.9-1.542-3.442-3.442-3.442zm0 1.5c1.072 0 1.942.87 1.942 1.942 0 .528-.393 1.177-.815 1.789A15.328 15.328 0 0 1 17 7.901c-.325-.366-.75-.874-1.127-1.42-.422-.612-.815-1.261-.815-1.789 0-1.072.87-1.942 1.942-1.942zM1.603 12.636l3.27 2.044c.596.372 1.285.57 1.987.57h.76c.657 0 1.281.287 1.709.786l1.051 1.227a2.25 2.25 0 0 1 .456 2.082l-.557 1.949a.75.75 0 0 0 1.442.412l.557-1.949a3.748 3.748 0 0 0-.759-3.47l-1.052-1.227a3.746 3.746 0 0 0-2.847-1.31h-.76c-.421 0-.834-.118-1.192-.342l-3.271-2.044a.75.75 0 1 0-.794 1.272z"
                                            data-original="#000000" />
                                        <path
                                            d="m5.329 4.335 1.596 3.192a2.748 2.748 0 0 0 1.757 1.429l1.758.465c.443.117.786.467.894.912l.753 3.087a2.75 2.75 0 0 0 1.146 1.637l.466.31a2.746 2.746 0 0 0 3.985-1.058l.575-1.151a1.25 1.25 0 0 1 .815-.653l2.791-.698a.75.75 0 0 0-.364-1.455l-2.791.697a2.752 2.752 0 0 0-1.792 1.438l-.576 1.151a1.246 1.246 0 0 1-1.811.481l-.466-.31a1.25 1.25 0 0 1-.521-.744l-.752-3.087a2.75 2.75 0 0 0-1.969-2.007l-1.758-.465a1.247 1.247 0 0 1-.798-.65L6.671 3.665a.75.75 0 1 0-1.342.67z"
                                            data-original="#000000" />
                                    </svg>
                                </div>

                                <div className="relative flex items-center sm:col-span-2">
                                    <input type="email" placeholder="Email" name='email'
                                        className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-2"
                                        viewBox="0 0 682.667 682.667">
                                        <defs>
                                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                            </clipPath>
                                        </defs>
                                        <g transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                            <path fill="none"
                                                d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                data-original="#000000"></path>
                                            <path
                                                d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                data-original="#000000"></path>
                                        </g>
                                    </svg>
                                </div>

                                <div className="relative flex items-center sm:col-span-2">
                                    <input type="text" placeholder="Street" name='street'
                                        className="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none" />

                                </div>
                            </div>


                            <div className="flex mt-6">
                                <span className="text-base font-bold text-gray-800 flex-1">Total</span>
                                <span className="text-base font-bold text-gray-800">${totalAmmount.toFixed(2)}</span>
                            </div>

                            {isLoading ? <p>Sending Data...</p> : <div className="flex max-sm:flex-col gap-4 mt-6 i">
                                <button type="submit" className="text-sm px-5 w-1/2 py-2.5 ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide">Place Order</button>
                            </div>}
                        </form>

                    </div>

                </div>
            </div>

        </Modal>
    )
}
