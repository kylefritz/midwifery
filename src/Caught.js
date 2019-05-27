import React, {Component} from 'react';
import randomColor from 'randomcolor';

import Thermometer from './Thermometer';
import Loader from './Loader';
import * as client from './client';

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
      return <Loader />
    }
    const newBabies = babies - prevBabies;
    return (
      <div className="caught-container">
        <div className="grid">
          <Thermometer
            value={this.state.babies}
            max={100}

            theme={'dark'}
            format={''}
            steps={10}
            size={'large'}
            height={400}
           />
          <h1>
            <T>Catch</T> <T>Those</T> <T>Babies</T> <T>KJ</T> <T>!</T> <T>!</T>
          </h1>
       </div>
       <br/>
       {[...Array(this.state.babies)].map((n, i) =>
        <span key={i}>
          {i === 84
            ? "🐟"
            : ["👶🏻", "👶🏼", "👶🏽", "👶🏾"][Math.floor(Math.random()*4)]
          }
        </span>
       )}
       {newBabies > 0 && (
         <div style={{marginTop: '16px', fontSize: 'larger', textAlign: 'center'}}>
           Caught since you last checked:
           <br/><T style={{fontSize: 'x-large'}}>{newBabies}</T>
         </div>
       )}
      </div>
    )
  }
}
