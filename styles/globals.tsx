import { createGlobalStyle, TTheme } from 'styled-components';
import { rgba } from '@utils/helpers';
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

  article.content {
    .notion {
      max-width: 100%;
    }

    h1.notion-h1, 
    h2.notion-h2, 
    h3.notion-h3 {
      font-family: ${({ theme }) => theme.fonts.heading };
      color: ${({ theme }) => theme.colors.heading };
    }

    h1.notion-h1 {
      font-size: 50px;
      line-height: 60px;
      letter-spacing: -2px;
      text-align: center;
      margin-bottom: 0;
      
      @media (min-width: 1024px) {
        font-size: 80px;
        line-height: 90px;
      } 
    }

    p.notion-text s {
      text-decoration: none;
      position: relative;
      display: inline-block;

      &:after {
        position: absolute;
        content: '';
        width: 100%;
        height: 30%;
        left: 0;
        bottom: 15%;
        background: ${({ theme }: { theme: TTheme }) => rgba(theme.colors.highlight, '0.8')};
      }
    }

    p.notion-text,
    blockquote.notion-quote,
    ul.notion-list li {
      font-family: ${({ theme }) => theme.fonts.text };
      font-size: 16px;
      line-height: 33px;
      letter-spacing: 0.25px;
      color: ${({ theme }) => theme.colors.text};

      @media (min-width: 1024px) {
        font-size: 18px;
      }
    }
    
    .notion-list {
      font-family: ${({ theme }) => theme.fonts.text };
      font-size: 16px;
      color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
    }

    blockquote.notion-quote {
      background: ${({ theme }: { theme: TTheme }) => theme.colors.secondary};
      border-radius: 4px;
      margin-bottom: 22px;
    }

    h2.notion-h2 {
      margin-bottom: 26px;
      padding-top: 25px;
      font-size: 30px;
    }
  }

  section.hero-section {
    display: flex;
    align-items: center;

    h1.notion-h1 {
      font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.secondary};
      color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
      font-size: 40px;
    }
    
    p.notion-text {
      font-family: ${({ theme }: { theme: TTheme }) => theme.fonts.text};
      color: ${({ theme }: { theme: TTheme }) => theme.colors.text};
      font-size: 20px;
    }
  }

`

export default GlobalStyle;