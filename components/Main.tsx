import React, { Component } from 'react';

import Layout from './Layout';
import Widget from './Widget';
import BusList from './BusList';
import dateFormatter from '../helpers/dateFormatter';


class Main extends Component {    
  state = { 
    date: dateFormatter.toDateObj(new Date()), 
    busList:[{ h:0, m:0, 
               from: 'sho', to: 'sfc', 
               twin: false, rotary: false,
               type: 'normal'}] }

  async componentWillMount () {
    // TODO: 高速化
    // const location = new Location();
    // console.log('getpos')
    // const pos = await location.getPosName();
    // console.log(pos)
    this.interval = setInterval(() => {
      const date = dateFormatter.toDateObj(new Date());
      const busList = this.getMyList(date);
      this.setState({ date, busList });
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getMyList (date) {
    const { 
      timeTableData,
      pos,
      holidays,
    } = this.props;  
    const isHoliday = (date.monthStr+date.dayStr) in holidays;
    const todayData = timeTableData.default.sfc.sho.weekday;
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
  }

  render () {
    const { 
      timeTableData,
      pos,
      holidays,
    } = this.props;  

    const { 
      date,
      busList
    } = this.state;  

    return (
      <Layout>
        <Widget 
          nowDateTime={date}
          pos={pos}
          busList={busList}
        />
        <BusList
          busList={busList}
        />
      </Layout>
    )
  }
}

export default Main;
