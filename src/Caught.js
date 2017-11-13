import React, {Component} from 'react';

import Thermometer from './Thermometer';
import * as client from './client'

export default class Caught extends Component {
  constructor() {
    super();
    this.state = {babies: 0};
  }
  componentDidMount(){
    client.getBabies().then(({babies}) => {
      console.log(`KJ has caught ${babies} babies!!`)
      this.setState({babies})
    })
  }

  render() {
    const {babies} = this.state;
    if(!babies) {
      return <h4>Loading...</h4>;
    }

    return (
      <div className="grid">
        <div className="thermometer-container">
          <Thermometer
            value={this.state.babies}
            max={40}

            theme={'dark'}
            format={''}
            steps={4}
            size={'large'}
            height={400}
           />
        </div>

        <div>
          <h1>Catch Those Babies KJ!!</h1>
        </div>
       </div>
    )
  }
}
