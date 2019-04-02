import React, { Component } from 'react';
import * as fs from 'fs';

import Layout from '../components/Layout';
import Widget from '../components/Widget';
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
        holidays,
      }
    } else {
      return {};
    }
  }

  render () {
    const { 
      timeTableData,
      date,
      pos,
      holidays,
    } = this.props;

    console.log(this.props)

    return (
      <Layout>
        <Widget 
          nowDate={date}
          pos={pos}
        >
        </Widget>
      </Layout>
    )
  }
}

export default Index;
