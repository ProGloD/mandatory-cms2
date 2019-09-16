import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";

import NewReview from "./NewReview";
import { cart$, updateCart } from "../utils/store";
import { URL, GET } from "../utils/utils";

function Product(props) {
  const [product, updateProduct] = useState(null);
  const [reviews, updateReviews] = useState(null);
  const [amount, updateAmount] = useState(1);
  const [userCart, updateUserCart] = useState(cart$.value);

  useEffect(() => {
    let subscription = cart$.subscribe(cart => {
      updateUserCart(cart);
    });

    axios
      .get(`${GET}/products?filter[_id]=${props.match.params.id}`)
      .then(res => {
        updateProduct(res.data.entries[0]);
        getReviews();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function getReviews() {
    axios
      .get(
        `${GET}/reviews?filter[product._id]=${props.match.params.id}&sort[_created]=-1`
      )
      .then(res => updateReviews(res.data.entries));
  }

  function addToCart() {
    let newUserCart = [...userCart];
    let pos = newUserCart.findIndex(x => x.collection._id === product._id);

    if (pos !== -1) {
      newUserCart[pos].amount = newUserCart[pos].amount + amount;
    } else {
      newUserCart.push({
        amount,
        price: product.price,
        collection: {
          _id: product._id,
          link: "products",
          display: product.name
        }
      });
    }

    updateCart(newUserCart);
  }

  return (
    <>
      {!product || !reviews ? (
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
            {/* product */}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}€</p>
            <p>In stock: {product.amount_in_stock}</p>
            <div>
              {product.images.map((image, id) => (
                <img key={id} src={`${URL}/${image.path}`} alt={product.name} />
              ))}
            </div>
            {/* product end */}

            {/* add to cart */}
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
            {/* add to cart end */}

            {/* reviews */}
            <div>
              <NewReview product={product} getReviews={getReviews} />
              <div>
                {reviews.map(review => (
                  <div key={review._id}>
                    <h3>{review.title}</h3>
                    <p>Rating: {review.rating}</p>
                    <p>{review.body}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* reviews end */}
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
