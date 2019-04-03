import React, { Component, Fragment } from 'react';

import dateFormatter from '../helpers/dateFormatter';


class Widget extends Component {    
  state = {leftTime: {h: 0, m: 0, s: 0}}

  componentDidMount () {
    this.updateLeftTime();
  }

  updateLeftTime () {
    const { 
      busList,
      nowDateTime,
      pos,
    } = this.props;
    const nextBus = busList[0];
    // const date = dateFormatter.toDateObj(new Date());
    const date = nowDateTime;
    let leftMinute, leftSecond;
    leftSecond = 60 - date.second;
    if (nextBus.h > date.hour){
      leftMinute = 60-date.minute
        + nextBus.m; 
    } else {
      leftMinute = nextBus.m - date.minute; 
    }
    this.setState({
      leftTime: {
        m: leftMinute,
        s: leftSecond
      }
    })
  }

  render () {
    const { 
      busList,
      nowDateTime,
      pos,
    } = this.props;

    const { leftTime } = this.state;

    return (
      <div className="widget">
        {`${leftTime.m}分${leftTime.s}秒`}

        登校をつぶやく
        <button>
          Twitter
        </button>
      </div>
    )
  }
}

export default Widget;
