import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TrackingProvider } from '@rtm-ui/tracker';
import { Bootstrap } from '../src';
import { useLocalStorage } from './useLocalStorage';

const Wrapper = styled.div`
  .css-1i0fr1k {
    width: 100%;
    max-width: 1500px;
  }
`;

// This is used by jest and Docz
const TestBootstrap = ({
  themeName = 'obs',
  overrides,
  trackerOff,
  children,
}) => {
  const [localThemeName] = useLocalStorage('themeName', themeName);
  return (
    <Bootstrap
      trackingProvider={TrackingProvider}
      overrides={overrides}
      themeName={localThemeName}
    >
      <Wrapper>{children}</Wrapper>
    </Bootstrap>
  );
};

TestBootstrap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  children: PropTypes.node,
  trackerOff: PropTypes.bool,
};

TestBootstrap.defaultProps = {
  trackerOff: false,
};
export { TestBootstrap };
// Docz needs a default export
export default TestBootstrap;
