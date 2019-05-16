import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';


@inject("store")  
@observer
class Schedule extends Component {    

  componentWillMount(){
    const { store } = this.props;
    store.screenName = 'schedule';
  }

  render () {
    return (
      <Wrapper>
        <div className="time-schedule">
          時刻表がここにくる
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 122px;
  width: 100%;
  z-index: 998;
`;

export default Schedule;
