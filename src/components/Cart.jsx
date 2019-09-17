import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { cart$, updateCart } from "../utils/store";

function Cart() {
  const [userCart, updateUserCart] = useState(cart$.value);
  const [totalPrice, updateTotalPrice] = useState(0);

  useEffect(() => {
    let subscription = cart$.subscribe(cart => {
      updateUserCart(cart);

      let total = 0;
      cart.forEach(product => {
        let productTotal = product.amount * parseFloat(product.price);
        total = total + productTotal;
      });
      updateTotalPrice(total.toFixed(2));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function removeProduct(product) {
    let newCart = userCart.filter(item => item !== product);

    updateCart(newCart);
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      {userCart.length === 0 ? (
        <p>Shopping cart is empty...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {userCart.map(product => {
                return (
                  <tr key={product.collection._id}>
                    <td>{product.collection.display}</td>
                    <td>{product.amount}</td>
                    <td>{product.price}€</td>
                    <td>
                      <button onClick={() => removeProduct(product)}>
                        &times;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <span>Total: {totalPrice}€</span>
          <button>
            <Link to="/checkout">Checkout</Link>
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
