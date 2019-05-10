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
    store.setDate();
    store.setPos('sho');
    const timeTable = await import('../static/timeTable.json');
    const holidays = await import('../static/holidays.json');
    this.interval = setInterval(() => {
      store.setDate();
      const busList = this.getMyList(timeTable.default, holidays.default);
      store.setBusList(busList);
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

  getMyList (timeTable, holidays) {
    try {
      const { store } = this.props;
      const date = store.date;
      const isHoliday = ((date.monthStr+date.dayStr) in holidays);
      const todayData = timeTable.default.sfc.sho.weekday;
      const busList = todayData.filter(time => {
        return (
          (time.h > date.hour) 
          ||
          (
            time.h === date.hour &&
            time.m > date.minute
          )
        )
      });
      return busList;
    } catch (e) {
      console.error(e);
      return [];
    }
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
          <BusList />
        </Layout>
      )
    
    }
  }
}

export default Index;
