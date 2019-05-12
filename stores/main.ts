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
  pos: string = '';

  @action
  setLoading = isLoading => {
    this.isLoading = isLoading;
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
