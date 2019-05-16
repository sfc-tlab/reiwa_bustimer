import React, { Component, Fragment} from 'react';
import { inject, observer } from "mobx-react";
import styled from 'styled-components';

import BusCard from './BusCard';


@inject("store")
@observer
class BusList extends Component {    

  render () {
    const { store } = this.props;

    return (
      <Wrapper>
        <div className="bus-list">
          {store.leftBuses.length?
            <div className="bus-card-container">
                {store.leftBuses.map(bus => 
                    <BusCard
                      bus={bus}
                      key={''+bus.h+bus.m}
                    />
                )}
            </div>
          :(
            <Fragment>
              本日のバスは終了しました。
            </Fragment>
          )}
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  z-index: 995;
  .bus-card-container {
    border-top: 1px solid #707070; 
  }
`;

export default BusList;
