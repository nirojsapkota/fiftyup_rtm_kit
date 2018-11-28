/* eslint-disable no-console */
import React from 'react';
import t from 'prop-types';
import LogRocket from 'logrocket';
import Google from './google';
import Facebook from './facebook';

const safeSendTo = (service, data) => {
  try {
    service.sendData(data);
  } catch (error) {
    LogRocket.captureException(error, {
      tags: {
        service,
      },
    });
  }
};

export const track = (action, trackingData) => {
  const data = { ...trackingData, action };

  safeSendTo(Google, data);
  safeSendTo(Facebook, data);
};

const trackEvent = trackingData => (action, callback) => {
  track(action, trackingData);
  if (typeof callback === 'function') {
    callback();
  }
};

const TrackingContext = React.createContext({
  trackingData: {},
  trackEvent,
});

export const TrackingProvider = ({ children, trackingData }) => {
  return (
    <TrackingContext.Provider value={{ trackingData, trackEvent }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const Tracker = props => {
  return (
    <TrackingContext.Consumer>
      {({ trackingData, trackEvent }) => {
        return props.render(trackEvent(trackingData));
      }}
    </TrackingContext.Consumer>
  );
};

Tracker.propTypes = {
  render: t.func,
};

TrackingProvider.propTypes = {
  children: t.node,
  trackingData: t.shape({ category: t.string.isRequired }),
};
