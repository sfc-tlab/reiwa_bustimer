import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';


@inject("store")  
@observer
export default class DepartureButton extends Component {

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
    const { store, pos } = this.props;

    return (
      <Wrapper>
        <div 
          className={`departure-button ${pos} `+(store.selectedPos === pos?'selected':null)}
            onClick={(e)=>{this.setPos(e, pos)}}
            onTouchEnd={(e)=>{this.setPos(e, pos)}}
            >
          <div className="departure-button-text">
            {store._getPosStr(pos)}
          </div>
        </div>
      </Wrapper>
    );
  }

}

const Wrapper = styled.span`
  text-align: center;
  font-family: "ＭＳ ゴシック", sans-serif;

  .departure-button {
    width: 100px;
    line-height: 36px;
    font-size: 16px;
    background-color: #F5F5F5;
  }

  .sho {
    border-radius: 5px 0px 0px 5px;
  }

  .tuji {
    border-radius: 0px 5px 5px 0px;
  }

  .departure-button-text {
    color: #707070;
  }

  .selected {
    background-color: #379BFF;
  }

  .selected .departure-button-text {
    color: white;
  }


  ${(props: ThemeColor) =>
    props.color 
    && css`
      background: props.color
    `}
`;
