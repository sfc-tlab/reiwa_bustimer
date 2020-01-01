import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";

import BusCard from "./BusCard";

@inject("store")
@observer
class BusList extends Component {
  render() {
    const { store } = this.props;

    return (
      <Wrapper>
        <div className="bus-list">
          {store.leftBuses.length ? (
            <div className="bus-card-container">
              {store.leftBuses.map((bus, index) => (
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
