import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import { cart$, updateCart } from "../utils/store";
import { URL, GET } from "../utils/utils";

function Product(props) {
  const [product, updateProduct] = useState(null);
  const [amount, updateAmount] = useState(1);
  const [userCart, updateUserCart] = useState(cart$.value);

  useEffect(() => {
    console.log(userCart);

    let subscription = cart$.subscribe(cart => {
      updateUserCart(cart);
    });

    axios
      .get(`${GET}/products?filter[_id]=${props.match.params.id}`)
      .then(res => updateProduct(res.data.entries[0]));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function addToCart() {
    let newUserCart = [...userCart];
    let pos = newUserCart.findIndex(x => x._id === product._id);

    if (pos != -1) {
      newUserCart[pos].amount = newUserCart[pos].amount + amount;
    } else {
      newUserCart.push({
        _id: product._id,
        name: product.name,
        amount: amount,
        price: product.price
      });
    }

    updateCart(newUserCart);
  }

  return (
    <>
      {!product ? (
        <div>
          <Helmet>
            <title>Loading...</title>
          </Helmet>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}€</p>
            <p>In stock: {product.amount_in_stock}</p>
            <div>
              {product.images.map((image, id) => (
                <img key={id} src={`${URL}/${image.path}`} alt={product.name} />
              ))}
            </div>
            <div>
              <div>
                <button
                  onClick={() => (amount > 1 ? updateAmount(amount - 1) : null)}
                >
                  -
                </button>
                <input
                  type="number"
                  onChange={e => updateAmount(e.target.value)}
                  min={1}
                  max={product.amount_in_stock}
                  value={amount}
                />
                <button
                  onClick={() =>
                    amount < product.amount_in_stock
                      ? updateAmount(amount + 1)
                      : null
                  }
                >
                  +
                </button>
              </div>
              <button onClick={addToCart}>Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
