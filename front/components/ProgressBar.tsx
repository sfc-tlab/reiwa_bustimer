import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";

@inject("store")
@observer
class ProgressBar extends Component {
  render() {
    const { store, pos } = this.props;

    let progressSec = 0;
    let maxSec = 10 * 60;

    if (store.leftBuses.length) {
      let leftSec = store.leftTime.m * 60 + store.leftTime.s;
      progressSec = maxSec - leftSec;
    }

    return (
      <Wrapper max={maxSec}>
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

  .ayase-base:after {
    content: ${props => props.maxSec || " "};
    position: absolute;
    font-size: 12px;
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
