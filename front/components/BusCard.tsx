import React, { Component } from "react";
import styled from "styled-components";

class BusCard extends Component {
  render() {
    const { bus } = this.props;

    let info = "湘23";
    let subInfo = "";
    if (bus.twin) {
      info = "TwinLiner";
    }
    if (bus.via === "sasakubo") {
      info = "笹久保経由";
    }
    if (bus.type === "night") {
      info = "深夜料金";
    }
    subInfo = bus.rotary ? "ロータリー発" : "";
    const time = { hour: bus.h, minute: bus.m };

    return (
      <Wrapper bus={bus} hasSubinfo={subInfo != ""}>
        <div className="bus-card">
          <span className="color"></span>
          <span className="info">
            <span className="info-text">{info}</span>
            <span className="sub-info-text">{subInfo}</span>
          </span>
          <span className="time-container">
            <span className="time hour">{("00" + time.hour).slice(-2)}</span>
            <span className="time colon">:</span>
            <span className="time minute">
              {("00" + time.minute).slice(-2)}
            </span>
          </span>
        </div>
      </Wrapper>
    );
  }
}

const getIconColor = props => {
  if (props.twin) {
    return "#FF3B48";
  } else {
    return "#E28549";
  }
};

const Wrapper = styled.div`
  font-family: "ＭＳ ゴシック", sans-serif;
  background: #ffffff;

  .bus-card {
    display: flex;
    align-items: center;
    margin: 0px 15px;
  }

  .color {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${props => getIconColor(props.bus)};
  }

  .time-container {
    padding: 10px;
  }

  .time {
    color: #707070;
    font-weight: bold;
    font-size: 30px;
    padding: 2px;
  }

  .info {
    min-width: 100px;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #707070;
    padding: 10px;
  }

  .info-text {
    font-size: 14px;
    line-height: 20px;
    background-color: #f2f2f2;
    display: block;
    padding: 0 5px;
    border-radius: 5px;
  }

  .sub-info-text {
    ${props =>
      props.hasSubinfo ? `
    display: inline-block;
    ` : `
    display: none;
    `}
    font-size: 8px;
    padding: 5px;
  }

  .sub-info {
    color: #707070;
    padding: 10px;
  }
`;

export default BusCard;
