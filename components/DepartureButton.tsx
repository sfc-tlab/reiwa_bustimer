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
  font-family: "ＭＳ ゴシック",sans-serif;

  .departure-button {
    display: inline-block;
    width: 50%;
    padding: 10px; 
    border: 2px solid #707070;
    background-color: #FFFFFF;
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

  .selected {
    background-color: #76CCFF;
  }


  ${(props: ThemeColor) =>
    props.color 
    && css`
      background: props.color
    `}
`;
