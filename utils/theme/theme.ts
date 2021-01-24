import { TTheme } from 'styled-components';

const lightTheme = {
  colors: {
    primary: '#E63A2D',
    secondary: '#F6EEE3',
    text: '#334259',
    heading: '#233143'
  }
}

const darkTheme = {
  colors: {
    primary: '#4CFF00',
    secondary: '#0B2027',
    text: '#F6F1D1',
    heading: '#F6F1D1',
  }
}

const theme: TTheme = {
  fonts: {
    heading: 'MaisonNeue-Bold',
    text: 'Merriweather-Regular'
  },
  colors: {
    primary: '#E63A2D',
    secondary: '#F6EEE3',
    text: '#334259',
    heading: '#233143' 
  }
}

export default theme;