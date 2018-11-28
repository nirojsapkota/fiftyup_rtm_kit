import React from 'react';
import t from 'prop-types';
import { TrackingProvider } from '@rtm-test/tracker/src';
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
  theme: t.object,
  children: t.node,
};

export default TestBootstrap;
