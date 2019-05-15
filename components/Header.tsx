import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';

import DepartureButton from './DepartureButton';


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
          <DepartureButton pos='sho' />
          <DepartureButton pos='tuji' />
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  text-align: center;
  font-family: "ＭＳ ゴシック",sans-serif;

  .header {
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


  ${(props: ThemeColor) =>
    props.color 
    && css`
      background: props.color
    `}
`;
