import { TTheme, TColors } from 'styled-components';

const lightTheme: TColors = {
  primary: '#E63A2D',
  secondary: '#F6EEE3',
  text: '#334259',
  heading: '#233143',
  background: '#F1F1F1',
  highlight: '#FFFF00',
  link: '#0018ff'
}

const darkTheme: TColors = {
  primary: '#4CFF00',
  secondary: '#0B2027',
  text: '#F6F1D1',
  heading: '#F6F1D1',
  background: '#0B2027',
  highlight: '#FFFF00',
  link: '#0018ff'
}

const baseTheme: TTheme = {
  fonts: {
    heading: `'MaisonNeue-Bold', sans-serif`,
    text: `'Merriweather-Regular', serif`,
    secondary: `'FrieghtSans-Regular', sans-serif`,
  },
  colors: lightTheme,
  isDarkMode: false,
}

const theme = (isDarkMode = false): TTheme => {
  return isDarkMode ? { ...baseTheme, isDarkMode, colors: darkTheme } : { ...baseTheme, isDarkMode, colors: lightTheme };
}

export default theme;