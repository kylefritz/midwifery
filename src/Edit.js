import React, {Component} from 'react';

import Thermometer from './Thermometer';
import * as client from './client'

export default class Edit extends Component {
  constructor() {
    super();
    this.state = {babies: 0};
  }
  componentDidMount(){
    client.getBabies().then(()=> this.handleJson())
  }
  handleCaughtOne(){
    client.caughtBaby().then(()=> this.handleJson())
  }
  handleLostOne(){
    client.lostBaby().then(()=> this.handleJson())
  }
  handleJson({babies}) {
    console.log(`KJ has caught ${babies} babies!!`)
    this.setState({babies})
  }
  render() {
    const {babies} = this.state;
    if(!babies) {
      return <h4>Loading...</h4>;
    }

    return (
      <div>
        <h1>Total Caught: {babies}</h1>
        <br/>
        <button onClick={this.handleCaughtOne}>I caught one!</button>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <button onClick={this.handleLostOne}>Oops, subtract one.</button>
       </div>
    )
  }
}
