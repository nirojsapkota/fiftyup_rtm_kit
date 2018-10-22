import { notices, grayscale } from "./colors";

const colors = {
  green: "#22b24e",
  orange: "#ef8612",
  orangeAccent: "#e56209",
  navy: "#1566ad",
  blue: "#2d9dd6",
  blueAccent: "#82c1e0",
  yellow: "#ffed00",
  ...grayscale,
  ...notices,
};

const sm = "32";
const md = "46";
const lg = "76";

const variants = {
  a: {
    primary: colors.navy,
    secondary: colors.blue,
    tertiary: colors.green,
    accent: colors.orange,
    accentAccent: colors.orangeAccent,
    background: colors.white,
    text: colors.dark,
    link: colors.darkest,
    inverseText: colors.white,
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
  boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  variant: "a",
  fonts: {
    serif: "Museo",
    sansSerif: "MuseoSans",
  },
  colors: {
    variants,
    grayscale,
    social: {
      facebook: "#3B5998",
      twitter: "#00ACED",
    },
  },
  borderRadius: "4px",
  button: {
    borderRadius: "3px",
    bottomBorderWidth: "4px",
  },
};
