import React from 'react';
import PropTypes from 'prop-types';
import { TrackingProvider } from '../../tracker';
import Bootstrap from '../src';

// This is used by jest and Docz
const TestBootstrap = ({ theme, children }) => {
  return (
    <Bootstrap trackingProvider={TrackingProvider} theme={theme}>
      {children}
    </Bootstrap>
  );
};

TestBootstrap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  children: PropTypes.node,
};

export default TestBootstrap;
