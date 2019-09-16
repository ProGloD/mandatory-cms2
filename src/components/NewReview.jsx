import React, { useState } from "react";
import axios from "axios";

import { POST } from "../utils/utils";

function NewReview(props) {
  const [title, updateTitle] = useState("");
  const [body, updateBody] = useState("");
  const [rating, updateRating] = useState(3);

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
        updateRating(3);
      });
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="range"
          title={rating}
          onChange={e => updateRating(e.target.value)}
          min="1"
          max="5"
          value={rating}
          required
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
        <input type="submit" onClick={createReview} value="Send" />
      </form>
    </div>
  );
}

export default NewReview;
