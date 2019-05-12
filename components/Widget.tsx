import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";

import TweetButton from './TweetButton';
import dateFormatter from '../helpers/dateFormatter';


@inject("store")  
@observer
class Widget extends Component {    

  render () {
    const { store } = this.props;
    
    const tweetUrl = 'https://bustimer.sfc.keioac.jp';
    const tweetHashtags = 'bustimer,登校なう';
    const taxiHashtags = 'bustimer,SFC生相乗り募集';

    function CheckWayToSchool() {
      if (store.from === 'sfc') {
        return '下校';
      } else {
        return '登校';
      }
    }
    console.log(store.leftTime.s)

    function LeftTime() {
      if (store.leftBuses.length) {
        return `${store.leftTime.m}分 ${('00'+store.leftTime.s).slice(-2)}秒`
      }
      return '';
    }
    
    return (
      <Wrapper>
        <div className="widget">
          { !store.leftBuses.length &&
            <div className="widget-message">
              本日のバスは終了しました。
            </div>
          }
          <br />
          {store.fromStr} -> {store.toStr}
          <br />
          <LeftTime />
          <br />
          <button 
            className="swap-pos-button"
              onClick={()=>{store.setFromTo(store.to, store.from)}}>
            {"<->"}
          </button>
        </div>
        <br />
        <span className="tweet-toukou">
          <div className="tweet-toukou-text">
            <CheckWayToSchool />をつぶやく
          </div>
          <TweetButton 
            size="large" 
            text={store.tweetText} 
            tweetUrl={tweetUrl} 
            hashtags={tweetHashtags}
            countFlag="false"
            via="bustimer"
          >
            <CheckWayToSchool />なう
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

const Wrapper = styled.div`
  .widget {
    margin: 24px;
    padding: 15px;
    border-radius: 3px;
    border: 1px solid #000; 
  }
`;

export default Widget;
