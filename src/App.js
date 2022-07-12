import React, { useState } from "react";

import Header from './components/Layout/Header';
import Products from "./components/Products/Products";
import Cart from './components/Cart/Cart';
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  
  function showCartHandler() {
    setCartIsShown(true);
  };

  function hideCartHandler() {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown === true ? <Cart onClose={hideCartHandler} /> : null}
      <Header onShowCart={showCartHandler} />
      <main>
        <Products />
      </main>
    </CartProvider>
  );
}

export default App;
