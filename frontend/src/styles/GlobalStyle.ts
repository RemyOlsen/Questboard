import { createGlobalStyle } from "styled-components";

type GlobalStyleProps = {
  theme: {
    colors: {
      background: string;
      text: string;
    };
  };
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: sans-serif;
  }
`;

export default GlobalStyle;
