import React, { Component } from 'react';
import { Provider } from "mobx-react";
import * as fs from 'fs';

import store from "../stores";
import Main from "../components/Main";
import dateFormatter from '../helpers/dateFormatter';

class Index extends Component {    

  static async getInitialProps(req) {
    if (req) {
      const timeTableData = await fs.readFileSync("./static/timeTable.json");
      const holidays = await fs.readFileSync("./static/holidays.json");
      const date = dateFormatter.toDateObj(new Date());
      return {
        timeTableData: JSON.parse(timeTableData),
        date: date,
        pos: 'sho',
        holidays: JSON.parse(holidays),
      }
    }
  }

  render () {
    return (
      <Provider {...store} >
        <Main {...this.props} />
      </Provider>
    )
  }
}

export default Index;
