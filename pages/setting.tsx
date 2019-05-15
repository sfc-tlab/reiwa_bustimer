import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import styled, { css } from 'styled-components';


@inject("store")
@observer
class Setting extends Component {
  render () {
    return (
      <Wrapper>
        <div className="setting">
          設定画面がここにくる
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 74px;
  width: 100%;
  z-index: 998;
`;

export default Setting;
