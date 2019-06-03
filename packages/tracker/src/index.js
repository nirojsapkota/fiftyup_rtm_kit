/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import LogRocket from 'logrocket';
import Google from './google';
import Facebook from './facebook';
import Funnel from './funnel';

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

  console.log({ tracking: data });

  safeSendTo(Google, data);
  safeSendTo(Facebook, data);
  safeSendTo(Funnel, data);
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

export const useTracker = () => {
  const { trackingData } = React.useContext(TrackingContext);
  return {
    trackEvent: (e, action, callback) => {
      track(action, trackingData);
      if (callback) {
        callback(e);
      }
    },
  };
};

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
  render: PropTypes.func,
};

TrackingProvider.propTypes = {
  children: PropTypes.node,
  trackingData: PropTypes.shape({ category: PropTypes.string.isRequired }),
};
