import React, { Component } from 'react';
import Router from 'next/router';

import Splash from '../components/Splash';


class Bustimer extends Component {

  async componentWillMount () {
    Router.push('/');
  }

  render () {
    const {
      store
    } = this.props;

    return (
      <Splash />
    )
  }
}


export default Bustimer;
