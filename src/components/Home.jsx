import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { URL, GET, LIMIT } from "../utils/utils";

function Home() {
  const [products, updateProducts] = useState([]);
  const [query, updateQuery] = useState("");
  const [checked, updateChecked] = useState(false);
  const [page, updatePage] = useState(1);
  const [maxpage, updateMaxpage] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${GET}/products?filter[name][$regex]=${query}${
          checked ? "&filter[in_stock]=true" : ""
        }&sort[name]=1&limit=${LIMIT}&skip=${LIMIT * page - LIMIT}`
      )
      .then(res => {
        updateProducts(res.data.entries);
        updateMaxpage(Math.floor(res.data.total / LIMIT) + 1);
      });
  }, [query, checked, page]);

  return (
    <div>
      <div>
        <span>Search: </span>
        <input
          type="text"
          onChange={e => updateQuery(e.target.value)}
          value={query}
        />
      </div>

      <div>
        <span>In stock: </span>
        <input
          type="checkbox"
          onChange={e => updateChecked(e.target.checked)}
          checked={checked}
        />
      </div>

      <div>
        {products.map(product => (
          <div key={product._id}>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
            <img src={`${URL}/${product.images[0].path}`} alt={product.name} />
            <p>Price: {product.price}€</p>
          </div>
        ))}
      </div>

      <div>
        <button onClick={() => (page > 1 ? updatePage(page - 1) : null)}>
          &lt;
        </button>
        <span>{page}</span>
        <button onClick={() => (page < maxpage ? updatePage(page + 1) : null)}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Home;
