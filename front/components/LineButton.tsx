import React, { Component } from "react";
import styled from "styled-components";

class LineButton extends Component {
  private componentWillMount() {
    this.setState({ ...this.props });
  }

  private componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  public render() {
    let url = "line://msg/text/";
    let text = this.state.text;

    return (
      <Wrapper>
        <a className="line-button" href={url + text}>
          <img
            className="line-icon"
            src={"/static/img/icon-line.svg"}
            alt="Share on LINE"
          />
        </a>
      </Wrapper>
    );
  }
}

const Wrapper = styled.span`
  .line-button {
    margin: 0 5px;
    display: flex;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 17.5px;
    color: #ffffff;
    background: #1b95e0;
    text-decoration: none;
    text-align: center;
  }

  .line-icon {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  .button-text {
    position: relative;
    bottom: 4px;
    font-weight: bold;
    display: inline;
  }
`;

export default LineButton;
