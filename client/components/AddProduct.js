import React from "react";
import { connect } from "react-redux";
import { addProduct } from "../store/products";

export class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
      productType: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addProduct({ ...this.state });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
          required
        ></input>
        <label htmlFor="price">Price:</label>
        <input
          name="price"
          onChange={this.handleChange}
          value={this.state.price}
          required
        ></input>
        <label htmlFor="description">Description</label>
        <input
          name="description"
          onChange={this.handleChange}
          value={this.state.description}
          required
        ></input>
        <label htmlFor="imageUrl">Image</label>
        <input
          name="imageUrl"
          onChange={this.handleChange}
          value={this.state.imageUrl}
          required
        ></input>
        <label htmlFor="productType">Product Type</label>
        <input
          name="productType"
          onChange={this.handleChange}
          value={this.state.productType}
          required
        ></input>
        <br></br>
        <button type="submit">Submit Product</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addProduct: (product) => dispatch(addProduct(product, history)),
  };
};

export default connect(null, mapDispatchToProps)(AddProduct);
