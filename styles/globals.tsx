import { createGlobalStyle, TTheme } from 'styled-components';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css"

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: MaisonNeue-Bold;
    src: url(/assets/fonts/MaisonNeue-Bold.woff2) format("woff2"),url(/assets/fonts/MaisonNeue-Bold.woff) format("woff");
    font-weight: 700;
    font-style: bold;
    font-display: swap;
  }
  @font-face {
    font-family: Merriweather-Regular;
    src: url(/assets/fonts/Merriweather-Regular.ttf) format("truetype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: FrieghtSans-Regular;
    src: url(/assets/fonts/FreightSans-Book.otf) format("opentype");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }: { theme: TTheme }) => theme.colors.background};
  }

`

export default GlobalStyle;