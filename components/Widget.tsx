import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";

import TweetButton from './TweetButton';
import dateFormatter from '../helpers/dateFormatter';


@inject("store")  
@observer
class Widget extends Component {    

  componentDidmount() {
    const { store } = this.props;
    store.setLoading(false);
  }

  render () {
    const { store } = this.props;
    
    const tweetUrl = 'https://bustimer.sfc.keioac.jp';
    const tweetHashtags = 'bustimer,登校なう';
    const taxiHashtags = 'bustimer,SFC生相乗り募集';
    
    if (!store.leftBuses.length) {
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
            {`${store.leftTime.m}分 ${('00'+store.leftTime.s).slice(-2)}秒`}
            <br />
            <div 
              className="from-to-switch"
              onClick={store.setFromTo(store.to, store.from)}
            >
              {"<->"}
            </div>
          </div>
          <br />
          <span className="tweet-toukou">
            <div className="tweet-toukou-text">
              登校をつぶやく
            </div>
            <TweetButton 
              size="large" 
              text={store.tweetText} 
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
              text={store.taxiText} 
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
