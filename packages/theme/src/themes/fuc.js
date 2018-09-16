import { grayscale, notices } from './colors';

const colors = {
  ...grayscale,
  ...notices,
};

const sm = '32';
const md = '46';
const lg = '76';

const variants = {
  a: {
    primary: '#1b1d39',
    secondary: '#cacaca',
    tertiary: '#1566ad',
    accent: '#1b1d39',
    accentAccent: '#0f1020',
    background: '#FFF',
    text: colors.dark,
    link: colors.darkest,
    inverseText: colors.white,
    ...grayscale,
    ...notices,
  },
  b: {
    primary: '#FFF',
    secondary: '#FFF',
    tertiary: '#FFF',
    accent: '#eab039',
    accentAccent: '#c59531',
    background: '#1b1d39',
    text: colors.white,
    link: colors.lightest,
    inverseText: colors.white,
    ...grayscale,
    ...notices,
  },
  c: {
    primary: '#1b1d39',
    secondary: '#FFF',
    tertiary: '#FFF',
    accent: '#1b1d39',
    accentAccent: '#111224',
    background: '#eab039',
    text: colors.white,
    link: colors.lightest,
    inverseText: colors.white,
    ...grayscale,
    ...notices,
  },
};

export default {
  breakpoints: [`${sm}em`, `${md}em`, `${lg}em`],
  grid: {
    sm,
    md,
    lg,
  },
  variant: 'a',
  fonts: {
    serif: 'Museo',
    sansSerif: 'MuseoSans',
  },
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  colors: {
    variants,
    grayscale,
    social: {
      facebook: '#3B5998',
      twitter: '#00ACED',
    },
  },
  borderRadius: '4px',
  button: {
    borderRadius: '3px',
    bottomBorderWidth: '4px',
  },
};
