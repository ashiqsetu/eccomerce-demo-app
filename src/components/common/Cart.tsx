import React, { Component } from 'react'

export default class Cart extends Component {

    state = {
      cartCount: 0
    }

    handleCartIncrement = () => {
      this.setState({
        cartCount: this.state.cartCount + 1
      })
    }

    handleCartDecrement = () => {
      this.setState({
        cartCount: this.state.cartCount - 1
      })
    }

    handleCartReset = () => {
      this.setState({
        cartCount: 0
      })
    }

  render() {
    const {cartCount} = this.state
    return (
      <div>
        <h1>cartCount: {cartCount}</h1>
        <button onClick={this.handleCartIncrement} disabled={cartCount === 5 ? true : false} type='button'>+</button>
        <button onClick={this.handleCartDecrement} disabled={cartCount === 0 ? true : false} type='button'>-</button>
        <button onClick={this.handleCartReset} disabled={cartCount < 1 ? true : false} type='button'>Reset</button>
      </div>
    )
  }
}

