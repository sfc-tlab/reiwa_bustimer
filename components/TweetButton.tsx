import React, { Component } from 'react';
import styled, { css } from 'styled-components';


const styles = {
  logo: {
    margin: 0,
    color: '#1b95e0',
  }
};

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
      <Button
        onClick={this.postTweet} 
      >
        {children}
        <Icon 
          src="/static/img/twitter-icon.svg" 
        />
      </Button>
    )
  }
}

const Button = styled.button`
  border-radius: 3px;
  border: 2px solid #1b95e0;
  color: #1b95e0;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const Icon = styled.img`
  coler: #1b95e0;
  size: 100px;
`;


export default TweetButton;
