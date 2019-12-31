import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";

@inject("store")
@observer
class ProgressBar extends Component {
  render() {
    const { store, pos } = this.props;

    let progressSec = 0;
    let maxSec = 100;

    if (store.leftBuses.length) {
      progressSec = store.leftTime.m * 60 + store.leftTime.s;

      if (progressSec < 60) {
        // 1分以下
        maxSec = 60;
      } else if (progressSec < 300) {
        // 5分以下
        maxSec = 300;
      } else if (progressSec < 600) {
        // 10分以下
        maxSec = 600;
      } else if (progressSec < 1800) {
        // 30分以下
        maxSec = 1800;
      } else if (progressSec < 3600) {
        // 60分以下
        maxSec = 3600;
      } else {
        progressSec = 0;
      }

      console.log(`now progress: ${progressSec} / ${maxSec}`);
    }

    return (
      <Wrapper>
        <img
          className="icon ayase-base"
          src={"/static/img/ayase-base.svg"}
          alt="□"
        />
        <Bar progress={progressSec} max={maxSec} className="progress-bar">
          <span className="mask">
            <img
              className="progress-icon"
              src={"/static/img/pin-bus.svg"}
              alt="busstop-icon"
            />
          </span>
        </Bar>
        <img
          className="icon icon-busstop"
          src={"/static/img/icon-busstop.svg"}
          alt="○"
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.span`
  display: flex;
  align-items: flex-end;

  .icon {
    width: 20px;
  }
`;

const getProgressPct = (progress: Number, max: Number) => {
  let progressPct = (progress / max) * 100;

  return progressPct;
};

const Bar = styled.div`
  position: relative;
  margin: 0 10px;
  width: calc(100vw - 90px);
  height: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;

  .mask {
    display: block;
    width: ${props => getProgressPct(props.progress, props.max)}%;
    height: 10px;
    background-color: #379bff;
    border-radius: 5px;
  }

  .progress-icon {
    position: absolute;
    width: 40px;
    height: auto;
    bottom: 15px;
    left: calc(${props => getProgressPct(props.progress, props.max)}% - 25px);
  }
`;

export default ProgressBar;
