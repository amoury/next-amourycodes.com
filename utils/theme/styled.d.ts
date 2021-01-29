import 'styled-components';

interface TFonts {
  heading: string;
  text: string;
  secondary: string;
}

declare module 'styled-components' {
  export interface TTheme {
    fonts: TFonts;
    colors: TColors;
    isDarkMode: boolean;
  }

  export interface TColors {
    primary: string;
    secondary: string;
    text: string;
    heading: string;
    background: string;
    highlight: string;
    link: string;
  }
}