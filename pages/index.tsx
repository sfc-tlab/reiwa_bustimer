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
      const busList = this.getMyList(store.timeTable, store.holidays);
      this.setState({ busList });
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
          <Widget 
            nowDateTime={store.date}
            pos={store.from}
            busList={busList}
          />
        </Layout>
      )
    
    }
  }
}

export default Index;
