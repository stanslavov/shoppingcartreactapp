import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const cartIndex = state.items.findIndex(item => item.id === action.item.id);
        const cartItem = state.items[cartIndex];

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
        let updatedItemsList;

        if (cartItem) {
            const updatedItem = {
                ...cartItem,
                quantity: cartItem.quantity + action.item.quantity
            };
            updatedItemsList = [...state.items];
            updatedItemsList[cartIndex] = updatedItem;
        } else {
            updatedItemsList = state.items.concat(action.item);
        };

        return {
            items: updatedItemsList,
            totalAmount: updatedTotalAmount
        };
    };

    if (action.type === 'REMOVE') {
        const cartIndex = state.items.findIndex(item => item.id === action.id);
        const cartItem = state.items[cartIndex];

        const updatedTotalAmount = state.totalAmount - cartItem.price;
        let updatedItemsList;

        if (cartItem.quantity === 1) {
            updatedItemsList = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = {
                ...cartItem,
                quantity: cartItem.quantity - 1
            };
            updatedItemsList = [...state.items];
            updatedItemsList[cartIndex] = updatedItem;
        };

        return {
            items: updatedItemsList,
            totalAmount: updatedTotalAmount
        };
    };

    if (action.type === 'CLEAR') {
        return defaultCartState;
    };

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    function addItemToCartHandler(item) {
        dispatchCartAction({ type: 'ADD', item: item })
    };

    function removeItemFromCartHandler(id) {
        dispatchCartAction({ type: 'REMOVE', id: id })
    };

    function clearCartHandler() {
        dispatchCartAction({ type: 'CLEAR'})  
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;