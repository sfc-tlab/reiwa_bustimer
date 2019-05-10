import { action, observable } from "mobx";
import { useStaticRendering } from 'mobx-react';

import dateFormatter from '../helpers/dateFormatter';


//TODO baseUrl の置き方考える
const baseUrl = 'https://bus.im-neko.net';
const isServer = !process.browser
useStaticRendering(isServer);


export default class MainStore {

  constructor(isServer, initialData = {}) {
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
  todayTable: object = [];

  @observable.ref
  leftBuses: object = [];

  @observable
  nextBus: object = {
    h: 0,
    m: 0
  };

  @observable
  leftTime: object = {
    h: 0,
    m: 0,
    s: 0
  };

  @observable
  tweetText: string = `「${this.fromStr}発 ${('00'+this.nextBus.h).slice(-2)}時 ${('00'+this.nextBus.m).slice(-2)}分のバス」で登校なう`;

  @observable
  taxiText: string = `「${this.fromStr}発 ${('00'+this.nextBus.h).slice(-2)}時 ${('00'+this.nextBus.m).slice(-2)}分のバス」待ちのタクシー相乗りメンバー募集中`;

  @action
  setLoading = isLoading => {
    this.isLoading = isLoading;
  }

  @action
  setDate = () => {
    this.date = dateFormatter.toDateObj(new Date());
  }

  @action
  getPosStr = (pos: string) => {
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
    this.fromStr = this.getPosStr(from);
    this.to = to;
    this.toStr = this.getPosStr(to);
  } 

  @action
  setTodayTable = (timeTable: object, holidays: object) => {
    const isHoliday = ((this.date.monthStr+this.date.dayStr) in holidays);
    const timeTableForPos = timeTable.default[this.from][this.to];
    let todayData;
    isHoliday
      ? todayData = timeTableForPos['holiday']
      : todayData = timeTableForPos['weekday']
    console.log(todayData)
    this.todayTable = todayData;
  }

  @action
  setLeftBuses = () => {
    const todayTable = this.todayTable;
    console.log(todayTable)
    const leftBuses = todayTable.filter(time => {
      return (
        (time.h > this.date.hour) 
        ||
        (
          time.h === this.date.hour &&
          time.m > this.date.minute
        )
      )
    });
    console.log(leftBuses)
    this.leftBuses = leftBuses;
    this.setNextBus(leftBuses[0]);
  }

  @action
  setNextBus = (bus) => {
    this.nextBus = bus;
  }

  @action
  setLeftTime = () => {
    const nextBus = this.nextBus;
    const date = this.date;
    let leftHour, leftMinute, leftSecond;
    leftHour = nextBus.h - date.hour;
    leftSecond = 60 - date.second;
    if (nextBus.h > date.hour){
      leftMinute = ((nextBus.h - date.hour) * 60)
        - date.minute
        + nextBus.m - 1; 
    } else {
      leftMinute = nextBus.m - date.minute -1; 
    }
    this.leftTime.h = leftHour;
    this.leftTime.m = leftMinute;
    this.leftTime.s = leftSecond;
  }
}
