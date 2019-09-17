import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { cart$ } from "./utils/store";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderComplete from "./components/OrderComplete";
import "./style/App.css";

function App() {
  const [cart, updateCart] = useState(cart$.value);

  useEffect(() => {
    let subscription = cart$.subscribe(cart => {
      updateCart(cart);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Helmet>
        <title>Home</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Helmet>

      <div className="App">
        <header className="App-header">
          <h1>
            <Link className="App-logo" to="/">
              Fruit Market
            </Link>
          </h1>

          <Link className="App-cart" to="/shopping_cart">
            <span className="material-icons">shopping_cart</span>
            {`(${cart.length})`}
          </Link>
        </header>

        <main className="App-main">
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" component={Product} />
          <Route path="/shopping_cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order_complete" component={OrderComplete} />
        </main>

        <footer className="App-footer">
          <p> &copy; 2019 Made by Yaro</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
