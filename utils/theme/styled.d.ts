import 'styled-components';

type TColors = {
  primary: string;
  secondary: string;
  text: string;
}

declare module 'styled-components' {
  export interface TTheme {
    colors: TColors;
  }
}