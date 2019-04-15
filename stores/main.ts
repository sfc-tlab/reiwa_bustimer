import { action, observable } from "mobx";


export default class MainStore {
  @observable
  isLoading: boolean = true;

  @action
  setLoading = isLoading => {
    this.isLoading = isLoading;
  }
}
