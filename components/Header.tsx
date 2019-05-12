import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';


interface ThemeColor {
    color: string;
}   

@inject("store")  
@observer
export default class Header extends Component<ThemeColor> {

  jumpTo = (e, path) => {
    e?e.preventDefault():null;
    Router.push(path)
  }

  setPos (e, pos) {
    const { store } = this.props;
    e?e.preventDefault():null;
    if (store.from === 'sfc') {
      store.setFromTo('sfc', pos);
      return;
    }
    store.setFromTo(pos, 'sfc'); 
  }
  
  render () {
    const { store } = this.props;

    return (
      <Wrapper>
        <div className="header">
          <span 
            className="header-button schedule"
            onClick={e => this.jumpTo(e, '/schedule')}
          >
            仮
          </span>
          <span className="header text">
            bustimer
          </span>
          <span 
            className="header-button setting"
            onClick={e => this.jumpTo(e, '/setting')}
          >
            仮
          </span>
        </div>

        <div className="departures">
          <div 
            className="departure-button sho"
              onClick={(e)=>{this.setPos(e, 'sho')}}
              >
            <div className="departure-button-text">
              湘南台
            </div>
          </div>
          <div 
            className="departure-button tuji"
            onClick={(e)=>{this.setPos(e, 'tuji')}}
           >
            <div className="departure-button-text">
              辻堂
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  text-align: center;
  font-family: "ＭＳ ゴシック",sans-serif;

  .header {
    position: fix;
    font-size: 41px;
    color: #FFFFFF;
    position: fix;
    top: 0px;
    padding: 8px;
    background: #379BFF;
  }

  .header-button {
    position: absolute;
  }

  .header-button.schedule {
    left: 15px; 
  }

  .header-button.setting {
    right: 15px;
  }

  .departures {
    width: 100%;
  }

  .departure-button {
    display: inline-flex;
    width: 50%;
    padding: 10px; 
    border: 2px solid #707070;
  }

  .departure-button.sho {
    border-right: 1px solid #707070;
  }

  .departure-button.tuji {
    border-left: 1px solid #707070;
  }

  .departure-button-text {
    color: #707070;
  }


  ${(props: ThemeColor) =>
    props.color 
    && css`
      background: props.color
    `}
`;
