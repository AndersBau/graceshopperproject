import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
export class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className="grid_container">
        <header>
          <Navbar/>
        </header>
        <div id="product-list">
          {this.props.products.map((product) => {
            return (
              <div className='posters_product' key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img className="product-image" src={product.imageUrl}></img>
                </Link>
                <h2>{product.name}</h2>

                <h2>Price:{product.price}</h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
