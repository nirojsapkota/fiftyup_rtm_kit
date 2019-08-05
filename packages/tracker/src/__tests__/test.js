import React from 'react';
import LogRocket from 'logrocket';
// eslint-disable-next-line import/named
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Tracker, TrackingProvider, useTracker, track, TrackerRegistration } from '..';
import Google from '../google';
import Facebook from '../facebook';

afterEach(cleanup);

describe(`useTracker`, () => {
  it(`exposes the trackEvent function and still calls the callback`, () => {
    const SampleComponent = ({ text, onClick }) => {
      const { trackEvent } = useTracker();

      return (
        <button onClick={e => trackEvent(e, 'trackit', onClick)}>{text}</button>
      );
    };
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <SampleComponent onClick={mockOnClick} text="Click Me" />
    );
    const buttonNode = getByText('Click Me');
    fireEvent.click(buttonNode);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

describe(`track`, () => {
  it(`alerts LogRocket on failure`, () => {
    const throwError = () => {
      throw new Error();
    };
    Google.sendData = jest.fn().mockImplementation(throwError);
    Facebook.sendData = jest.fn().mockImplementation(throwError);

    const logSpy = jest.spyOn(LogRocket, 'captureException');

    track('get_started', { some: 'data' });

    expect(logSpy).toHaveBeenCalledTimes(3);
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

describe('<TrackerRegistration />', () => {

  it(`renders the script with given IDs`, () => {

    const ga_code = 'UA-121324450-2';
    const bing_uet_tag_code = '25041030';
    const google_adwords_id = 'AW-964414963';
    const facebook_pixel_id = '1111111111';
    const zendesk_id = 'a85c71b0-2af3-4bb0-9cd3-3a9eb0ebcb67';
    const sfmc_business_account_id = '123456';

    const { getByTestId } = render(<TrackerRegistration ga_code={ga_code} bing_uet_tag_code={bing_uet_tag_code} google_adwords_id={google_adwords_id} facebook_pixel_id={facebook_pixel_id} zendesk_id={zendesk_id} sfmc_business_account_id={sfmc_business_account_id} user={{ email: 'test@mail.com' }} />);

    expect(getByTestId('TrackingRegister').innerHTML).toContain(ga_code);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(bing_uet_tag_code);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(google_adwords_id);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(facebook_pixel_id);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(zendesk_id);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(sfmc_business_account_id);
    expect(getByTestId('TrackingRegister').innerHTML).toContain('setUserInfo');

  });
});
