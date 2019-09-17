import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { URL, GET, LIMIT } from "../utils/utils";
import "../style/Home.css";

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
        updateMaxpage(Math.round(res.data.total / LIMIT));
      });
  }, [query, checked, page]);

  return (
    <div className="main">
      <div className="main-search">
        <span className="search-icon">
          <i className="material-icons">search</i>
        </span>
        <input
          className="search"
          type="text"
          onChange={e => updateQuery(e.target.value)}
          placeholder="Search..."
          value={query}
        />
      </div>

      <div>
        <span>In stock only </span>
        <input
          type="checkbox"
          onChange={e => updateChecked(e.target.checked)}
          checked={checked}
        />
      </div>

      <div className="products-list">
        {products.map(product => (
          <Link
            className="products-list__item"
            to={`/product/${product._id} `}
            key={product._id}
          >
            <h3>{product.name}</h3>
            <img src={`${URL}/${product.images[0].path}`} alt={product.name} />
            <p>Price: {product.price}€</p>
          </Link>
        ))}
      </div>

      <div className="pagination">
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
