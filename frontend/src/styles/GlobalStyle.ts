import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #0f0b16;
    color: #e0e0e0;
    font-family: sans-serif;
  }
`;

export default GlobalStyle;
