import { grayscale, notices } from './colors';
import { base } from './base';

const colors = {
  ...grayscale,
  ...notices,
};

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
    shape: colors.darkBlue,
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
    shape: colors.darkBlue,
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
    shape: colors.darkBlue,
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
};
