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
        <div className="time-container">
          <span className="time-hour">
            {('00'+time.hour).slice(-2)}
          </span>
          :
          <span className="time-minute">
            {('00'+time.minute).slice(-2)}
          </span>
        </div>
        <img src={icon} alt="bus-icon" />
        <div className="info">
          {info}
        </div>
        <div className="sub-info">
          {subInfo}
        </div>
      </div>
    )
  }
}

export default BusCard;
