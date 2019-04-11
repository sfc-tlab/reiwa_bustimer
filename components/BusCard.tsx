import React, { Component } from 'react';
import styled from 'styled-components';


class BusCard extends Component {    

  render () {
    const {
      icon,
      time,
      info,
      subInfo
    } = this.props;

    return (
      <Wrapper>
        <div className="bus-card">
          <img src={icon} alt="bus-icon" />
          <span className="time-container">
            <span className="time-hour">
              {('00'+time.hour).slice(-2)}
            </span>
            :
            <span className="time-minute">
              {('00'+time.minute).slice(-2)}
            </span>
          </span>
          <span className="info">
            {info}
          </span>
          <span className="sub-info">
            {subInfo}
          </span>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
`;

export default BusCard;
