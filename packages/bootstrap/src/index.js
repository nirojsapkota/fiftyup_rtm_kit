import React from "react";
import Variant from "@rtm-test/theme";
import { TrackingContext } from "@rtm-test/tracker";

const Bootstrap = ({ children }) => {
  return (
    <TrackingContext.Consumer>
      {({ trackEvent }) => (
        <TrackingContext.Provider
          value={{ trackingData: window.obs_track, trackEvent }}
        >
          <Variant>{children}</Variant>
        </TrackingContext.Provider>
      )}
    </TrackingContext.Consumer>
  );
};

export default Bootstrap;
