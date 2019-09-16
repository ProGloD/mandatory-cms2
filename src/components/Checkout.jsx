import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { POST } from "../utils/utils";
import { cart$, updateCart } from "../utils/store";

function Checkout() {
  const [name, updateName] = useState("");
  const [address, updateAddress] = useState("");
  const [status, updateStatus] = useState(false);

  function Submit() {
    let totalPrice = 0;

    cart$.value.forEach(item => {
      totalPrice = totalPrice + item.amount * parseFloat(item.price);
    });

    let data = {
      name,
      address,
      totalPrice,
      orderList: cart$.value.map(x => ({ value: x }))
    };

    axios.post(`${POST}/order`, { data }).then(_ => {
      updateCart([]);
      updateStatus(true);
    });
  }

  return status ? (
    <Redirect to="/order_complete" />
  ) : (
    <div>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <form onSubmit={e => e.preventDefault()}>
        <p>Name:</p>
        <input
          type="text"
          required
          onChange={e => updateName(e.target.value)}
          value={name}
        />
        <p>Adress:</p>
        <input
          type="text"
          required
          onChange={e => updateAddress(e.target.value)}
          value={address}
        />
        <br />
        <input type="submit" onClick={Submit} value="Order" />
      </form>
    </div>
  );
}

export default Checkout;
