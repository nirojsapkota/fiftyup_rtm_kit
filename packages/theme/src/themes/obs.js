import { notices, grayscale } from './colors';
import { base } from './base';

const colors = {
  green: '#22b24e',
  orange: '#ef8612',
  orangeAccent: '#e56209',
  navy: '#1566ad',
  blue: '#2d9dd6',
  blueAccent: '#82c1e0',
  yellow: '#ffed00',
  lightBlue: '#083d87',
  darkBlue: '#1b1d39',
  ...grayscale,
  ...notices,
};

const baseVariants = {
  a: {
    primary: colors.navy,
    secondary: colors.blue,
    tertiary: colors.green,
    accent: colors.orange,
    accentAccent: colors.orangeAccent,
    background: colors.white,
    text: colors.dark,
    link: colors.navy,
    inverseText: colors.white,
    linkHover: colors.orangeAccent,
    shape: colors.lightBlue,
    ...grayscale,
    ...notices,
  },
  b: {
    primary: colors.white,
    secondary: colors.white,
    tertiary: colors.white,
    accent: colors.blue,
    accentAccent: colors.blueAccent,
    background: colors.navy,
    text: colors.white,
    link: colors.lightest,
    inverseText: colors.white,
    linkHover: colors.orange,
    shape: colors.lightBlue,
    ...grayscale,
    ...notices,
  },
  c: {
    primary: colors.yellow,
    secondary: colors.white,
    tertiary: colors.white,
    accent: colors.orange,
    accentAccent: colors.orangeAccent,
    background: colors.blue,
    text: colors.white,
    link: colors.lightest,
    inverseText: colors.white,
    linkHover: colors.orangeAccent,
    shape: colors.lightBlue,
    ...grayscale,
    ...notices,
  },
};

const variants = Object.assign(baseVariants, {
  regular: {
    ...baseVariants.a,
    text: '#1566ad',
    tertiary: '#565656',
  },
});

export default {
  logoGlyph: 'obs',
  ...base,
  colors: {
    ...base.colors,
    variants,
  },
  button: {
    borderRadius: '3px',
  },
};
