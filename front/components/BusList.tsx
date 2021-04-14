import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

import { StoreType } from "../stores";
import BusCard from "./BusCard";
import { Bus } from "../types";

type prop = {
  store?: StoreType
}

@inject("store")
@observer
class BusList extends Component<prop> {
  render() {
    const { store } = this.props;

    return (
      <Wrapper>
        <div className="bus-list">
          {store.leftBuses.length ? (
            <div className="bus-card-container">
              {store.leftBuses.map((bus: Bus, index: number) => (
                <BusCard bus={bus} key={"" + bus.h + bus.m + index} />
              ))}
            </div>
          ) : (
            <div className="finish">本日のバスは終了しました。</div>
          )}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;

  .finish {
    text-align: center; 
  }
`;

export default BusList;
