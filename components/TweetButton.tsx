import React, { Component } from 'react';


class TweetButton extends Component {    

  componentWillMount () {
    this.setState({ ...this.props });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  } 

  postTweet = () => {
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

  render () {
    const { children } = this.state;

    return (
      <div className="tweet-button"
        onClick={this.postTweet} 
      >
        {children}
      </div>
    )
  }
}

export default TweetButton;
