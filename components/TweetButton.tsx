import React, { Component } from 'react';
import styled from 'styled-components';


class TweetButton extends Component {    

  private componentWillMount () {
    this.setState({ ...this.props });
  }

  private componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  } 

  private postTweet = () => {
    let url = "https://twitter.com/share?";
    const params = {
      "text": this.state.text,
      "url": this.state.tweetUrl,
      "hashtags": this.state.hashtags,
      "via": this.state.via,
    }
    Object.keys(params).forEach(key => url+=`${key}=${params[key]}&`)
    window.open(url);
  }

  public render () {
    const { children } = this.state;

    return (
      <Wrapper>
        <button
          className="twitter-button"
          onClick={this.postTweet} 
        >
          <span className="button-text"> {children} </span>
          <div className="twitter-icon" />
        </button>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .twitter-button {
    border-radius: 3px;
    border: 2px solid #1b95e0;
    color: #FFFFFF;
    background: #1b95e0;
  }

  .twitter-icon {
    padding 20px 20px 20px 20px;
    background-color: #FFFFFF;
    -webkit-mask: url(/static/img/twitter-icon.svg) no-repeat center;
    mask: url(/static/img/twitter-icon.svg) no-repeat center;
    display: inline-block;
  }

  .button-text {
    position: relative;
    bottom: 15px;
    font-weight: bold;
    display: inline-block;
  }
`;



export default TweetButton;
