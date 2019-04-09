import React, { Component, Fragment } from 'react';

import TweetButton from './TweetButton';
import dateFormatter from '../helpers/dateFormatter';


class Widget extends Component {    
  state = {}

  componentWillMount () {
    this.setState({
      leftTime: { 
        h: 0, 
        m: 0, 
        s: 0
      },
      ...this.props 
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateLeftTime(nextProps);
  } 

  updateLeftTime (nextProps) {
    const { 
      busList,
      nowDateTime,
      pos,
    } = nextProps;
    const nextBus = busList[0];
    const date = nowDateTime
    let leftMinute, leftSecond;
    leftSecond = 60 - date.second;
    if (nextBus.h > date.hour){
      leftMinute = ((nextBus.h - date.hour) * 60)
        - date.minute
        + nextBus.m - 1; 
    } else {
      leftMinute = nextBus.m - date.minute -1; 
    }
    this.setState({
      leftTime: {
        m: leftMinute,
        s: leftSecond
      },
      tweetText: `「${pos}発 ${('00'+nextBus.h).slice(-2)}時 ${('00'+nextBus.m).slice(-2)}分のバス」で登校なう`,
    })
  }

  render () {
    const { 
      busList,
      nowDateTime,
      pos,
      leftTime,
      tweetText,
    } = this.state;
    
    const tweetUrl = 'https://bustimer.sfc.keioac.jp';
    const hashtags = 'bustimer,登校なう';

    return (
      <div className="widget">
        次のバスまで
        <br />
        {`${leftTime.m}分 ${('00'+leftTime.s).slice(-2)}秒`}
        <br />
        登校をつぶやく
        <TweetButton 
          size="large" 
          text={tweetText} 
          tweetUrl={tweetUrl} 
          hashtags={hashtags}
          countFlag="false"
          via="bustimer"
        >
          Tweet
        </TweetButton>
      </div>
    )
  }
}

export default Widget;
