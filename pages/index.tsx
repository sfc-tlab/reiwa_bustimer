import React, { Component } from 'react';
import * as fs from 'fs';

import Layout from '../components/Layout';
import Widget from '../components/Widget';
import BusList from '../components/BusList';
import axios from '../helpers/axios';
import dateFormatter from '../helpers/dateFormatter';


class Index extends Component {    
  state = { 
    date: dateFormatter.toDateObj(new Date()), 
    busList:[{ h:0, m:0, 
               from: 'sho', to: 'sfc', 
               twin: false, rotary: false,
               type: 'normal'}] }

  static async getInitialProps(req) {
    if (req) {
      const timeTableData = await fs.readFileSync("./static/timeTable.json");
      const holidays = await fs.readFileSync("./static/holidays.json");
      const date = dateFormatter.toDateObj(new Date());
      return {
        timeTableData: JSON.parse(timeTableData),
        date: date,
        pos: [],
        holidays: JSON.parse(holidays),
      }
    } 
  }

  componentWillMount () {
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
    const todayData = timeTableData.default.sfc2sho[0];
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

export default Index;
