import React from 'react';
import LogRocket from 'logrocket';
// eslint-disable-next-line import/named
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Tracker, TrackingProvider, track } from '..';
import Google from '../google';
import Facebook from '../facebook';

afterEach(cleanup);

describe(`track`, () => {
  it(`alerts LogRocket on failure`, () => {
    const throwError = () => {
      throw new Error();
    };
    Google.sendData = jest.fn().mockImplementation(throwError);
    Facebook.sendData = jest.fn().mockImplementation(throwError);

    const logSpy = jest.spyOn(LogRocket, 'captureException');

    track('get_started', { some: 'data' });

    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});

describe(`<Tracker />`, () => {
  it(`renders with a trackEvent function to be used by it's children`, () => {
    const childrenArg = {};
    const children = arg => {
      Object.assign(childrenArg, { trackEvent: arg });
      return null;
    };

    render(<Tracker render={children} />);

    expect(childrenArg).toEqual({ trackEvent: expect.any(Function) });
  });

  it(`does not prevent child components from functioning`, () => {
    const buttonEvent = jest.fn();
    const { getByText } = render(
      <Tracker
        render={trackEvent => (
          <button
            type="submit"
            onClick={() => trackEvent('ButtonClick', buttonEvent)}
          >
            Hello
          </button>
        )}
      />
    );

    fireEvent.click(getByText('Hello'));

    expect(buttonEvent).toHaveBeenCalled();
  });

  it(`does not blow up if a callback is not valid`, () => {
    const buttonEvent = 'some string';
    const { getByText } = render(
      <Tracker
        render={trackEvent => (
          <button
            type="submit"
            onClick={() => trackEvent('ButtonClick', buttonEvent)}
          >
            Hello
          </button>
        )}
      />
    );

    fireEvent.click(getByText('Hello'));
    // FIXME: This is an implicit validation, use expect() here
  });

  it(`when trackEvent is not a function it doesn't blow up`, () => {
    const buttonEvent = jest.fn();
    const { getByText } = render(
      <Tracker
        render={() => (
          <button type="submit" onClick={buttonEvent}>
            Hello
          </button>
        )}
      />
    );

    fireEvent.click(getByText('Hello'));

    expect(buttonEvent).toHaveBeenCalled();
  });

  it(`accepts the context by the provider`, () => {
    const buttonEvent = jest.fn();
    const { getByText } = render(
      <TrackingProvider trackingData={{ category: 'general' }}>
        <Tracker
          render={trackEvent => (
            <button type="submit" onClick={(trackEvent, buttonEvent)}>
              Hello
            </button>
          )}
        />
      </TrackingProvider>
    );

    fireEvent.click(getByText('Hello'));

    expect(buttonEvent).toHaveBeenCalled();
  });
});
