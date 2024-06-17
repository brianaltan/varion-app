import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background-color: #000; // Set default background color to black
    overflow-x: hidden; // Hide horizontal scrollbar
  }

  body {
    font-family: 'Arial', sans-serif;
    background: #fff;
    color: #333;
  }
`;

export default GlobalStyle;
