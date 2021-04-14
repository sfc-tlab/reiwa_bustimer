import React, { Component } from "react";
import styled from "styled-components";
import { Bus } from "../types";
import TweetButton from "./TweetButton";
import LineButton from "./LineButton";

type prop = {
  bus: Bus
}

class BusCard extends Component<prop> {
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

          <TweetButton
            text={
              String(time.hour) +
              "時" +
              String(time.minute) +
              "分" +
              "発のバスに乗るよ！"
            }
            hashtags={"bustimer,sfc"}
          />
          <LineButton
            text={
              String(time.hour) +
              "時" +
              String(time.minute) +
              "分" +
              "発のバスに乗るよ！"
            }
          />
        </div>
      </Wrapper>
    );
  }
}

const getIconColor = props => {
  if (props.twin) {
    return "#FF3B48";
  } else if (props.via === "sasakubo") {
    return "#197F00";
  } else if (props.type === "night") {
    return "#8000AD";
  } else {
    return "#FF7F2C";
  }
};

type Wrap = {
  bus: Bus,
  hasSubinfo: boolean,
}

const Wrapper = styled.div<Wrap>`
  font-family: "ＭＳ ゴシック", sans-serif;
  background: #ffffff;

  .bus-card {
    display: flex;
    align-items: center;
    margin: 0px 15px;
    padding: 10px 0;
    justify-content: space-between;
  }

  .color {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: ${props => getIconColor(props.bus)};
  }

  .time-container {
    padding: 0 10px;
  }

  .time {
    color: #707070;
    font-weight: bold;
    font-size: 30px;
    padding: 2px;
  }

  .info {
    min-width: 80px;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #707070;
  }

  .info-text {
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
    background-color: #f2f2f2;
    display: block;
    padding: 0 5px;
    border-radius: 5px;
  }

  .sub-info-text {
    ${props =>
      props.hasSubinfo
        ? `
    display: inline-block;
    `
        : `
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
