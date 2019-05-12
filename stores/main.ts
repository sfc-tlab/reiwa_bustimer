import { action, observable, computed } from "mobx";
import { useStaticRendering } from 'mobx-react';
import { import } from 'next/dynamic';

import dateFormatter from '../helpers/dateFormatter';


//TODO baseUrl の置き方考える
const baseUrl = 'https://bus.im-neko.net';
const isServer = !process.browser
useStaticRendering(isServer);


export default class MainStore {

  @observable.ref
  interval: object = null;

  constructor(isServer, initialData = {}) {
    if (!isServer) {
      this.setDate(); 
      this.setTodayTable(this.getTodayTable);
      this.setNextBus(this.leftBuses[0]);
      this.interval = setInterval(()=>{
        this.setDate(); 
        this.setTodayTable(this.getTodayTable);
        this.setLeftTime();
      }, 300);
    }
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

  @observable.ref
  todayTable: object = [{
    h: 0,
    m: 0,
    s: 0
  }];

  @observable.ref
  leftTime: object = {
    h: 0,
    m: 0,
    s: 0
  };

  @observable.ref 
  nextBus: object = {
    h: 0,
    m: 0,
    s: 0
  };

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

  @computed
  get getTodayTable() {
    console.log(this.timeTable)
    if (this.timeTable) {
      const isHoliday = ((this.date.monthStr+this.date.dayStr) in this.holidays);
      const timeTableForPos = this.timeTable.default[this.from][this.to];
      return isHoliday
        ? timeTableForPos['holiday']
        : timeTableForPos['weekday'];
    } else {
      return [];
    }
  }

  @action.bound
  setTodayTable(todayTable: object) {
    this.todayTable = todayTable; 
  }

  @computed
  get leftBuses() {
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
  }

  @action
  setNextBus(bus) {
    if (!bus){
      this.leftTime =  {h: 0, m: 0, s: 0};
    }
    let hour, min, sec;
    hour = bus.h - this.date.hour;
    sec = 60 - this.date.second;
    if (bus.h > this.date.hour){
      min = ((bus.h - this.date.hour) * 60)
        - this.date.minute
        + bus.m - 1; 
    } else {
      min = bus.m - this.date.minute -1; 
    }
    this.leftTime = {hour, min, sec};
    this.nextBus = bus;
  }
}
