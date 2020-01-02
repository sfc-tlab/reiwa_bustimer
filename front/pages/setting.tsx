import React, { Component } from "react";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import styled, { css } from "styled-components";

import GitHubButton from "react-github-btn";

@inject("store")
@observer
class Setting extends Component {
  componentWillMount() {
    const { store } = this.props;

    store.setPath("/", "/setting");
  }

  jumpTo = (e, path) => {
    const { store } = this.props;
    e ? e.preventDefault() : null;
    store.setPath(path);
    Router.push(path);
  };

  render() {
    return (
      <Wrapper>
        <Title>Settings</Title>
        <Content>
          <div className="setting">
            <p>Coming Soon</p>
          </div>
        </Content>
        <Title>Contact Us</Title>
        <Content>
          <p>
            開発への参加、バグの報告、機能追加要望等は以下からお願いいたします。
          </p>
          <Follow>
            <a href="https://lab.keioac.jp/" className="follow dev-team">
              <img
                className="icon-dev"
                src={"/static/img/icon-dev.svg"}
                alt="icon-dev"
              />
              <span>慶應義塾大学SFC 武田研究室</span>
            </a>
          </Follow>
          <Follow>
            <a
              href="https://twitter.com/bustimer?ref_src=twsrc%5Etfw"
              className="follow twitter"
            >
              <img
                className="icon-twitter"
                src={"/static/img/icon-twitter.svg"}
                alt="icon-twitter"
              />
              <span>Follow @bustimer</span>
            </a>
          </Follow>
          <h2>GitHub</h2>
          <Follow>
            <a href="https://github.com/sfc-tlab" className="follow github">
              <img
                className="icon-github"
                src={"/static/img/icon-github.svg"}
                alt="icon-github"
              />
              <span>Follow @sfc-tlab</span>
            </a>
          </Follow>
          <a
            className="github-buttons"
            href="https://github.com/sfc-tlab/reiwa_bustimer/fork"
          >
            Fork Repository
          </a>
          <a
            className="github-buttons"
            href="https://github.com/sfc-tlab/reiwa_bustimer/issues/new/choose"
          >
            Make Issue
          </a>
        </Content>
        <Title>プライバシーポリシー</Title>
        <Content>
          <h2>アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくはここをクリックしてください。
          </p>
          <h2>免責事項</h2>
          <p>
            当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
            当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            プライバシーポリシーの変更について
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
        </Content>
      </Wrapper>
    );
  }
}

const Title = styled.div`
  font-size: 30px;
  padding: 30px 15px 15px;
`;

const Content = styled.div`
  padding: 0 15px;

  h2 {
    margin: 0;
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    margin-bottom: 1rem;
  }

  .github-buttons {
    font-size: 14px;
    color: black;
    text-decoration: none;
    margin-right: 5px;
    padding: 2px 5px;
    background-color: #eff3f6;
    border: 0.5px solid rgba(27, 31, 35, 0.2);
    border-radius: 2.5px;
  }
`;

const Follow = styled.p`
  a {
    display: flex;
    align-items: center;
    width: fit-content;
    height: 25px;
    border-radius: 5px;
    padding: 0 10px;
    text-decoration: none;
  }

  .dev-team {
    background-color: #008202;
  }

  .github {
    background-color: black;
  }

  .twitter {
    background-color: #1b95e0;
  }

  a img {
    width: 14px;
    display: block;
    margin-right: 5px;
  }

  a span {
    display: block;
    color: white;
    font-size: 12px;
    line-height: 20px;
    font-weight: bold;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding: 60px 0px;
  width: 100%;
  z-index: 998;
  color: #707070;

  .link {
    padding: 20px;
  }

  .link:active {
    color: #26a69a;
  }

  .logo {
    height: 40px;
  }
`;

export default Setting;
