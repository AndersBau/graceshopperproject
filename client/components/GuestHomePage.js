import React from "react";
import { Link } from "react-router-dom";

const GuessHomePage = () => {
  return (
    <div className="grid-container">
      <div className="home_header">
        <Link to="/products">
          <h2>Shop Now</h2>
        </Link>
      </div>

      <div className="home_products">
        <Link to="/products">
          <div id="products"> Products </div>
        </Link>

        <Link to="/products">
          <div id="products"> Products </div>
        </Link>

        <Link to="/products">
          <div id="products"> Products </div>
        </Link>

        <Link to="/products">
          <div id="products"> Products </div>
        </Link>
      </div>
    </div>
  );
};

export default GuessHomePage;
