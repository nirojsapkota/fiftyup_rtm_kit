import { render } from "react-testing-library";
import React from "react";
import { TrackingContext } from "./index";

const customRender = (node, ...options) =>
  render(
    <TrackingContext.Consumer>
      {({ trackEvent }) => (
        <TrackingContext.Provider
          value={{ trackingData: window.obs_track, trackEvent }}
        >
          {node}
        </TrackingContext.Provider>
      )}
    </TrackingContext.Consumer>,
    ...options
  );

export * from "react-testing-library";
export { customRender as render };
