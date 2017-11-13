import React, {Component} from 'react';

import Thermometer from './Thermometer';
import * as client from './client'

export default class Edit extends Component {
  constructor() {
    super();
    this.state = {babies: 0};

    this.handleJson = this.handleJson.bind(this);
    this.handleCaughtOne = this.handleCaughtOne.bind(this);
    this.handleLostOne = this.handleLostOne.bind(this);
  }
  componentDidMount(){
    client.getBabies().then(this.handleJson);
  }
  handleCaughtOne(){
    client.caughtBaby().then(this.handleJson);
  }
  handleLostOne(){
    client.lostBaby().then(this.handleJson);
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
        <div className="grid">
          <button className="button -green" onClick={this.handleCaughtOne}>I caught one!</button>
          <button className="button -dark" onClick={this.handleLostOne}>Oops, subtract one.</button>
        </div>
       </div>
    )
  }
}
