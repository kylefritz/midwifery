import React, { Component } from 'react';
import * as client from './client';

export default class Ljf extends Component {
  state = {
    updates: [],
    reacts: [],
  }

  cleanData = (messages) => {
    return messages
      .filter(message => message.body.length > 0)
      .sort((a, b) => a.time < b.time ? -1 : 1)
  }

  getData = () => {
    client.getEmojis()
      .then((response) => {
        this.setState({
          updates: this.cleanData(response.parents),
          reacts: this.cleanData(response.fans),
        })
      })
  }

  componentDidMount() {
    this.getData();
    setInterval(() => this.getData(), 3000);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.updates.length !== this.state.updates.length){
      setTimeout(() => {
        this.latestUpdate.scrollIntoView({ behavior: "smooth" })
      }, 100);
    }
    if(prevState.reacts.length !== this.state.reacts.length){
      setTimeout(() => {
        this.latestReact.scrollIntoView({ behavior: "smooth" })
      }, 100);
    }
  }

  render() {
    return (
      <div>
        <div className="ljf header">
          Labor Watch!
        </div>

        <div className="ljf small padded">
          Live updates ({this.state.updates.length === 0 ? "." : this.state.updates.length })
        </div>

        <div className="ljf top padded">
          {this.state.updates.map((message, i) => {
            let ruby_time = message.time
            let grab_year = ruby_time.slice(0,4)
            let grab_month = ruby_time.slice(5,7) - 1
            let grab_date = ruby_time.slice(8,10)
            let grab_hour = ruby_time.slice(11,13)
            let utc = new Date(Date.UTC(grab_year, grab_month, grab_date, grab_hour));
            let month = utc.getMonth() + 1
            let date = utc.getDate()
            let full_hour = utc.getHours()
            let hour = full_hour === 0
                    ? 12
                    : full_hour > 12
                      ? full_hour - 12
                      : full_hour
            let min =  ruby_time.slice(14,16)
            let half = full_hour > 11 ? 'p' : 'a'
            return (
              <div
                key={i}
                ref={(element) => {
                  if(this.state.updates.length - 1 === i) {
                    this.latestUpdate = element
                  }
                }}
              >
                <span className="ljf big">
                  {message.body}
                </span>
                <span className="ljf small right">
                  {hour}:{min}{half} {month}/{date}
                </span>
              </div>
            )
          })}
        </div>

        <div className="ljf small padded">
          Reacts ({this.state.reacts.length === 0 ? "." : this.state.reacts.length })
        </div>

        <div className="ljf bottom padded">
          {this.state.reacts.map((message, i) => {
            let lastFour = message.from.substring(message.from.length - 4, message.from.length)
            let id = lastFour === '0079' ? "_KJ_" : lastFour
            let idCss = lastFour === '0079' ? "ljf kj" : ""
            let betCss = message.body.match(/#bet/ig) ? "ljf bet" : ""
            let css = `${betCss} ${idCss}`

            let ruby_time = message.time
            let grab_year = ruby_time.slice(0,4)
            let grab_month = ruby_time.slice(5,7) - 1
            let grab_date = ruby_time.slice(8,10)
            let grab_hour = ruby_time.slice(11,13)
            let utc = new Date(Date.UTC(grab_year, grab_month, grab_date, grab_hour));
            let month = utc.getMonth() + 1
            let date = utc.getDate()
            let full_hour = utc.getHours()
            let hour = full_hour === 0
                    ? 12
                    : full_hour > 12
                      ? full_hour - 12
                      : full_hour
            let min =  ruby_time.slice(14,16)
            let half = full_hour > 11 ? 'p' : 'a'

            let blue = message.from.slice(2,5)/999*100
            let green = message.from.slice(5,8)/999*100
            let red = message.from.slice(8,12)/9999*100
            let color = `rgb( ${red}%, ${green}%, ${blue}% )`
            return (
              <div
                key={i}
                className={css}
                ref={(element) => {
                  if(this.state.reacts.length - 1 === i) {
                    this.latestReact = element
                  }
                }}
              >
                <span className="ljf medium">
                  {message.body}
                </span>
                <span className="ljf small right">
                  {hour}:{min}{half} {month}/{date}&nbsp;<span style={{color: color}}>☎-{id}</span>
                </span>
              </div>
            )
          })}
        </div>

        <div className="ljf small padded">
          Send emojis for Laura to (812) 5-PUSH-IT <a href="sms:18125787448" className="under">(812) 578-7448</a>!

          <br/><br/>

          Include <a href="sms:18125787448&body=#bet " className="ljf bet">#bet</a> to wager on weight, phenotypic sex, etc.

          <br/><br/>

          <span
            className="under"
            onClick={this.props.handleMode}
          >
            kj count!
          </span>
        </div>

      </div>
    )
  }
}
