import React, { Component } from 'react';


class BusCard extends Component {    

  render () {
    const {
      icon,
      time,
      info,
      subInfo
    } = this.props;

    return (
      <div className="bus-card">
        <span className="time-container">
          <span className="time-hour">
            {('00'+time.hour).slice(-2)}
          </span>
          :
          <span className="time-minute">
            {('00'+time.minute).slice(-2)}
          </span>
        </span>
        <img src={icon} alt="bus-icon" />
        <span className="info">
          {info}
        </span>
        <span className="sub-info">
          {subInfo}
        </span>
      </div>
    )
  }
}

export default BusCard;
