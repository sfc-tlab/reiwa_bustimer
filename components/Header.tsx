import styled, { css } from 'styled-components';


interface ThemeColor {
    color: string;
}   

export default function Header(props: ThemeColor) {
  return (
    <Wrapper>
      <h6 className="header">
        bustimer
      </h6>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 76px;
  background: #379BFF;

  .header {
    font-size: 41px;
    color: #FFFFFF;
  }


  ${(props: ThemeColor) =>
    props.color 
    && css`
      background: props.color
    `}
`;
