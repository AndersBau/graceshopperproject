import axios from "axios";
import history from "../history";

const SET_SINGLE_PRODUCT = "SET_SINGLE_PRODUCT";

export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};


export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};


export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
