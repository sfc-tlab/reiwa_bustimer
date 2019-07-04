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
        <div className="twwet-description">
          バスの混雑状況をシェアできます
        </div>

        <span className="tweet-button toukou">
          <TweetButton 
            size="large" 
            text={store.busKaitekiText} 
            tweetUrl={store.bustimerUrl} 
            hashtags={store.tweetHashtags}
            countFlag="false"
            via="bustimer"
          >
            快適なう
          </TweetButton>
        </span>

        <span className="tweet-button taxi">
          <TweetButton 
            size="large" 
            text={store.busKonzatuText} 
            tweetUrl={store.bustimerUrl} 
            hashtags={store.taxiHashtags}
            countFlag="false"
            via="bustimer"
          >
            混雑なう
          </TweetButton>
        </span>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  text-align: center;
  font-family: "ＭＳ ゴシック",sans-serif;

  .tweet-description {
    color: #707070;
  }

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
