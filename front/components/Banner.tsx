import React, { Component } from 'react';
import styled from 'styled-components';


class Banner extends Component {
  state = { isClose: false }
  render () {
    return (
      <Wrapper isClose={this.state.isClose}>
        <CloseBtnContainer 
          onTouchEnd={(e)=>{this.setState({isClose: true})}}
          onClick={(e)=>{this.setState({isClose: true})}}
        >
          <CloseBtn>×</CloseBtn>
        </CloseBtnContainer>
        <Text>
          <div>年末年始はダイヤ変更により正常に表示されない事があります。</div>
          <div>正確な時刻は<a href="http://www.kanachu.co.jp/dia/transfer/search?s=%E6%85%B6%E5%BF%9C%E5%A4%A7%E5%AD%A6&stt=0&g=&glt=0&x=0&y=0&sdid1=00129985&sdid2=">神奈川中高交通HP</a>をご覧ください。</div>
        </Text>
        <Text>
          <div>There are some possibilities to display incorrect information because of the New Year Holidays.</div>
          <div>Please check the <a href="http://www.kanachu.co.jp/dia/transfer/search?s=%E6%85%B6%E5%BF%9C%E5%A4%A7%E5%AD%A6&stt=0&g=&glt=0&x=0&y=0&sdid1=00129985&sdid2=">Kanagawa Chuo Kotsu HP</a>to get the correct information.</div>
        </Text>
      </Wrapper>
    );
  }
}


const CloseBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseBtn = styled.span`
  border: 1px solid;
  font-size: 14px;
  width: 18px;
  padding-left: 4px;
  margin-right: 1%;
  margin-top: 1%;
`;

const Text = styled.p`
  color: #000;
  text-align: center;
`;

const Wrapper = styled.div`
  display: ${props => props.isClose? 'none' : ''};
  position: fixed;
  background-color: rgba(255, 241, 240, 0.5);
  width: 100%;
  bottom: 0px;
`;

export default Banner;

