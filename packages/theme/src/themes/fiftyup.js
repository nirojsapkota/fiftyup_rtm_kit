import { grayscale, notices } from './colors';
import { base } from './base';

const colors = {
  lightBlue: '#083d87',
  darkBlue: '#1b1d39',
  ...grayscale,
  ...notices,
};

const variants = {
  a: {
    primary: '#00005e',
    secondary: '#cacaca',
    tertiary: '#1b1d39',
    accent: '#f4b534',
    accentAccent: '#bc8a23',
    background: '#FFF',
    text: colors.dark,
    link: colors.darkest,
    inverseText: colors.white,
    linkHover: '#bc8a23',
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
    linkHover: '#eab039',
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
    linkHover: '#ef8612',
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
