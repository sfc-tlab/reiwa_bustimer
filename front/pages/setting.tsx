import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';


@inject("store")
@observer
class Setting extends Component {

  componentWillMount() {
    const { store } = this.props;

    store.setPath('/setting');
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

          <a href='/policy'> プライバシーポリシー </a>
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
`;

export default Setting;
