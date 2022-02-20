import axios from "axios";
const TOKEN = 'token';

const SET_CART = "SET_CART";
const DELETE_CART = "DELETE_CART";
const UPDATE_CART = "UPDATE_CART";
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";

export const setCart = (cartItems) => {
  return {
    type: SET_CART,
    cartItems,
  };
};

export const deleteCartAction = (cartItem) => {
  return {
    type: DELETE_CART,
    cartItem,
  };
};

export const updateCartAction = (cartItem) => {
  return {
    type: UPDATE_CART,
    cartItem,
  };
};

export const addProductToCartAction = (product) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    product,
  }
}

//THUNK
export const fetchCart = () => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/cart', {
        headers: {
          authorization: token
        }
      });
      dispatch(setCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCart = (productId) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/cart/${productId}`, {
        headers: {
          authorization: token
        }
      });
      dispatch(deleteCartAction(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateCart = (productId, cartItem) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/cart/${productId}`, cartItem, {
        headers: {
          authorization: token
        }
      });
      dispatch(updateCartAction(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProductToCart = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/products/${productId}/${localStorage.currentCartId}`)
      dispatch(addProductToCartAction(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cartItems.products;
    case DELETE_CART:
      //DOUBLE CHECK BELOW!!!!
      return state.filter(
        (products) =>
          products.id !== action.products.id &&
          cartItem.productId !== action.cartItem.productId
      );
    case UPDATE_CART:
      return state.map((cartItem) =>
        cartItem.productId === action.cartItem.productId ? action.cartItem : cartItem
      );
    case ADD_PRODUCT_TO_CART:
      return [...state, action.product];
    default:
      return state;
  }
}
