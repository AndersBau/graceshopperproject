import React from 'react'
import {connect} from 'react-redux'
import {authSignUp} from '../store'

/**
 * COMPONENT
 */
const SignUpForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="fName">
            <small>First Name</small>
          </label>
          <input name="fName" type="text" />
        </div>
        <div>
          <label htmlFor="lName">
            <small>Last Name</small>
          </label>
          <input name="lName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>E-mail</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="address">
            <small>Address</small>
          </label>
          <input name="address" type="text" />
        </div>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const fName = evt.target.fName.value
      const lName = evt.target.lName.value
      const email = evt.target.email.value
      const address = evt.target.address.value
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authSignUp(username, password, fName, lName, email, address))
    }
  }
}
export const Signup = connect(mapSignup, mapDispatch)(SignUpForm)
