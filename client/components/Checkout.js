import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { checkout } from "../store/checkout";
import store from "../store";
export class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.checkout()

  }

  componentWillUnmount() {
  }

  render() {
    const { totalPrice } = this.props

    return (
      <div className="checkout">
         <div className="checkou_info">
           <h1>Check Out</h1>
            <h3>Yor Total is : {totalPrice}</h3>
            <button className="finalizeTransaction"
            // onClick={() => this.props.Checkout(this.props.cart)}
            >
            Finanlize Transaction
          </button>
         </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
    totalPrice: state.checkout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: () => dispatch(checkout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
