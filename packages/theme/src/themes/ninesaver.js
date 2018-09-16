import { notices, grayscale } from './colors';

const sm = '32';
const md = '46';
const lg = '76';

const variants = {
  a: {
    primary: '#00b1ff',
    secondary: '#00b1ff',
    tertiary: '#0590ce',
    accent: '#e0107b',
    accentAccent: '#b91067',
    background: '#FFF',
    text: '#565656',
    link: '#333',
    inverseText: '#FFF',
    ...grayscale,
    ...notices,
  },
  b: {
    primary: '#ffffff',
    secondary: '#FFF',
    tertiary: '#FFF',
    accent: '#e0107b',
    accentAccent: '#b91067',
    background: '#00b1ff',
    text: '#FFF',
    link: '#f5f5f5',
    inverseText: '#FFF',
    ...grayscale,
    ...notices,
  },
  c: {
    primary: '#ffffff',
    secondary: '#FFF',
    tertiary: '#FFF',
    accent: '#e0107b',
    accentAccent: '#b91067',
    background: '#00b1ff',
    text: '#FFF',
    link: '#f5f5f5',
    inverseText: '#FFF',
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
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  variant: 'a',
  fonts: {
    serif: 'Museo',
    sansSerif: 'MuseoSans',
  },
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
    borderRadius: '50px',
    bottomBorderWidth: '2px',
  },
};
