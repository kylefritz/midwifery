import React, {Component} from 'react';

import Thermometer from './Thermometer';
import * as client from './client';
import randomColor from 'randomcolor';

const T = ({children, style={}}) => (
  <span style={{color: `${randomColor({luminosity: 'light'})}`, ...style}}>
    {children}
  </span>
)

export default class Caught extends Component {
  constructor() {
    super();
    const prevBabies = parseInt(localStorage.getItem('prevBabies'), 10)
    this.state = {babies: 0, prevBabies};
  }
  componentDidMount(){
    client.getBabies().then(({babies}) => {
      console.log(`KJ has caught ${babies} babies!!`)
      this.setState({babies})

      localStorage.setItem('prevBabies', babies)
    })
  }

  render() {
    const {babies, prevBabies} = this.state;
    if(!babies) {
      return <h4>Loading...</h4>;
    }
    const newBabies = babies - prevBabies;
    return (
      <div>
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
            <h1>
              <T>Catch</T> <T>Those</T> <T>Babies</T> <T>KJ</T> <T>!</T> <T>!</T>
            </h1>
          </div>
       </div>
       {newBabies > 0 && (
         <div style={{marginTop: '16px', marginLeft: '60px', fontSize: 'larger'}}>
           Caught since you last checked: <T style={{fontSize: 'x-large'}}>{newBabies}</T>
         </div>
       )}
      </div>
    )
  }
}
