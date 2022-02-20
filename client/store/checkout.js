import axios from "axios";
import history from "../history";
const TOKEN = 'token';

const FETCH_CHECKOUT = "FETCH_CHECKOUT";


export const fetchCheckout = (cart) => {
  return {
    type: FETCH_CHECKOUT,
    cart,
  };
};


export const checkout = () => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/cart/checkout', {
        headers: {
          authorization: token
        }
      });
      dispatch(fetchCheckout(data));
    } catch (error) {
      console.log(error);
    }
  };
};


export default function (state = [], action) {
  switch (action.type) {
    case FETCH_CHECKOUT:
      const totalPrice = action.cart.products.reduce((totalVal, currentVal) =>  currentVal.price + totalVal.price)
      return totalPrice;
    default:
      return state;
  }
}
