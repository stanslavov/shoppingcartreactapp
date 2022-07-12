import classes from './ProductsSummary.module.css';

const ProductsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Everything you need, at the push of a button</h2>
            <p>
                Choose what you need, add it to your cart and we'll take care of the rest!
            </p>
            <p>
                We have a vast selection of products, awesome prices and fast delivery. Don't wait up, try out our app now!
            </p>
        </section>
    );
};

export default ProductsSummary;