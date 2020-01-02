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
      "url": this.state.tweetUrl || "https://bustimer.keioac.jp",
      "hashtags": this.state.hashtags,
      "via": this.state.via || "bustimer",
    }
    Object.keys(params).forEach(key => url+=`${key}=${params[key]}&`);

    return (
      <Wrapper>
        <a className="twitter-button" href={url}>
          <span className="button-text"> {children} </span>
          <img 
            className="icon-twitter" 
            src={"/static/img/icon-twitter.svg"}
            alt="icon-twitter"
          />
        </a>
      </Wrapper>
    )
  }
}

const Wrapper = styled.span`
  .twitter-button {
    margin: 0 5px;
    display: flex;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 17.5px;
    color: #FFFFFF;
    background: #1b95e0;
    text-decoration: none;
    text-align: center;
  }

  .icon-twitter {
    display: block;
    width: 20px;
    margin: 0 auto;
  }

  .button-text {
    position: relative;
    bottom: 4px;
    font-weight: bold;
    display: inline;
  }
`;



export default TweetButton;
