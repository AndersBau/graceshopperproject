import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";
import { removeProduct } from "../store";
export class AdminPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        return (
            <div className="admin-page">
                {this.props.products.map((product) => {
                    return (
                        <div key={product.id}>
                            <div>
                                <Link to='/add-product'> Add a Product</Link>
                            </div>
                            <Link to={`/products/${product.id}`}>
                                <img src={product.imageUrl}></img>
                            </Link>
                            <h2>{product.name}</h2>

                            <h2>Price:{product.price}</h2>
                            <Link to={`/updateproduct/${product.id}`}>
                                <button>Update</button>{" "}
                            </Link>
                            <button onClick={() => this.props.removeProduct(product.id)}>
                                Delete
                            </button>
                        </div>
                    );
                })}
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
    removeProduct: (id) => dispatch(removeProduct(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
