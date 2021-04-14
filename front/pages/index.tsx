import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

import { StoreType } from "../stores";
import Splash from "../components/Splash";
import Widget from "../components/Widget";
import BusList from "../components/BusList";

interface IProps {
  store: StoreType;
}

@inject("store")
@observer
class Index extends Component<IProps> {
  interval;

  async componentWillMount() {
    const { store } = this.props;
    store.setLoading(true);
    store.setPath("/", "/");
    store.setDate();
    this.interval = setInterval(() => {
      store.setDate();
      store.setLeftBuses();
      store.setLeftTime();
    }, 300);
  }

  async componentDidMount() {
    const { store } = this.props;
    const cache = JSON.parse(localStorage.getItem("cache"));
    if (cache) {
      store.setFromTo(cache.from, cache.to);
    } else {
      store.setFromTo("sho", "sfc");
    }
    store.setLoading(false);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { store } = this.props;

    if (store.isLoading || !store.leftTime) {
      return <Splash />;
    } else {
      return (
        <Wrapper>
          <div className="scroll-content">
            <Widget />
            <BusList />
          </div>
        </Wrapper>
      );
    }
  }
}

const Wrapper = styled.div`
  .scroll-content {
    padding-top: 60px;
  }
`;

export default Index;
