import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { import } from 'next/dynamic';
import styled, { css } from 'styled-components';

import Layout from '../components/Layout';
import Splash from '../components/Splash';
import Widget from '../components/Widget';
import ShareButtons from '../components/ShareButtons';
import BusList from '../components/BusList';
import dateFormatter from '../helpers/dateFormatter';


@inject("store")
@observer
class Index extends Component {

  async componentWillMount () {
    // TODO: 高速化
    // const location = new Location();
    // console.log('getpos')
    // const pos = await location.getPosName();
    const { store } = this.props;
    store.setLoading(true);
    store.setDate();
    store.setFromTo('sho', 'sfc');
    this.interval = setInterval(() => {
      store.setDate();
      store.setLeftBuses();
      store.setLeftTime();
    }, 300);
  }

  async componentDidMount () {
    const { store } = this.props;
    store.setLoading(false);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    const {
      store
    } = this.props;

    if (store.isLoading) {
      return (
        <Splash />
      )
    } else {
      return (
        <Wrapper>
          <div className="fixed-item">
            <Widget />
            <ShareButtons />
          </div>
          <div className="scroll-content">
            <BusList />
          </div>
        </Wrapper>
      )

    }
  }
}

const Wrapper = styled.div`
  .fixed-item {
    margin-top: 122px;
    width: 100%;
    z-index: 998;
    position: fixed;
    background-color: #FFFFFF;
    padding-bottom: 20px;
    border-bottom: 1px solid #707070;
  }

  .scroll-content {
    padding-top: 418px;
  }
`;

export default Index;
