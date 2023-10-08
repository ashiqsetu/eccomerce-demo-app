import React, { Component } from 'react'
import HomePage from './HomePage';
import LoginPage from './LoginPage';

class CONDITIONAL_RENDERING extends Component {

    state = {
        isLoggedIn: true
    }

  render() {

    // let page = this.state.isLoggedIn ? <HomePage/> : <LoginPage/>;

    return (
        <div>
            {/* { page } */}
            {this.state.isLoggedIn ? <HomePage/> : <LoginPage/>}
        </div>
    )

  }
}
export default CONDITIONAL_RENDERING;