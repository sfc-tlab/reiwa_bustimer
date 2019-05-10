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
  departure: string = 'SFC';

  @observable
  busList: object = [];

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
  tweetText: string = `「${this.departure}発 ${('00'+this.nextBus.h).slice(-2)}時 ${('00'+this.nextBus.m).slice(-2)}分のバス」で登校なう`;

  @observable
  taxiText: string = `「${this.departure}発 ${('00'+this.nextBus.h).slice(-2)}時 ${('00'+this.nextBus.m).slice(-2)}分のバス」待ちのタクシー相乗りメンバー募集中`;

  @action
  setLoading = isLoading => {
    this.isLoading = isLoading;
  }

  @action
  setDate = () => {
    this.date = dateFormatter.toDateObj(new Date());
  }

  @action
  setPos = (pos: string) => {
    this.pos = pos;
    switch (pos) {
      case 'sho':
        this.departure = '湘南台';
        break;
      case 'sfc':
        this.departure = 'SFC';
        break;
      case 'tuji':
        this.departure = '辻堂';
        break;
      default:
        this.departure = 'test';
        break;
    }
  }

  @action
  setNextBus = (bus) => {
    this.nextBus = bus;
  }

  @action
  setLeftTime = (h: number, m: number, s: number) => {
    this.leftTime.h = h;
    this.leftTime.m = m;
    this.leftTime.s = s;
  }

  @action
  setBusList = (busList) => {
    this.busList = busList;
    this.setNextBus(busList[0]);
    let leftHour, leftMinute, leftSecond;
    leftHour = this.nextBus.h - this.date.hour;
    leftSecond = 60 - this.date.second;
    if (this.nextBus.h > this.date.hour){
      leftMinute = ((this.nextBus.h - this.date.hour) * 60)
        - this.date.minute
        + this.nextBus.m - 1; 
    } else {
      leftMinute = this.nextBus.m - this.date.minute -1; 
    }
    this.setLeftTime(leftHour, leftMinute, leftSecond);
  }
}
