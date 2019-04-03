import React, { Component } from 'react';
import * as fs from 'fs';

import Layout from '../components/Layout';
import Widget from '../components/Widget';
import BusList from '../components/BusList';
import axios from '../helpers/axios';
import dateFormatter from '../helpers/dateFormatter';


class Index extends Component {    
  state = { holidays: '' }
  
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

  render () {
    const { 
      timeTableData,
      date,
      pos,
      holidays,
    } = this.props;


    return (
      <Layout>
        <Widget 
          nowDate={date}
          pos={pos}
        />
        <BusList
          toDayData={timeTableData.default.sfc2sho[0]}
          nowTime={date}
        />
      </Layout>
    )
  }
}

export default Index;
