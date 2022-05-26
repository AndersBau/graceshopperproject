import React from "react";
import { connect } from "react-redux";
import { fetchCart, updateCart } from "../store/cart";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
export class Cart extends React.Component {
  constructor(props) {
    super(props);

    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
      this.props.fetchCart();
  }

  componentWillUnmount() {
    console.log('I SHOULD NOT BE HERE')
  }



  //  handleSubmit(evt) {
  //     evt.preventDefault();
  //     this.props.updateCart(
  //       this.props.match.params.cartId,
  //       this.props.match.params.productId
  //     );
  //     this.props.fetchCart(this.props.match.params.cartId);
  //   }

  render() {
    //console.log('+++++++++PROPS: ', this.props)
    //console.log('THIS.STATE: ///////', this.state.quantity);
    console.log(this.props.cartItems)
    return (

      <div className="grid_container">
      <header>
        <Navbar/>
      </header>
        <div className="cart" id="cart">
          {this.props.cartItems.map((cartItem) => {
            return (
              <div key={cartItem.productId}>
                <img src={cartItem.imageUrl}></img>
                <h2>{cartItem.name}</h2>
                <h2>Price: {cartItem.price}</h2>
                <h2>Quantity: {cartItem.cartItem.quantity}</h2>
                <form
                  id="update-quantity"
                  onSubmit={(evt) => {
                    evt.preventDefault();
                    this.props.updateCart(cartItem.id, cartItem.cartItem);
                  }}
                >
                  <label htmlFor="quantity"></label>
                  <input
                    value={cartItem.cartItem.quantity}
                    onChange={(evt) => { cartItem.cartItem.quantity = evt.target.value}}
                  />
                  <button type="submit">Update Quantity</button>
                </form>
              </div>
            );
          })}
          <Link to={'/cart/checkout'}><button className="checkoutBtn">Checkout</button></Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  updateCart: (productId, cartItem) => dispatch(updateCart(productId, cartItem)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

