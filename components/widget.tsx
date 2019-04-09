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
      taxiText: `「${pos}発 ${('00'+nextBus.h).slice(-2)}時 ${('00'+nextBus.m).slice(-2)}分のバス」待ちのタクシー相乗りメンバー募集中`,
    })
  }

  render () {
    const { 
      busList,
      nowDateTime,
      pos,
      leftTime,
      tweetText,
      taxiText,
    } = this.state;
    
    const tweetUrl = 'https://bustimer.sfc.keioac.jp';
    const tweetHashtags = 'bustimer,登校なう';
    const taxiHashtags = 'bustimer,SFC通学相乗り募集';

    return (
      <div className="widget">
        次のバスまで
        <br />
        {`${leftTime.m}分 ${('00'+leftTime.s).slice(-2)}秒`}
        <br />
        <span className="tweet-toukou">
          <div className="tweet-toukou-text">
            登校をつぶやく
          </div>
          <TweetButton 
            size="large" 
            text={tweetText} 
            tweetUrl={tweetUrl} 
            hashtags={tweetHashtags}
            countFlag="false"
            via="bustimer"
          >
            登校なう
          </TweetButton>
        </span>
        <span className="tweet-taxi">
          <div className="tweet-taxi-text">
            タクシーの相乗り募集をする
          </div>
          <TweetButton 
            size="large" 
            text={tweetText} 
            tweetUrl={tweetUrl} 
            hashtags={taxiHashtags}
            countFlag="false"
            via="bustimer"
          >
            相乗り募集
          </TweetButton>
        </span>
      </div>
    )
  }
}

export default Widget;
