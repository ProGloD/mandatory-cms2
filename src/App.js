import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { cart$ } from "./utils/store";
import Home from "./components/Home";
import Product from "./components/Product";
import "./App.css";

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
      </Helmet>

      <header>
        <Link to="/">Fruit Store</Link>
        <Link to="/shopping_cart">Shopping Cart({cart.length})</Link>
      </header>

      <main>
        <Route path="/" exact component={Home} />
        <Route path="/product/:id" component={Product} />
      </main>

      <footer>
        <p>Made by Yaro, 2019.</p>
      </footer>
    </Router>
  );
}

export default App;
