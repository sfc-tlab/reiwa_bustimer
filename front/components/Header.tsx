import React, { Component } from "react";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";

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
    super(props);
  }

  jumpTo = (e, path) => {
    const { store } = this.props;
    e ? e.preventDefault() : null;
    Router.push(path);
  };

  render() {
    const { store } = this.props;

    return (
      <Wrapper>
        <div className="header">
          {store.pathName === "/" ? (
            <span
              className="header-button schedule"
              onClick={e => this.jumpTo(e, "/schedule")}
              onTouchEnd={e => this.jumpTo(e, "/schedule")}
            >
              <img
                className="busstop-icon"
                src={"/static/img/icon-timetable.svg"}
                alt="busstop-icon"
              />
            </span>
          ) : (
            <span
              className="header-button schedule"
              onClick={e => this.jumpTo(e, store.beforePath)}
              onTouchEnd={e => this.jumpTo(e, store.beforePath)}
            >
              <img
                className="close"
                src={"/static/img/icon-close.svg"}
                alt="close"
              />
            </span>
          )}
          <span className="header-logo" onClick={e => this.jumpTo(e, "/")}>
            <img src={"/static/img/logo.svg"} alt="BusTimer" />
          </span>
          {store.pathName === "/" && (
            <span
              className="header-button setting"
              onClick={e => this.jumpTo(e, "/setting")}
              onTouchEnd={e => this.jumpTo(e, "/setting")}
            >
              <img
                className="setting-icon"
                src={"/static/img/icon-setting.svg"}
                alt="setting-icon"
              />
            </span>
          )}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
  text-align: center;
  font-family: "ＭＳ ゴシック", sans-serif;

  .header {
    position: relative;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #ffffff;
    top: 0px;
    padding: 0 15px;
    background: #379bff;
    font-size: 0;
  }

  .header-logo {
    display: inline-block;
    width: 200px;
    margin: 0 auto;
  }

  .header-logo img {
    width: 100%;
    height: 100%;
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
    fill: #ffffff;
    width: 30px;
    height: 30px;
  }

  .setting-icon {
    margin: 5px;
    fill: #ffffff;
    width: 30px;
    height: 30px;
  }

  .close {
    margin: 5px;
    fill: #ffffff;
    width: 20px;
    height: 20px;
  }

  ${(props: ThemeColor) =>
    props.color &&
    css`
      background: props.color;
    `}
`;
