import React, { useState } from "react";
import Rating from "react-rating";
import axios from "axios";

import { POST } from "../utils/utils";

function NewReview(props) {
  const [title, updateTitle] = useState("");
  const [body, updateBody] = useState("");
  const [rating, updateRating] = useState(0);

  const product = props.product;

  function createReview() {
    axios
      .post(`${POST}/reviews`, {
        data: {
          title,
          body,
          rating,
          product: {
            _id: product._id,
            link: "products",
            display: product.name
          }
        }
      })
      .then(_ => {
        props.getReviews();
        updateTitle("");
        updateBody("");
        updateRating(0);
      });
  }

  return (
    <div>
      <form className="new-review" onSubmit={e => e.preventDefault()}>
        <Rating
          initialRating={rating}
          onChange={value => updateRating(value)}
        />
        <input
          type="text"
          onChange={e => updateTitle(e.target.value)}
          value={title}
          required
        />
        <textarea
          onChange={e => updateBody(e.target.value)}
          value={body}
          required
        />
        <input type="submit" onClick={createReview} value="Add review" />
      </form>
    </div>
  );
}

export default NewReview;
