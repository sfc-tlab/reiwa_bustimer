import React, { Component } from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';


interface ThemeColor {
    color: string;
}   

export default class Header extends Component<ThemeColor> {

  jumpTo = (e, path) => {
    if (e) {
      e.preventDefault(); 
    }
    Router.push(path)
  }
  
  render () {
    return (
      <Wrapper>
        <div className="header">
          <span 
            className="header-schedule-button"
            onClick={e => this.jumpTo(e, '/schedule')}
          >
            仮
          </span>
          bustimer
          <span 
            className="header-setting-button"
            onClick={e => this.jumpTo(e, '/setting')}
          >
            仮
          </span>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: fix;
  top: 0px;
  padding: 8px;
  background: #379BFF;

  .header {
    font-size: 41px;
    text-align: center;
    font-family: "ＭＳ ゴシック",sans-serif;
    color: #FFFFFF;
  }

  .header-schedule-button {
    position: absolute;
    left: 15px; 
  }

  .header-setting-button {
    position: absolute;
    right: 15px;
  }

  ${(props: ThemeColor) =>
    props.color 
    && css`
      background: props.color
    `}
`;
