import React from 'react';
import PropTypes from 'prop-types';
import { TrackingProvider } from '@rtm-ui/tracker';
import { BootstrapTheme } from '@rtm-ui/theme';

const Bootstrap = props => {
  const trackingData = props.trackingData
    ? props.trackingData
    : { category: 'default' };

  // This is a limitation of the monorepo architecture.
  // since each package distributes via `build`, we end
  // up with two sources of React.Context. So when the consumer
  // is in the same package as the createContext() call
  // we will have two contexts, one from build and one
  // from source. So for now we allow the provider to
  // be passed in (as seen in `setupTests`). This shouldn't
  const Tracking = props.trackingProvider
    ? props.trackingProvider
    : TrackingProvider;

  return (
    <Tracking trackingData={trackingData}>
      <BootstrapTheme brand={trackingData.brand} {...props} />
    </Tracking>
  );
};

Bootstrap.propTypes = {
  children: PropTypes.node.isRequired,
  trackingData: PropTypes.shape({ brand: PropTypes.string }),
  trackingProvider: PropTypes.func,
};

export default Bootstrap;
