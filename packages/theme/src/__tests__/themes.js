import { obs, fuc, ninesaver } from "../themes";

const variants = {
  accent: expect.any(String),
  accentAccent: expect.any(String),
  background: expect.any(String),
  black: expect.any(String),
  dark: expect.any(String),
  darkest: expect.any(String),
  error: expect.any(String),
  inverseText: expect.any(String),
  light: expect.any(String),
  lightest: expect.any(String),
  link: expect.any(String),
  normal: expect.any(String),
  notice: expect.any(String),
  primary: expect.any(String),
  secondary: expect.any(String),
  success: expect.any(String),
  tertiary: expect.any(String),
  text: expect.any(String),
  warning: expect.any(String),
  white: expect.any(String),
};

const themeShape = {
  borderRadius: expect.any(String),
  boxShadow: expect.any(String),
  breakpoints: expect.arrayContaining([expect.any(String)]),
  button: {
    borderRadius: expect.any(String),
    bottomBorderWidth: expect.any(String),
  },
  colors: {
    grayscale: {
      black: expect.any(String),
      dark: expect.any(String),
      darkest: expect.any(String),
      light: expect.any(String),
      lightest: expect.any(String),
      normal: expect.any(String),
      white: expect.any(String),
    },
    social: {
      facebook: expect.any(String),
      twitter: expect.any(String),
    },
    variants: {
      a: variants,
      b: variants,
      c: variants,
    },
  },
  fonts: {
    sansSerif: expect.any(String),
    serif: expect.any(String),
  },
  grid: {
    lg: expect.any(String),
    md: expect.any(String),
    sm: expect.any(String),
  },
  variant: expect.any(String),
};

const themeMap = {
  obs: obs,
  fuc: fuc,
  ninesaver: ninesaver,
};

describe(`Theme objects`, () => {
  Object.keys(themeMap).map(themeName => {
    it(`${themeName} has all of the same keys and values as each other`, () => {
      expect(themeMap[themeName]).toEqual(expect.objectContaining(themeShape));
    });
  });
});
