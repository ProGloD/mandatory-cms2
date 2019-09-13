import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";

import { updateCart } from "../utils/store";

function Checkout() {
  const [name, updateName] = useState("");
  const [adress, updateAdress] = useState("");
  const [status, updateStatus] = useState(false);

  function Submit(e) {
    e.preventDefault();
    updateCart([]);
    updateStatus(true);
  }

  return status ? (
    <Redirect to="/order_complete" />
  ) : (
    <div>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <form onSubmit={Submit}>
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
          onChange={e => updateAdress(e.target.value)}
          value={adress}
        />
        <br />
        <input type="submit" value="Order" />
      </form>
    </div>
  );
}

export default Checkout;
