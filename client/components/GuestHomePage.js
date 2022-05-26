import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const GuessHomePage = () => {
  return (
    <div className="grid-container">
      <header>
        <Navbar/>
      </header>

      <div className="main">
        <Link to="/products">
          <div id="products"> Products </div>
        </Link>
      </div>
    </div>
  );
};

export default GuessHomePage;
