import 'styled-components';

type TFonts = {
  heading: string;
  text: string;
  secondary: string;
}

type TColors = {
  primary: string;
  secondary: string;
  text: string;
  heading: string;
  background: string;
  highlight: string;
}

declare module 'styled-components' {
  export interface TTheme {
    fonts: TFonts;
    colors: TColors;
  }
}