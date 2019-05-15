import React, { Component } from 'react';
import Router from 'next/router';
import styled, { css } from 'styled-components';


interface ThemeColor {
    color: string;
}   

export default class Splash extends Component<ThemeColor> {

  
  render () {
    return (
      <Wrapper>
        <div className="splash">
          bustimer
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #379BFF;
  text-align: center;
  font-family: "ＭＳ ゴシック",sans-serif;
  font-size: 41px;
  color: #FFFFFF;
`;
