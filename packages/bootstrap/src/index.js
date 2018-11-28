import React from 'react';
import t from 'prop-types';
import { BootstrapTheme } from '@rtm-ui/theme';
import { TrackingProvider } from '@rtm-ui/tracker';

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
  // be an issue in production.
  const Tracking = props.trackingProvider
    ? props.trackingProvider
    : TrackingProvider;
  return (
    <Tracking trackingData={trackingData}>
      <BootstrapTheme {...props} />
    </Tracking>
  );
};

Bootstrap.propTypes = {
  children: t.node.isRequired,
};

export default Bootstrap;
