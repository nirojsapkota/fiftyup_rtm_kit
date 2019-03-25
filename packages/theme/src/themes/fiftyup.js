import { grayscale, notices } from './colors';
import { base } from './base';

const colors = {
  lightBlue: '#083d87',
  darkBlue: '#1b1d39',
  ...grayscale,
  ...notices,
};

const iconColors = {
  iconPrimary: '#f4b534',
};

const baseVariants = {
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
    ...iconColors,
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
    ...iconColors,
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
    ...iconColors,
  },
};

const variants = Object.assign(baseVariants, {
  regular: {
    ...baseVariants.a,
    secondary: '#1b1d39',
    text: '#1b1d39',
    tertiary: '#646464',
  },
})

export default {
  logoGlyph: 'fiftyup',
  ...base,
  colors: {
    ...base.colors,
    variants,
  },
};
