import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

function inputFieldIsEmpty(value) {
    return value.trim() === '';  
};

function inputIsNotFiveChars(value) {
    return value.trim().length !== 5;
};

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    function onConfirmHandler(event) {
        event.preventDefault();

        const nameInput = nameInputRef.current.value;
        const streetInput = streetInputRef.current.value;
        const postalCodeInput = postalCodeInputRef.current.value;
        const cityInput = cityInputRef.current.value;

        const nameInputIsValid = !inputFieldIsEmpty(nameInput);
        const streetInputIsValid = !inputFieldIsEmpty(streetInput);
        const postalCodeInputIsValid = !inputIsNotFiveChars(postalCodeInput);
        const cityInputIsValid = !inputFieldIsEmpty(cityInput);

        setFormValidity({
            name: nameInputIsValid,
            street: streetInputIsValid,
            postalCode: postalCodeInputIsValid,
            city: cityInputIsValid
        });

        const formIsValid = nameInputIsValid && streetInputIsValid && postalCodeInputIsValid && cityInputIsValid;

        if (!formIsValid) {
            return;
        };

        props.onConfirm({
            name: nameInput,
            street: streetInput,
            postalCode: postalCodeInput,
            city: cityInput
        });
    };

    const nameClasses = `${classes.control} ${!formValidity.name ? classes.invalid : ''}`;
    const streetClasses = `${classes.control} ${!formValidity.street ? classes.invalid : ''}`;
    const postalCodeClasses = `${classes.control} ${!formValidity.postalCode ? classes.invalid : ''}`;
    const cityClasses = `${classes.control} ${!formValidity.city ? classes.invalid : ''}`;

    return <form className={classes.form} onSubmit={onConfirmHandler}>
        <div className={nameClasses}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameInputRef} type="text" id="name" />
            {!formValidity.name ? <p>Please enter a valid name.</p> : ''}
        </div>
        <div className={streetClasses}>
            <label htmlFor="street">Street</label>
            <input ref={streetInputRef} type="text" id="street" />
            {!formValidity.street ? <p>Please enter a valid street name.</p> : ''}
        </div>
        <div className={postalCodeClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input ref={postalCodeInputRef} type="text" id="postal" />
            {!formValidity.postalCode ? <p>Postal code should be 5 characters long.</p> : ''}

        </div>
        <div className={cityClasses}>
            <label htmlFor="city">City</label>
            <input ref={cityInputRef} type="text" id="city" />
            {!formValidity.city ? <p>Please enter a valid city.</p> : ''}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
        </div>
    </form>
};

export default Checkout;