import { notices, grayscale } from './colors';
import { base } from './base';

const colors = {
  green: '#dedede',
  orange: '#dedede',
  orangeAccent: '#585858',
  navy: '#6b6b6b',
  blue: '#6b6b6b',
  blueAccent: '#545454',
  yellow: '#e8e8e8',
  footerDark: '#545454',
  lightBlue: '#adadad',
  darkBlue: '#545454',
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
  d: {
    primary: colors.navy,
    secondary: colors.blue,
    tertiary: colors.green,
    accent: colors.orange,
    accentAccent: colors.orangeAccent,
    background: colors.footerDark,
    text: colors.white,
    link: colors.lightest,
    inverseText: colors.white,
    linkHover: colors.orange,
    shape: colors.lightBlue,
    ...grayscale,
    ...notices,
  },
};

const variants = Object.assign(baseVariants, {
  e: {
    ...baseVariants.a,
    text: colors.orange,
    secondary: colors.orangeAccent,
  },
  f: {
    ...baseVariants.a,
    secondary: colors.orange,
  },
  g: {
    ...baseVariants.a,
    accent: '#545454',
    link: '#fff',
    linkHover: '#fff',
  },
  h: {
    ...baseVariants.a,
    background: colors.orange,
    text: colors.white,
    primary: colors.white,
  },
  i: {
    ...baseVariants.a,
    background: colors.navy,
    primary: colors.orange,
    text: colors.white,
  },
  j: {
    ...baseVariants.a,
    background: '#545454',
    primary: colors.white,
    text: '#fff',
  },
  regular: {
    ...baseVariants.a,
    text: '#333',
    tertiary: '#545454',
  },
});

export default {
  logoGlyph: 'defaultTheme',
  loadingLogo:
    'https://digital-au.s3.ap-southeast-2.amazonaws.com/web/LOADING-UNLOCK-ALL-up.gif',
  ...base,
  colors: {
    ...base.colors,
    variants,
  },
  button: {
    borderRadius: '3px',
  },
};
