import styled, { css } from 'styled-components';


interface ThemeColor {
    color: string;
}   

export default function Header(props: ThemeColor) {
  return (
    <Wrapper>
      <div className="header">
        bustimer
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fix;
  top: 0px;
  padding: 8px;
  background: #379BFF;

  .header {
    font-size: 41px;
    text-align: center;
    font-family: "ＭＳ ゴシック",sans-serif;
    color: #FFFFFF;
  }


  ${(props: ThemeColor) =>
    props.color 
    && css`
      background: props.color
    `}
`;
