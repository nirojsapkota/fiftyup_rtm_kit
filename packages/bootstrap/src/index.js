import React from 'react';
import PropTypes from 'prop-types';
import { TrackingProvider } from '@rtm-ui/tracker';
import { BootstrapTheme, themeMap, setIn } from '@rtm-ui/theme';
import { ErrorBoundary } from './error-boundary';

const Bootstrap = ({
  overrides,
  children,
  trackingData = { category: 'default' },
  cssReset,
  ...props
}) => {
  const [useDefaultTheme, setUseDefaultTheme] = React.useState(false);
  const Tracking = props.trackingProvider
    ? props.trackingProvider
    : TrackingProvider;

  const theme = themeMap[props.themeName || trackingData.brand];

  const themeWithOverrides = overrides
    ? Object.keys(overrides).reduce(
        (acc, cv, ci) => setIn(acc, cv, Object.values(overrides)[ci]),
        theme
      )
    : theme;

  return (
    <ErrorBoundary onError={setUseDefaultTheme}>
      <Tracking trackingData={trackingData}>
        <BootstrapTheme
          useDefaultTheme={useDefaultTheme}
          theme={themeWithOverrides}
          cssReset={cssReset}
        >
          {children}
        </BootstrapTheme>
      </Tracking>
    </ErrorBoundary>
  );
};

Bootstrap.propTypes = {
  children: PropTypes.node.isRequired,
  trackingData: PropTypes.shape({ brand: PropTypes.string }),
  trackingProvider: PropTypes.func,
};

export { Bootstrap };
