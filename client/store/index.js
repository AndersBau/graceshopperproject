import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import products from "./products";
import singleProduct from "./singleProduct";
import admin from "./admin";
import cart from "./cart";
import checkout from "./checkout";

const reducer = combineReducers({ auth, products, singleProduct, admin, cart, checkout });

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./products";
export * from "./singleProduct";
export * from "./admin";
export * from "./cart";
export * from "./checkout";
