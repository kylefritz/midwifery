import React, { Component } from 'react';
import Kj from './Kj';
import Ljf from './Ljf';

export default class App extends Component {
  state = {
    // kjMode: true
    kjMode: false
  }

  handleMode = () => {
    this.setState({
      kjMode: !this.state.kjMode
    })
  }

  render() {
    return (
      <div>
        {this.state.kjMode
          ?
            <Kj
              handleMode = {this.handleMode}
            />
          :
            <Ljf
              handleMode = {this.handleMode}
            />
        }
      </div>
    )
  }
}
