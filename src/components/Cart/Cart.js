import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [showCheckout, setShowCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccessful, setSubmitSuccessful] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id);
    };

    function cartItemAddHandler(item) {
        cartCtx.addItem({...item, quantity: 1});
    };

    function orderHandler() {
        setShowCheckout(true);
    };

    async function submitOrderHandler(userData) {
        setIsSubmitting(true);
        await fetch('database url.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                order: cartCtx.items
            })
        });

        setIsSubmitting(false);
        setSubmitSuccessful(true);
        cartCtx.clearCart();

        // if (!response.ok) {
        //     throw new Error('Something went wrong...');
        // };

        // submitOrderHandler().catch(error => {
        //     setIsSubmitting(false);
        //     setError(error.message);
        // });
    };

    const cartItems = (
    <ul className={classes['cart-items']}>{cartCtx.items.map(item => 
        <CartItem 
            key={item.id} 
            name={item.name} 
            quantity={item.quantity} 
            price={item.price} 
            onRemove={cartItemRemoveHandler.bind(null, item.id)} 
            onAdd={cartItemAddHandler.bind(null, item)}
        />
        )}
        </ul>
    );

    const modalActions = <div className={classes.actions}>
                            <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
                            {hasItems ? <button className={classes.button} onClick={orderHandler}>Order</button> : null}
                        </div>

    const cartModalContent = <React.Fragment>
                                {cartItems}
                                <div className={classes.total}>
                                    <span>Total Amount</span>
                                    <span>{totalAmount}</span>
                                </div>
                                {showCheckout ? <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/> : ''}
                                {!showCheckout ? modalActions : ''}
                            </React.Fragment>

    const isSubmittingModalContent = <p>Sending order...</p>;
    const submitSuccessfulModalContent = <React.Fragment>
                                           <p>Order submitted successfully.</p>
                                           <div className={classes.actions}>
                                           <button className={classes.button} onClick={props.onClose}>Close</button>  
                                           </div>          
                                        </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !submitSuccessful ? cartModalContent : ''}
            {isSubmitting ? isSubmittingModalContent : ''}
            {submitSuccessful && !isSubmitting ? submitSuccessfulModalContent : ''}
        </Modal>
    );
};

export default Cart;