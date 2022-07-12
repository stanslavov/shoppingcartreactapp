import { useRef, useState } from 'react';

import Input from '../../UI/Input';

import classes from './ProductItemForm.module.css';

const ProductItemForm = (props) => {
    const [quantityIsValid, setQuantityIsValid] = useState(true);
    const quantityInputRef = useRef();

    function onSubmitHandler(event) {
        event.preventDefault();

        const enteredQuantity = quantityInputRef.current.value;
        const enteredQuantityNum = +enteredQuantity;

        if(enteredQuantity.trim().length === 0 || enteredQuantityNum < 1 || enteredQuantityNum > 5){
            setQuantityIsValid(false);
            return;
        };

        props.onAddToCart(enteredQuantityNum);
    };

    return (
        <form className={classes.form} onSubmit={onSubmitHandler}>
            <Input
                ref={quantityInputRef}
                label="Quantity"
                input={{
                    id: 'quantity_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!quantityIsValid ? <p>Please enter a valid quantity(1-5).</p> : null}
        </form>
    );
};

export default ProductItemForm;