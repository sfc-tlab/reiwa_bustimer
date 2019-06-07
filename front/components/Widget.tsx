import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";

import ShareButtons from './ShareButtons';
import dateFormatter from '../helpers/dateFormatter';


@inject("store")  
@observer
class Widget extends Component {    

  render () {
    const { store } = this.props;
    
    function LeftTime() {
      // 別コンポーネントに切り出しても良い
      if (store.leftBuses.length) {
        return (
          <Fragment>
            <span className="left-time min">
              <span className="num">
                {`${store.leftTime.m}`}
              </span>
              <span className="str">
                分 
              </span>
            </span>
            <span className="left-time sec">
              <span className="num">
                {`${('00'+store.leftTime.s).slice(-2)}`}
              </span>
              <span className="str">
              秒
              </span>
            </span>
          </Fragment>
        );
      }
      return '';
    }
    
    return (
      <Wrapper>
        <div className="widget">
          <div className="pos-container">
            <div className="pos-info">
              <span
                className="pos from">
                {store.fromStr} 
              </span>
                <img 
                  className="pos direction-icon svg" 
                  src={"/static/img/direction-icon.svg"} 
                  alt="direction-icon"
                />
              <span
                className="pos to">
                {store.toStr}
              </span>
            </div>
            <img
              className="pos swap-button svg"
              src={`/static/img/swap-button.svg`}
              onClick={()=>{store.setFromTo(store.to, store.from)}} 
              alt="departure-swap-button"
            />
          </div>
          <div className="left-time-container">
              { !store.leftBuses.length &&
                <div className="widget-message">
                  本日のバスは終了しました。
                </div>
              }
            <LeftTime />
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  z-index: 996
  vertical-align: middle;
  padding: 24px;
  padding-top: 48px;
  text-align: center;

  .pos-container {
    border-radius: 3px 3px 0 0;
    border: 1px solid #707070; 
    padding-bottom: 10px;
  }

  .pos-info {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 15px 20px;
  }

  .pos {
    vertical-align: middle;
    position: relative;
    font-size: 30px;
    color: #707070;
  }

  .pos.direction-icon {
    padding-left: 10px;
    padding-right: 10px;
  }

  .pos.from {
    posision: relateve;
    width: calc((100% * 1/3) );
    float: left;
  }

  .pos.to {
    posision: relateve;
    width: calc((100% * 1/3) );
    float: right;
  }

  .left-time-container {
    border-radius: 0 0 3px 3px;
    border: 1px solid #707070; 
    padding: 10px;
  }

  .left-time {
    margin: 5px;
    display: inline-block;
    color: #707070;
    font-size: 36px;
  }

  .left-time .str {
    font-size: 20px;
  }

  .left-time.min {
    position: relative;
    display: inline;
    padding-left: 25px;
    width:50%;
  }

  .left-time.sec{
    position: relative;
    display: inline;
    width:50%;
  }

`;

export default Widget;
