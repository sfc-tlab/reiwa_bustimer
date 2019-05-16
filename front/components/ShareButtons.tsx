import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { inject, observer } from "mobx-react";

import TweetButton from './TweetButton';


@inject("store")  
@observer
class ShareButtons extends Component {    

  render () {
    const { store } = this.props;

    return (
      <Wrapper>
        <span className="tweet-button toukou">
          <TweetButton 
            size="large" 
            text={store.tweetText} 
            tweetUrl={store.bustimerUrl} 
            hashtags={store.tweetHashtags}
            countFlag="false"
            via="bustimer"
          >
            {store.wayToSchool}なう
          </TweetButton>
        </span>

        <span className="tweet-button taxi">
          <TweetButton 
            size="large" 
            text={store.taxiText} 
            tweetUrl={store.bustimerUrl} 
            hashtags={store.taxiHashtags}
            countFlag="false"
            via="bustimer"
          >
            相乗り募集
          </TweetButton>
        </span>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  text-align: center;
  font-family: "ＭＳ ゴシック",sans-serif;

  .tweet {
    display: inline-block;
    width: 50%;
    padding: 20px;
  }

  .tweet-button {
    padding: 10px;
  }
`;

export default ShareButtons;
