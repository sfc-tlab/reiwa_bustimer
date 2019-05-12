import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { import } from 'next/dynamic';

import Layout from '../components/Layout';
import Splash from '../components/Splash';
import Widget from '../components/Widget';
import BusList from '../components/BusList';


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
    store.setFromTo('sho', 'sfc');
    const timeTable = (await import('../static/timeTable.json')).default;
    const holidays = (await import('../static/holidays.json')).default;
    store.setTimeTable(timeTable);
    store.setHolidays(holidays);
  }

  async componentDidMount () {
    const { store } = this.props;
    store.setLoading(false);
    console.log(store.isLoading)
  }

  render () {
    const { store } = this.props;  

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
