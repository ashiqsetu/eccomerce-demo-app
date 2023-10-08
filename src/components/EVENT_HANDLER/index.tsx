import React, { Component } from 'react'

export default class EVENT_HANDLER extends Component {

  state = {
    changedValue: ''
  }

  handleChange = (e: any) => {
    this.setState({
      changedValue: e.target.value
    }, () => {
      console.log(this.state.changedValue)
    })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange} type="text" />
        <p>{this.state.changedValue}</p>
      </div>
    )
  }
}
