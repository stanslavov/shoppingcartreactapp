import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import backgroundImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>ShoppingCart</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img scr={backgroundImage} alt="A shopping cart ready to be filled with goods!" />
            </div>
        </Fragment>
    );
};

export default Header;