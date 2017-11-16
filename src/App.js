import React, {Component} from 'react';

import Caught from './Caught';
import Edit from './Edit';

export default class App extends Component {
  constructor() {
    super();
    this.state = {showEdit: false};
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e){
    e.preventDefault();
    this.setState({showEdit: !this.state.showEdit});
  }

  render() {
    return (
      <div>
        {this.state.showEdit ? <Edit/> : <Caught />}

        <div className="bottom-link">
          <a href onClick={this.handleEdit}>
            edit
          </a>
        </div>
      </div>
    )
  }
}
