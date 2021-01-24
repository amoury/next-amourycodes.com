import 'styled-components';

type TFonts = {
  heading: string;
  text: string;
}

type TColors = {
  primary: string;
  secondary: string;
  text: string;
  heading: string;
}

declare module 'styled-components' {
  export interface TTheme {
    fonts: TFonts;
    colors: TColors;
  }
}