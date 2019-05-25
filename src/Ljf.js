import React, { Component } from 'react';
import * as client from './client';

export default class Ljf extends Component {
  state = {
    parents: [],
    fans: [],
  }

  getData = () => {
    client.getEmojis()
    .then((response) => {
      this.setState({
        parents: response.parents
          .filter(message => message.body.length > 0)
          .sort((a, b) => a.time < b.time ? -1 : 1),
        fans: response.fans
          .filter(message => message.body.length > 0)
          .sort((a, b) => a.time < b.time ? -1 : 1),
      })
    })
  }

  componentDidMount() {
    this.getData();
    setInterval(() => this.getData(), 3000);
  }

  render() {
    return (
      <div>
        <div className="ljf header">
          Labor Watch!
        </div>

        <div className="ljf small padded">
          Live updates ({this.state.parents.length === 0 ? "." : this.state.parents.length })
        </div>

        <div className="ljf top padded">
          {this.state.parents.map((message, i) => {
            let ruby_time = message.time
            let military_hour = ruby_time.slice(11,13)
            let hour = military_hour === 0
                    ? 12
                    : military_hour > 12
                      ? military_hour - 12
                      : military_hour
            let min = ruby_time.slice(14,16)
            let half = military_hour > 11 ? 'p' : 'a'
            let full_month = ruby_time.slice(5,7)
            let month = full_month.charAt(0) === '0'
              ? full_month.slice(1)
              : full_month
           let full_date = ruby_time.slice(8,10)
            let date = full_date.charAt(0) === '0'
              ? full_date.slice(1)
              : full_date
            return <div key={i}>
              <span className="ljf big">
                {message.body}
              </span>
              <span className="ljf small right">
                {hour}:{min}{half} {month}/{date}
              </span>
            </div>
          })}
        </div>

        <div className="ljf small padded">
          Reacts ({this.state.fans.length === 0 ? "." : this.state.fans.length })
        </div>

        <div className="ljf bottom padded">
          {this.state.fans.map((message, i) => {
            let ruby_time = message.time
            let military_hour = ruby_time.slice(11,13)
            let hour = military_hour === 0
                    ? 12
                    : military_hour > 12
                      ? military_hour - 12
                      : military_hour
            let min = ruby_time.slice(14,16)
            let half = military_hour > 11 ? 'p' : 'a'
            let full_month = ruby_time.slice(5,7)
            let month = full_month.charAt(0) === '0'
              ? full_month.slice(1)
              : full_month
           let full_date = ruby_time.slice(8,10)
            let date = full_date.charAt(0) === '0'
              ? full_date.slice(1)
              : full_date
            return <div key={i}>
              <span className="ljf medium">
                {message.body}
              </span>
              <span className="ljf small right">
                {hour}:{min}{half} {month}/{date}&nbsp;☎-{message.from.substring(message.from.length - 4, message.from.length)}
              </span>
            </div>
          })}
        </div>

        <div className="ljf small padded">
          <span>
            Send emojis for Laura to (812) 5-PUSH-IT <span className="ljf under">(812) 578-7448</span>!
          </span>
          <br/><br/>
          <span className="ljf under"onClick={this.props.handleMode}>
            kj count!
          </span>
        </div>

      </div>
    )
  }
}
