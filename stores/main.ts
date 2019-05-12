import { action, observable, computed } from "mobx";
import { useStaticRendering } from 'mobx-react';

import dateFormatter from '../helpers/dateFormatter';


//TODO baseUrl の置き方考える
const baseUrl = 'https://bus.im-neko.net';
const isServer = !process.browser
useStaticRendering(isServer);


export default class MainStore {

  _getPosStr = (pos: string) => {
      switch (pos) {
        case 'sho':
          return '湘南台';
        case 'sfc':
          return 'SFC';
        case 'tuji':
          return '辻堂';
        default:
          return 'test';
      }
  }

  @observable.ref
  timeTable: object = {};

  @observable.ref
  holidays: object = {};

  @observable.ref
  leftBuses: object = [{ h:0, m:0, 
               from: 'sho', to: 'sfc', 
               twin: false, rotary: false,
               type: 'normal'}]; 

  constructor(isServer, initialData = {}) {
    this.timeTable = initialData.timeTable;
    this.holidays = initialData.holidays;
    this.date = dateFormatter.toDateObj(new Date()); 
  }

  @observable
  isLoading: boolean = true;

  @observable
  date: object = {};

  @observable
  leftTime: object = {};

  @observable
  from: string = 'sho';

  @observable
  fromStr: string = '湘南台';

  @observable
  to: string = 'sfc';

  @observable
  toStr: string = 'SFC';
  
  @computed
  get tweetText () {
    if (this.leftBuses.length) {
      return `「${this.fromStr}発 ${('00'+this.leftBuses[0].h).slice(-2)}時 ${('00'+this.leftBuses[0].m).slice(-2)}分のバス」で登校なう`;
    } else {
      return `「${this.fromStr}発 もうバスないけど 登校なう`;
    }
  }

  @computed
  get taxiText () {
    if (this.leftBuses.length) {
      return `「${this.fromStr}発 ${('00'+this.leftBuses[0].h).slice(-2)}時 ${('00'+this.leftBuses[0].m).slice(-2)}分のバス」待ちのタクシー相乗りメンバー募集中`;
    } else {
      return `「${this.fromStr}から終バス逃してタクシー相乗りメンバー募集中`;
    }
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
  setFromTo = (from: string, to: string) => {
    this.from = from;
    this.fromStr = this._getPosStr(from);
    this.to = to;
    this.toStr = this._getPosStr(to);
  }

  @action
  setLeftBuses = () => {
    const isHoliday = ((this.date.monthStr+this.date.dayStr) in this.holidays);
    const todayData = isHoliday
      ?this.timeTable.default[this.from][this.to].holiday
      :this.date.dayOfWeek==6
        ?this.timeTable.default[this.from][this.to].weekday
        :this.timeTable.default[this.from][this.to].weekday; // debug終わったらsaturdayに戻す
    this.leftBuses = todayData.filter(time => {
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
  setLeftTime = () => {
    if (this.leftBuses.length) {
      const bus = this.leftBuses[0];
      const date = this.date;
      let leftMinute, leftSecond;
      leftSecond = 60 - date.second - 1;
      if (bus.h > date.hour){
        leftMinute = ((bus.h - date.hour) * 60)
          - date.minute
          + bus.m - 1; 
      } else {
        leftMinute = bus.m - date.minute -1; 
      }
      this.leftTime = {
        m: leftMinute,
        s: leftSecond
      }
    }
  }

}
