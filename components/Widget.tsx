import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";

import TweetButton from './TweetButton';
import dateFormatter from '../helpers/dateFormatter';


@inject("store")  
@observer
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

  componentDidmount() {
    this.props.store.setLoading(false);
  }

  componentWillReceiveProps(nextProps) {
    this.updateLeftTime(nextProps);
  } 

  updateLeftTime (nextProps) {
    const { store } = this.props;
    const { 
      busList,
      nowDateTime,
    } = nextProps;
    if (busList.length) {
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
        tweetText: `「${store.fromStr}発 ${('00'+nextBus.h).slice(-2)}時 ${('00'+nextBus.m).slice(-2)}分のバス」で登校なう`,
        taxiText: `「${store.fromStr}発 ${('00'+nextBus.h).slice(-2)}時 ${('00'+nextBus.m).slice(-2)}分のバス」待ちのタクシー相乗りメンバー募集中`,
      })
    }
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
    const taxiHashtags = 'bustimer,SFC生相乗り募集';
    
    if (!busList.length) {
      return (
        <Wrapper>
          <div className="widget">
            <div className="widget-message">
              本日のバスは終了しました。
            </div>
          </div>
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <div className="widget">
            SFC ▶︎ 湘南台
            <br />
            {`${leftTime.m}分 ${('00'+leftTime.s).slice(-2)}秒`}
          </div>
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
        </Wrapper>
      )
    }
  }
}

const Wrapper = styled.div`
  .widget {
    margin: 30px;
    padding: 15px;
    border-radius: 3px;
    border: 1px solid #000; 
  }
`;

export default Widget;
