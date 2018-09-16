import React from "react";
import { ThemeProvider } from "styled-components";
import t from "prop-types";
import { obs } from "./themes";
import "./reset";

export { getColor } from "./util";

const Variant = ({ theme, variant, children }) => {
  const nestedTheme = variant ? { ...theme, variant } : theme;
  return <ThemeProvider theme={nestedTheme}>{children}</ThemeProvider>;
};

Variant.defaultProps = {
  theme: obs,
};

const variantShape = t.shape({
  primary: t.string,
  secondary: t.string,
  tertiary: t.string,
  accent: t.string,
  accentAccent: t.string,
  background: t.string,
  text: t.string,
  link: t.string,
  inverseText: t.string,
}).isRequired;

const variantPropTypes = {
  theme: t.shape({
    breakpoints: t.array,
    grid: t.shape({ sm: t.string, md: t.string, lg: t.string }),
    variant: t.string,
    fonts: t.shape({
      serif: t.string,
      sansSerif: t.string,
    }),
    colors: t.shape({
      variants: t.shape({
        a: variantShape,
        b: variantShape,
        c: variantShape,
      }).isRequired,
      grayscale: t.shape({
        black: t.string,
        darkest: t.string,
        dark: t.string,
        normal: t.string,
        light: t.string,
        lightest: t.string,
        white: t.string,
      }).isRequired,
      social: t.shape({
        facebook: t.string,
        twitter: t.string,
      }).isRequired,
    }).isRequired,
  }),
  variant: t.string,
  children: t.node,
};

Variant.propTypes = variantPropTypes;

export default Variant;
