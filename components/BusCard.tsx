import React, { Component } from 'react';
import styled from 'styled-components';


class BusCard extends Component {    

  render () {
    const { bus } = this.props;

    let icon = '../static/img/bus/normal.png';
    let info = '';
    let subInfo = '';
    if (bus.twin) { 
      icon = '../static/img/bus/twin.png'; 
      info = 'ツインライナー';
    }
    if (bus.via === 'sasakubo') {
      icon = '../static/img/bus/sasakubo.png';
      info = '笹久保経由';
    }
    if (bus.type==='night') {
      icon = '../static/img/bus/night.png';
      info = '深夜料金';
    }
    subInfo = bus.rotary?'ロータリー発':'';
    const time = {hour: bus.h, minute: bus.m};

    return (
      <Wrapper>
        <div className="bus-card">
          <img src={icon} alt="bus-icon" />
          <span className="time-container">
            <span className="time hour">
              {('00'+time.hour).slice(-2)}
            </span>
            <span className="time colon">
            :
            </span>
            <span className="time minute">
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
  font-family: "ＭＳ ゴシック",sans-serif;

  .bus-card {
    padding: 20px;
    border-top: 1px solid #707070; 
    border-bottom: 1px solid #707070;
  }

  .bus-icon {
    padding: 10px;
  }

  .time-container {
    padding: 10px;
  }

  .time {
    color: #707070;
    font-size: 30px;
    padding: 2px;
  }

  .info {
    color: #707070;
    padding: 10px;
  }

  .sub-info {
    color: #707070;
    padding: 10px;
  }

`;

export default BusCard;
