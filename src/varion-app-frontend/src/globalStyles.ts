import { createGlobalStyle } from 'styled-components';
import RalewayMedium from './fonts/Raleway-Medium.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'RalewayMedium';
    src: url(${RalewayMedium}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    overflow-x: hidden; // Hide horizontal scrollbar
  }

  body {
    font-family: 'RalewayMedium', sans-serif; /* Apply the font to the body */
    background-color: #000; /* Set default background color to black */
    color: #333;
  }
`;

export default GlobalStyle;