import React from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { themeMap, obs, fuc, ninesaver } from './themes';
import { CssReset } from './reset';
import { Fonts } from './fonts';
import { backgroundStyle, getColor, setIn } from './util';

export { backgroundStyle, getColor, setIn };
export { themeMap, obs, fuc, ninesaver };

const Variant = ({ theme, variant, children }) => {
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

export default withTheme(Variant);
