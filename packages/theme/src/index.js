import React from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import t from 'prop-types';
import { themeMap, obs, fuc, ninesaver } from './themes';
import { CssReset } from './reset';
import { Fonts } from './fonts';
import { backgroundStyle, getColor, setIn } from './util';

export { backgroundStyle, getColor, setIn };
export { themeMap, obs, fuc, ninesaver };
export const themeColorKeys = Object.keys(obs.colors.variants.a);

const Variant = ({ theme, variant, children }) => {
  // throw new Error(JSON.stringify(theme, 0, 2));
  return (
    <ThemeProvider theme={{ ...theme, variant }}>{children}</ThemeProvider>
  );
};

export const BootstrapTheme = ({ children, ...props }) => {
  return (
    <Variant {...props}>
      <React.Fragment>
        <CssReset />
        <Fonts />
        {children}
      </React.Fragment>
    </Variant>
  );
};

Variant.defaultProps = {
  theme: obs,
  variant: 'a',
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
  children: t.node.isRequired,
};

Variant.propTypes = variantPropTypes;

export default withTheme(Variant);
