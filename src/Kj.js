import React, { Component } from 'react';
import Caught from './Caught';
import Edit from './Edit';

export default class Kj extends Component {
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
          <span className="under" onClick={this.props.handleMode}>
            labor watch!
          </span>
          &nbsp;&nbsp;&nbsp;
          <span href="" className="under" onClick={this.handleEdit}>
            edit
          </span>
        </div>
      </div>
    )
  }
}
