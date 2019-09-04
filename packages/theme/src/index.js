import React from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { themeMap, defaultTheme, obs, fiftyup, ninesaver } from './themes';
import { CssReset } from './reset';
import { Fonts } from './fonts';
import { backgroundStyle, getColor, tintColor, setIn, getWeight } from './util';

export { backgroundStyle, getColor, setIn, tintColor, getWeight };
export { themeMap, defaultTheme, obs, fiftyup, ninesaver };

const Variant = ({ theme, variant, children }) => {
  return (
    <ThemeProvider theme={{ ...theme, variant }}>{children}</ThemeProvider>
  );
};

export const BootstrapTheme = ({ children, theme, variant, cssReset }) => {
  const realTheme = theme || defaultTheme;
  return (
    <Variant variant={variant} theme={realTheme}>
      <React.Fragment>
        {cssReset && <CssReset />}
        <Fonts />
        {children}
      </React.Fragment>
    </Variant>
  );
};

BootstrapTheme.propTypes = {
  children: PropTypes.node.isRequired,
  brand: PropTypes.string,
  cssReset: PropTypes.bool,
};

BootstrapTheme.defaultProps = {
  cssReset: true,
};

Variant.defaultProps = {
  variant: 'a',
};

const variantShape = PropTypes.shape({
  primary: PropTypes.string,
  secondary: PropTypes.string,
  tertiary: PropTypes.string,
  accent: PropTypes.string,
  accentAccent: PropTypes.string,
  background: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  inverseText: PropTypes.string,
}).isRequired;

const variantPropTypes = {
  theme: PropTypes.shape({
    breakpoints: PropTypes.array,
    grid: PropTypes.shape({
      sm: PropTypes.string,
      md: PropTypes.string,
      lg: PropTypes.string,
    }),
    variant: PropTypes.string,
    fonts: PropTypes.shape({
      serif: PropTypes.string,
      sansSerif: PropTypes.string,
    }),
    colors: PropTypes.shape({
      variants: PropTypes.shape({
        a: variantShape,
        b: variantShape,
        c: variantShape,
      }).isRequired,
      grayscale: PropTypes.shape({
        black: PropTypes.string,
        darkest: PropTypes.string,
        dark: PropTypes.string,
        normal: PropTypes.string,
        light: PropTypes.string,
        lightest: PropTypes.string,
        white: PropTypes.string,
      }).isRequired,
      social: PropTypes.shape({
        facebook: PropTypes.string,
        twitter: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }),
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Variant.propTypes = variantPropTypes;

const Theme = withTheme(Variant);

export { Theme };
