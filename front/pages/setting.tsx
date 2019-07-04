import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';


@inject("store")
@observer
class Setting extends Component {

  componentWillMount() {
    const { store } = this.props;

    store.setPath('/', '/setting');
  }

  jumpTo = (e, path) => {
    const { store } = this.props;
    e?e.preventDefault():null;
    store.setPath(path)
    Router.push(path)
  }

  render () {
    return (
      <Wrapper>
        <div className="setting">

          <div
            className="link"
            onClick={e => this.jumpTo(e, '/policy')}
          >
            プライバシーポリシー 
          </div>

          <div className="link" >
            <a
              className="link"
              href="https://github.com/sfc-tlab/reiwa_bustimer"
            >
              <img 
                className="logo"
                src="/static/img/GitHub_Logo.png" 
              />
            </a>
          </div>

          <div className="link" >
            <a 
              href="https://twitter.com/bustimer?ref_src=twsrc%5Etfw" 
              className="twitter-follow-button" data-show-count="false">
              Twitter: @bustimer
            </a>
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 74px;
  width: 100%;
  z-index: 998;
  text-align: center;
  font-size: 24px;

  .link {
    padding: 20px;

  }

  .link:active {
      color : #26a69a;
  }

  .logo {
    height: 40px;
  }

`;

export default Setting;
