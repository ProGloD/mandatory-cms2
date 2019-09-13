import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

function OrderComplete() {
  return (
    <div>
      <Helmet>
        <title>Order Complete</title>
      </Helmet>
      Your order is complete! Thank you for purchase!
      <button>
        <Link to="/">Back</Link>
      </button>
    </div>
  );
}

export default OrderComplete;
