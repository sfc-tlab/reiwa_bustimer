import { action, observable, computed } from "mobx";
import { useStaticRendering } from 'mobx-react';
import { import } from 'next/dynamic';

import dateFormatter from '../helpers/dateFormatter';


//TODO baseUrl の置き方考える
const baseUrl = 'https://bus.im-neko.net';
const isServer = !process.browser
useStaticRendering(isServer);


export default class MainStore {

  constructor(isServer, initialData = {}) {
    this.setDate();
  }

  @observable
  isLoading: boolean = true;

  @observable
  date: object = {};

  @observable
  pos: string = 'sfc';

  @observable
  from: string = 'sfc';

  @observable
  fromStr: string = 'SFC';

  @observable
  to: string = 'sho';

  @observable
  toStr: string = '湘南台';

  @observable.ref
  timeTable: object = {};

  @observable.ref
  holidays: object = {};

  // @observable.ref
  // leftBuses: object = [];
  
  @observable.ref
  leftTime: object = {};

  @computed
  get tweetText() {
    return `「${this.fromStr}発 ${('00'+this.nextBus.h).slice(-2)}時 ${('00'+this.nextBus.m).slice(-2)}分のバス」で登校なう`;
  }

  @computed
  get taxiText() { 
    return `「${this.fromStr}発 ${('00'+this.nextBus.h).slice(-2)}時 ${('00'+this.nextBus.m).slice(-2)}分のバス」待ちのタクシー相乗りメンバー募集中`;
  }

  @action
  setLoading = isLoading => {
    this.isLoading = isLoading;
  }

  @action
  setDate = () => {
    this.date = dateFormatter.toDateObj(new Date());
  }

  @action
  setTimeTable = async () => {
    this.timeTable = (await import('../static/timeTable.json')).default;
  }

  @action
  setHolidays = async () => {
    this.holidays = (await import('../static/holidays.json')).default;
  }

  _getPosStr = (pos: string) => {
    switch (pos) {
      case 'sho':
        return '湘南台';
      case 'sfc':
        return 'SFC';
      case 'tuji':
        return '辻堂';
      default:
        return 'テスト';
    }
  }

  @action
  setFromTo = (from: string, to: string) => {
    this.from = from;
    this.fromStr = this._getPosStr(from);
    this.to = to;
    this.toStr = this._getPosStr(to);
  } 

  @action.bound
  setTodayTable() {
    console.log(this.todayTable)
    if (this.timeTable && this.timeTable.default) {
      const isHoliday = ((this.date.monthStr+this.date.dayStr) in this.holidays);
      const timeTableForPos = this.timeTable.default[this.from][this.to];
      this.todayTable = isHoliday
        ? timeTableForPos['holiday']
        : timeTableForPos['weekday'];
    } else {
      this.todayTable = []; 
    }
  }

  @computed
  get leftBuses() {
    console.log('todayTable: ', this.todayTable)
    if (this.todayTable && this.todayTable.length) {
      return this.todayTable.filter(time => {
        return (
          (time.h > this.date.hour) 
          ||
          (
            time.h === this.date.hour &&
            time.m > this.date.minute
          )
        )
      });
    } else {
      return [{h: 24, m: 60, s: 60}];
    }
  }

  @action
  setNextBus(bus) {
    this.nextBus = bus;
  }

  @action
  setLeftTime() {
    if (!this.nextBus){
      this.leftTime =  {h: 0, m: 0, s: 0};
    }
    let hour, min, sec;
    hour = this.nextBus.h - this.date.hour;
    sec = 60 - this.date.second;
    if (this.nextBus.h > this.date.hour){
      min = ((this.nextBus.h - this.date.hour) * 60)
        - this.date.minute
        + this.nextBus.m - 1; 
    } else {
      min = this.nextBus.m - this.date.minute -1; 
    }
    this.leftTime = {hour, min, sec};
    console.log(this.leftTime);
  }
}
