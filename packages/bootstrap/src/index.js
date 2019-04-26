import React from 'react';
import PropTypes from 'prop-types';
import { TrackingProvider } from '@rtm-ui/tracker';
import { BootstrapTheme, themeMap, setIn } from '@rtm-ui/theme';

const Bootstrap = ({
  overrides,
  children,
  trackingData = { category: 'default' },
  ...props
}) => {
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
    <Tracking trackingData={trackingData}>
      <BootstrapTheme theme={themeWithOverrides}>{children}</BootstrapTheme>
    </Tracking>
  );
};

Bootstrap.propTypes = {
  children: PropTypes.node.isRequired,
  trackingData: PropTypes.shape({ brand: PropTypes.string }),
  trackingProvider: PropTypes.func,
};

export { Bootstrap };
