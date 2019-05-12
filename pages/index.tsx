import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { import } from 'next/dynamic';

import Layout from '../components/Layout';
import Splash from '../components/Splash';
import Widget from '../components/Widget';
import BusList from '../components/BusList';
import dateFormatter from '../helpers/dateFormatter';


@inject("store")
@observer
class Index extends Component {    

  state = { 
    date: dateFormatter.toDateObj(new Date()), 
    busList:[{ h:0, m:0, 
               from: 'sho', to: 'sfc', 
               twin: false, rotary: false,
               type: 'normal'}] 
  }

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
    console.log(store.isLoading)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render () {
    const { 
      store
    } = this.props;  

    const { 
      busList
    } = this.state;  

    if (store.isLoading) {
      return (
        <Splash />
      )
    } else {
      return (
        <Layout>
          <Widget />
        </Layout>
      )
    
    }
  }
}

export default Index;
