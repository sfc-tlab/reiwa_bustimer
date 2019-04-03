import React, { Component, Fragment } from 'react';

import dateFormatter from '../helpers/dateFormatter';


class Widget extends Component {    

  componentWillMount () {
    this.setState({
      leftTime: { 
        h: 0, 
        m: 0, 
        s: 0
      },
      ...this.props });
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
      leftTime
    } = this.state;
    
    const nextBus = busList[0];
    const tweet = {
      url: 'https://bustimer.sfc.keioac.jp',
      text: `「${pos}発 ${('00'+nextBus.h).slice(-2)}時 ${('00'+nextBus.m).slice(-2)}分のバス」で登校なう`,
      hashtags: "登校なう,sfc,bustimer"
    };

    return (
      <div className="widget">
        {`${('00'+leftTime.m).slice(-2)}分 ${('00'+leftTime.s).slice(-2)}秒`}

        登校をつぶやく
        <a 
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          className="twitter-share-button" 
          data-size="large" 
          data-text={tweet.text} 
          data-url={tweet.url} 
          data-hashtags={tweet.hashtags}
          data-show-count="false"
        >
          Tweet
        </a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </div>
    )
  }
}

export default Widget;
