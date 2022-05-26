import React from 'react'
import {connect} from 'react-redux'
import GuestHomePage from './GuestHomePage'
/**
 * COMPONENT
 */
export const Home = props => {

  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <GuestHomePage />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    id: state.auth.id
  }
}

export default connect(mapState)(Home)
