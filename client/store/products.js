import axios from "axios";
import history from "../history";

const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const setAddProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (product, history) => {
  return async (dispatch) => {
    try {
      //console.log("in thunk");
      const { data } = await axios.post("/api/products", product);
      dispatch(setAddProduct(data));
      history.push("/products");
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
