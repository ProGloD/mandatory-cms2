import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Home from "./components/Home.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <header>
        <Link to="/">Fruit Store</Link>
        <Link to="/shopping_cart">Shopping Cart(0)</Link>
      </header>

      <main>
        <Route path="/" exact component={Home} />
      </main>

      <footer>
        <p>Made by Yaro, 2019.</p>
      </footer>
    </Router>
  );
}

export default App;
