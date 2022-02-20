
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login } from './components/AuthForm';
import { Signup } from './components/SignUpForm'
import Home from './components/Home';
import { me } from './store'
import  Products  from './components/Products';
import GuestHomePage from './components/GuestHomePage';
import SingleProduct from "./components/SingleProduct";
import AdminPage from './components/AdminPage';
import UpdateProduct from './components/UpdateProduct';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>

            <Route path="/home" component={Home} />
            <Route exact path ="/products" component={Products}/>
            <Route path="/admin" component={AdminPage}/>
            <Route path="/products/:productId" component={SingleProduct}/>
            <Route path="/updateproduct/:id" component={UpdateProduct} />
            <Route exact path="/add-product" component={AddProduct} />
            <Route exact path="/cart/" component={Cart} />
            <Route path="/cart/checkout/" component={Checkout} />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={GuestHomePage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={GuestHomePage} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:productId" component={SingleProduct}/>
            <Route path="/cart/checkout/" component={Checkout} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
