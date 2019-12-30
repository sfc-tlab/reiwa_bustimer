import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';

import BusCard from '../components/BusCard';


@inject("store")
@observer
class Schedule extends Component {

  componentWillMount() {
    const { store } = this.props;

    store.setPath('/', '/schedule');
  }

  render () {
    const { store } = this.props;
    return (
      <Wrapper>
        <Title>Time Table</Title>
        <PosContainer>
          {store.fromStr} → {store.toStr}
        </PosContainer>
        <BusListContainer>
          {store.leftBuses.map((bus, index) => 
            <BusCard
              bus={bus}
              key={''+bus.h+bus.m+index}
            />
          )}
        </BusListContainer>
      </Wrapper>
    )
  }
}

const BusListContainer = styled.div`
`;

const PosContainer = styled.div` 
  font-size: 24px;
`;

const Title = styled.div`
  font-size: 48px;
`;

const Wrapper = styled.div`
  position: relative;
  padding-top: 122px;
  width: 100%;
  z-index: 998;
  color: #707070;
`;

export default Schedule;
