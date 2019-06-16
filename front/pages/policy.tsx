import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';


@inject("store")
@observer
export default class PrivacyPolicy extends Component {

  componentWillMount() {
    const { store } = this.props;

    store.setPath('/policy');
  }

  
  render () {
    return (
      <Wrapper>
        <div className="content">
        <h1>アクセス解析ツールについて</h1>
        <br/>

        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
        <br/>

        このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくはここをクリックしてください。
        <br/>

        <h1>免責事項</h1>
        <br/>

        当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
        <br/>

        当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
        <br/>

        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        <br/>

        プライバシーポリシーの変更について
        <br/>

        当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
        <br/>

        修正された最新のプライバシーポリシーは常に本ページにて開示されます。
        <br/>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  font-family: "ＭＳ ゴシック",sans-serif;
  padding-top: 100px;
  text-align: center;
`;
