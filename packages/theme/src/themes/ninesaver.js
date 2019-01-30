import { notices, grayscale } from './colors';
import { base } from './base';

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
    linkHover: '#b91067',
    shape: '#e1107b',
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
    link: '#EEE',
    inverseText: '#FFF',
    linkHover: '#b91067',
    shape: '#e1107b',
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
    linkHover: '#b91067',
    shape: '#e1107b',
    ...grayscale,
    ...notices,
  },
};

export default {
  ...base,
  colors: {
    ...base.colors,
    variants,
  },
  button: {
    ...base.button,
    borderRadius: '50px',
    bottomBorderWidth: '2px',
  },
};
