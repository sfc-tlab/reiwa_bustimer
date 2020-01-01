import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import { StoreType } from "../stores";
import DepartureButton from "./DepartureButton";
import ProgressBar from "./ProgressBar";

interface IProps {
  store: StoreType;
}

@inject("store")
@observer
class Widget extends Component<IProps> {
  render() {
    const { store } = this.props;

    function LeftTime() {
      // 別コンポーネントに切り出しても良い
      if (store.leftBuses.length) {
        return (
          <Fragment>
            <span className="left-time min">
              <span className="num">{`${store.leftTime.m}`}</span>
              <span className="str">min.</span>
            </span>
            <span className="left-time sec">
              <span className="num">
                {`${("00" + store.leftTime.s).slice(-2)}`}
              </span>
              <span className="str">sec.</span>
            </span>
          </Fragment>
        );
      }
      return null;
    }

    return (
      <Wrapper>
        <div className="widget">
          {["/schedule", "/"].includes(store.pathName) && (
            <div className="departures">
              <DepartureButton pos="sho" />
              <DepartureButton pos="tuji" />
            </div>
          )}
          <div className="pos-container">
            <div className="pos-info">
              <span className="pos from">
                <img src={store.fromImage}></img>
                <p>{store.fromStr}</p>
              </span>
              <div className="pos-images">
                <img
                  className="pos direction-icon svg"
                  src={"/static/img/directions.svg"}
                  alt="direction-icon"
                />
                <img
                  className="pos swap-button"
                  src={`/static/img/icon-toggle.svg`}
                  onTouchEnd={() => {
                    store.setFromTo(store.to, store.from);
                  }}
                  alt="departure-swap-button"
                />
              </div>
              <span className="pos to">
                <img src={store.toImage}></img>
                <p>{store.toStr}</p>
              </span>
            </div>
          </div>
          <ProgressBar />
          <div className="left-time-container">
            <LeftTime />
          </div>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;

  .departures {
    margin: 50px auto;
    display: flex;
    width: fit-content;
  }

  .pos-info {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 50px 0;
  }

  .pos-images {
    display: flex;
    flex-direction: column;
    width: 40px;
    height: 150px;
  }

  .pos-images img {
    width: 100%;
  }

  .pos-container {
    border-radius: 3px 3px 0 0;
  }

  .pos {
    vertical-align: middle;
    position: relative;
    height: 150px;
    font-size: 30px;
    color: #707070;
  }

  .pos p {
    margin: 0;
  }

  .pos .from {
    posision: relateve;
    width: calc((100% * 1 / 3));
  }

  .pos .to {
    posision: relateve;
    width: calc((100% * 1 / 3));
  }

  .left-time-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 50px;
    border-radius: 0 0 3px 3px;
  }

  .left-time {
    display: flex;
    align-items: baseline;
    margin: 5px;
    color: #707070;
    font-size: 36px;
    font-weight: bold;
  }

  .left-time .str {
    font-size: 20px;
  }

  .left-time .min {
    position: relative;
    display: inline;
    padding-left: 25px;
  }

  .left-time .sec {
    position: relative;
    display: inline;
  }

  .widget-message {
    text-align: center;
  }
`;

export default Widget;
