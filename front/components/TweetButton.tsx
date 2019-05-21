import React, { Component } from 'react';
import styled from 'styled-components';


class TweetButton extends Component {    

  private componentWillMount () {
    this.setState({ ...this.props });
  }

  private componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  } 

  public render () {
    const { children } = this.state;
    let url = "https://twitter.com/share?";
    const params = {
      "text": this.state.text,
      "url": this.state.tweetUrl,
      "hashtags": this.state.hashtags,
      "via": this.state.via,
    }
    Object.keys(params).forEach(key => url+=`${key}=${params[key]}&`);

    return (
      <Wrapper>
        <a className="twitter-button" href={url}>
          <span className="button-text"> {children} </span>
          <img 
            className="twitter-icon" 
            src={"/static/img/twitter-icon.svg"}
            alt="twitter-icon"
          />
        </a>
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
    text-decoration: none;
  }

  .twitter-icon {
    padding-bottom: 10px;
  }

  .button-text {
    position: relative;
    bottom: 4px;
    font-weight: bold;
    display: inline;
  }
`;



export default TweetButton;
