import React from "react";
import { Tracker, track } from "../index";
import LogRocket from "logrocket";
import Google from "../google";
import Facebook from "../facebook";
import { render, cleanup, fireEvent } from "../test-utils";

afterEach(cleanup);

describe(`track`, () => {
  it(`alerts LogRocket on failure`, () => {
    const throwError = () => {
      throw new Error();
    };
    Google.sendData = jest.fn().mockImplementation(throwError);
    Facebook.sendData = jest.fn().mockImplementation(throwError);

    const logSpy = spyOn(LogRocket, "captureException");

    track("get_started", { some: "data" });

    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});

describe(`<Tracker />`, () => {
  it(`does not prevent child components from functioning`, () => {
    const buttonEvent = jest.fn();
    const { getByText } = render(
      <Tracker
        render={trackEvent => (
          <button onClick={() => trackEvent("ButtonClick", buttonEvent)}>
            Hello
          </button>
        )}
      />
    );

    fireEvent.click(getByText("Hello"));

    expect(buttonEvent).toHaveBeenCalled();
  });

  it(`does not blow up if a callback is not valid`, () => {
    const buttonEvent = "some string";
    const { getByText } = render(
      <Tracker
        render={trackEvent => (
          <button onClick={() => trackEvent("ButtonClick", buttonEvent)}>
            Hello
          </button>
        )}
      />
    );

    fireEvent.click(getByText("Hello"));

    // FIXME: This is an implicit validation, use expect() here
  });

  it(`when trackEvent is not a function it doesn't blow up`, () => {
    const buttonEvent = jest.fn();
    const { getByText } = render(
      <Tracker render={() => <button onClick={buttonEvent}>Hello</button>} />
    );

    fireEvent.click(getByText("Hello"));

    expect(buttonEvent).toHaveBeenCalled();
  });
});
