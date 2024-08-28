import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    setItem: (item) => { },
    removeItem: (id) => { }
})

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)

        const updatedItems = [...state.items]

        if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }

            updatedItems[existingItemIndex] = updatedItem
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updatedItems }
    }

    if (action.type === "REMOVE_ITEM") {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id)
        const updatedItems = [...state.items]

        if (state.items[existingItemIndex].quantity > 1) {
            const existingItem = state.items[existingItemIndex]
            const updatedItem = [{ ...existingItem, quantity: existingItem.quantity - 1 }]
            updatedItem[existingItemIndex] = updatedItem
        } else {
            updatedItems.splice(existingItemIndex, 1)
        }
        return { ...state, items: updatedItems }

    };
    return state
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })


    function addItem(item) {
        dispatchCartAction({ type: "ADD_ITEM", item })
    }
    function removeItem(id) {
        dispatchCartAction({ type: "REMOVE_ITEM", id })

    }
    const cartContext = {
        items: cart.items,
        addItem, removeItem
    }
    console.log(cartContext);


    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>

}

export default CartContext;