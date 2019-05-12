import { action, observable } from "mobx";
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

  constructor(isServer, initialData = {}) {
    this.timeTable = initialData.timeTable;
    this.holidays = initialData.holidays;
  }

  @observable
  isLoading: boolean = true;

  @observable
  date: object = {};

  @observable
  from: string = 'sho';

  @observable
  fromStr: string = '湘南台';

  @observable
  to: string = 'sfc';

  @observable
  toStr: string = 'SFC';

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

}
