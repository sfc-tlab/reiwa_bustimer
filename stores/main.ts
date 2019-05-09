import { action, observable } from "mobx";
import { useStaticRendering } from 'mobx-react';

import dateFormatter from '../helpers/dateFormatter';
import { get } from '../helpers/axios';


//TODO baseUrl の置き方考える
const baseUrl = 'https://bus.im-neko.net';
const isServer = !process.browser
useStaticRendering(isServer);


export default class MainStore {
  @observable
  timeTableData: object = {};

  @observable
  holidays: object = {};

  constructor(isServer, initialData = {}) {
    if (isServer) {
      this.getTimeTable();
      this.getHolidays();
    }
  }

  @observable
  isLoading: boolean = true;

  @observable
  date: object = {};

  @observable
  pos: string = '';

  @action
  setLoading = isLoading => {
    this.isLoading = isLoading;
  }

  @action
  getTimeTable = async () => {
    const res = await get(baseUrl + '/static/timeTable.json');
    this.timeTableData = res.data;
  }

  @action
  getHolidays = async () => {
    const res = await get(baseUrl + "/static/holidays.json");
    this.holidays = res.data;
  }

  @action
  setDate = () => {
    this.date = dateFormatter.toDateObj(new Date());
  }

  @action
  setPos = (pos) => {
    this.pos = pos;
  }
}
