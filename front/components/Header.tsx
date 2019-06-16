import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';

import DepartureButton from './DepartureButton';


interface ThemeColor {
    color: string;
}

interface HeaderState {
  pathName: string;
}

@inject("store")
@observer
export default class Header extends Component<{}, HeaderState> {
  constructor(props: {}) {
    super(props)
  }

  jumpTo = (e, path) => {
    const { store } = this.props;
    e?e.preventDefault():null;
    Router.push(path)
  }


  render () {
    const { store } = this.props;

    return (
      <Wrapper>
        <div className="header">
          {(store.pathName === '/'
            ?<span
              className="header-button schedule"
              onClick={e => this.jumpTo(e, '/schedule')}
            >
              <img
                className="busstop-icon"
                src={"/static/img/busstop-icon.svg"}
                alt="busstop-icon"
              />
            </span>
            :
            <span
              className="header-button schedule"
              onClick={e => this.jumpTo(e, store.beforePath)}
            >
              <img
                className="return-icon"
                src={"/static/img/return-icon.svg"}
                alt="return-icon"
              />
            </span>
          )}
          <span
            className="header text"
            onClick={e => this.jumpTo(e, '/')}
          >
            bustimer
          </span>
          {(store.pathName === '/' &&
            <span
              className="header-button setting"
              onClick={e => this.jumpTo(e, '/setting')}
            >
              <img
                className="setting-icon"
                src={"/static/img/setting-icon.svg"}
                alt="setting-icon"
              />
            </span>
          )}
        </div>
        {( ['/schedule', '/'].includes(store.pathName) &&
          <div className="departures">
            <DepartureButton pos='sho' />
            <DepartureButton pos='tuji' />
          </div>
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
  text-align: center;
  font-family: "ＭＳ ゴシック",sans-serif;

  .header {
    position: relative;
    font-size: 41px;
    color: #FFFFFF;
    top: 0px;
    padding: 4px;
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

  .busstop-icon {
    margin: 5px;
    fill: #FFFFFF;
    width: 48px;
    height: 48px;
  }

  .setting-icon {
    margin: 5px;
    fill: #FFFFFF;
    width: 48px;
    height: 48px;
  }

  .return-icon {
    margin: 5px;
    fill: #FFFFFF;
    width: 48px;
    height: 48px;
  }

  ${(props: ThemeColor) =>
    props.color
    && css`
      background: props.color
    `}
`;
