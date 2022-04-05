import { notices, grayscale } from './colors';
import { base } from './base';

const iconColors = {
  iconPrimary: '#00b1ff',
};

const baseVariants = {
  a: {
    primary: '#00b1ff',
    secondary: '#00b1ff',
    tertiary: '#00b1ff',
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
    ...iconColors,
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
    ...iconColors,
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
    ...iconColors,
  },
  d: {
    primary: '#00b1ff',
    secondary: '#00b1ff',
    tertiary: '#00b1ff',
    accent: '#e0107b',
    accentAccent: '#b91067',
    background: '#ffffff',
    text: '#565656',
    link: '#333',
    inverseText: '#FFF',
    linkHover: '#b91067',
    shape: '#e1107b',
    ...grayscale,
    ...notices,
    ...iconColors,
  },
};

const variants = Object.assign(baseVariants, {
  e: {
    ...baseVariants.a,
    text: '#e0107b',
    secondary: '#00b1ff',
  },
  f: {
    ...baseVariants.a,
    secondary: '#e0107b',
  },
  g: {
    ...baseVariants.a,
    accent: '#00b1ff',
    linkHover: '#00b1ff',
  },
  h: {
    ...baseVariants.a,
    background: '#e0107b',
  },
  i: {
    ...baseVariants.a,
  },
  j: {
    ...baseVariants.b,
    primary: '#e0107b',
  },
  regular: {
    ...baseVariants.a,
    text: '#000',
    tertiary: '#616461',
  },
});

export default {
  ...base,
  logoGlyph: 'ninesaver',
  loadingLogo:
    'https://digital-au.s3.ap-southeast-2.amazonaws.com/9Saver/website-assets/9saver-loading-unlock.gif',
  fonts: {
    serif: 'Proxima',
    sansSerif: 'Proxima',
  },
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
