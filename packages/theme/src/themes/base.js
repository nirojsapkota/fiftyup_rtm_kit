import { grayscale } from './colors';

const sm = '32';
const md = '46';
const lg = '76';

// eslint-disable-next-line
export const base = {
  breakpoints: [`${sm}em`, `${md}em`, `${lg}em`],
  grid: {
    sm,
    md,
    lg,
  },
  elevation: [
    '0 0 1px rgba(67, 90, 111, 0.3), 0 2px 4px -2px rgba(67, 90, 111, 0.47)',
    '0 0 1px rgba(67, 90, 111, 0.3), 0 5px 8px -4px rgba(67, 90, 111, 0.47)',
    '0 0 1px rgba(67, 90, 111, 0.3), 0 8px 10px -4px rgba(67, 90, 111, 0.47)',
    '0 0 1px rgba(67, 90, 111, 0.3), 0 16px 24px -8px rgba(67, 90, 111, 0.47)',
  ],
  variant: 'a',
  fonts: {
    serif: 'Museo',
    sansSerif: 'MuseoSans',
  },
  colors: {
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
