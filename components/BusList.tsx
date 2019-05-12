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
          <div className="bus-card-container">
            {store.leftBuses.length?(
              store.leftBuses.map(bus => {
                return(
                  <BusCard
                    bus={bus}
                    key={''+bus.h+bus.m}
                  />
                );
              })
            ):(
              <Fragment>
                本日のバスは終了しました。
              </Fragment>
            )}
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .bus-list {
    margin: 24px;
    padding: 20px;
    border-radius: 3px;
    border-top: 1px solid #000; 
    border-left: 1px solid #000; 
    border-right: 1px solid #000; 
    border-bottom: 1px solid #000;
  }
`;

export default BusList;
