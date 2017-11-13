import React, {Component} from 'react';
import autobind from 'autobind-decorator';

import Caught from './Caught';
import Edit from './Edit';

export default class App extends Component {
  constructor() {
    super();
    this.state = {showEdit: false};
  }

  render() {
    return (
      <div>
        {this.state.showEdit ? <Edit/> : <Caught />}

        <div className="bottom-link">
          <a onClick={() => this.setState({showEdit: !this.state.showEdit})}>
            edit
          </a>
        </div>
      </div>
    )
  }
}
