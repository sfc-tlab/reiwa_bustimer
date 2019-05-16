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
        <div
          className="twitter-button"
          onClick={this.postTweet} 
        >
          <span className="button-text"> {children} </span>
          <img 
            className="twitter-icon" 
            src={"/static/img/twitter-icon.svg"}
            alt="twitter-icon"
          />
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.span`
  .twitter-button {
    display: inline-block;
    padding: 8px 3px 0px 3px;
    border-radius: 3px;
    border: 2px solid #1b95e0;
    color: #FFFFFF;
    background: #1b95e0;
  }

  .twitter-icon {
    top: 3px;
    display: inline;
  }

  .button-text {
    position: relative;
    bottom: 4px;
    font-weight: bold;
    display: inline;
  }
`;



export default TweetButton;
