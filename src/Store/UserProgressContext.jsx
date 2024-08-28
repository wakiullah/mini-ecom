import { createContext, useState } from "react";

const UserProgressContex = createContext({
    progress: '',
    showCart: () => { },
    hideCart: () => { },
    ShowCheckout: () => { },
    hideCheckout: () => { }
})


export const UserProgressContexProvider = ({ children }) => {
    const [progress, setProgress] = useState('')

    function showCart() {
        setProgress('Cart')
    }

    function hideCart() {
        setProgress('')
    }

    function showCheckout() {
        setProgress('Checkout')
    }

    function hideCheckout() {
        setProgress('')
    }

    const progressValue = {
        progress,
        showCart,
        hideCart,
        showCheckout, hideCheckout
    }

    return <UserProgressContex.Provider value={progressValue}>{children}</UserProgressContex.Provider>
}

export default UserProgressContex