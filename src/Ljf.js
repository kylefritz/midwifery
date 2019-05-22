import React, { Component } from 'react';
import * as client from './client';

export default class Ljf extends Component {
  state = {
    parents: [],
    fans: [],
  }

  componentDidMount() {
    setInterval(() =>
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
    , 3000);
  }

  render() {
    return (
      <div>
        <div className="ljf header">
          Labor Watch
        </div>

        <div className="ljf small padded">
          Live updates ({this.state.parents.length === 0 ? "." : this.state.parents.length })
        </div>

        <div className="ljf top padded">
          {this.state.parents.map((message, i) =>
            <div key={i}>
              <span className="ljf big">
                {message.body}
                {/* {message.body.replace(/[A-Za-z0-9]/g, '')} */}
              </span>
              <span className="ljf small right">
                {
                  new Date(message.time).getHours() === 0
                    ? 12
                    : new Date(message.time).getHours() > 12
                      ? new Date(message.time).getHours() - 12
                      : new Date(message.time).getHours()
                }:{
                  new Date(message.time).getMinutes()
                }{
                  new Date(message.time).getHours() > 11 ? 'p' : 'a'
                }
              </span>
            </div>
          )}
        </div>

        <div className="ljf small padded">
          Reacts ({this.state.fans.length === 0 ? "." : this.state.fans.length })
        </div>

        <div className="ljf bottom padded">
          {this.state.fans.map((message, i) =>
            <div key={i}>
              <span className="ljf medium">
                {/* {message.body} */}
                {message.body.replace(/[A-Za-z0-9]/g, '')}
              </span>
              <span className="ljf small right">
                {
                  new Date(message.time).getHours() === 0
                    ? 12
                    : new Date(message.time).getHours() > 12
                      ? new Date(message.time).getHours() - 12
                      : new Date(message.time).getHours()
                }:{
                  new Date(message.time).getMinutes() < 10
                    ? '0' + new Date(message.time).getMinutes()
                    : new Date(message.time).getMinutes()
                }{
                  new Date(message.time).getHours() > 11 ? 'p' : 'a'
                }
                &nbsp;☎-{message.from.substring(message.from.length - 4, message.from.length)}

              </span>
            </div>
          )}
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
