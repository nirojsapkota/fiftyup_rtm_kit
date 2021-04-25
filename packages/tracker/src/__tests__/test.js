import React from 'react';
// eslint-disable-next-line import/named
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import { useTracker, track, TrackerRegistration } from '..';
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

  it(`provides a virtual page click when no track props is provided`, () => {
    const SampleComponent = ({ text, onClick }) => {
      const { ref, trackEvent } = useTracker();
      return (
        <a
          ref={ref}
          onClick={e => trackEvent(e, null, onClick)}
          href="https://my-example.com"
        >
          {text}
        </a>
      );
    };
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <SampleComponent onClick={mockOnClick} text="Click Me" />
    );
    const aNode = getByText('Click Me');
    fireEvent.click(aNode);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

describe(`track`, () => {
  it(`logs on failure`, () => {
    const throwError = () => {
      throw new Error();
    };
    Google.sendData = jest.fn().mockImplementation(throwError);
    Facebook.sendData = jest.fn().mockImplementation(throwError);

    const logSpy = jest.spyOn(console, 'log');

    track('get_started', { some: 'data', meta: {} });

    expect(logSpy).toHaveBeenCalledTimes(2);
  });
});

describe('<TrackerRegistration />', () => {
  it(`renders the script with given IDs`, () => {
    const twitter_analytics_id = 'QQQ-TTT-RRR';
    const ga_code = 'UA-121324450-2';
    const bing_uet_tag_code = '25041030';
    const google_tag_mgr_id = 'GMT-1111111';
    const google_adwords_id = 'AW-964414963';
    const facebook_pixel_id = '1111111111';
    const fullstory_id = 'NQGXA';
    const zendesk_id = 'a85c71b0-2af3-4bb0-9cd3-3a9eb0ebcb67';
    const google_optimize_id = 'OPT-123456';
    const sfmc_business_account_id = '123456';
    const outbrain_tracking_id = '000123456';
    const jackmedia_pixel_id = '111111';

    const { getByTestId } = render(
      <TrackerRegistration
        google_tag_mgr_id={google_tag_mgr_id}
        ga_code={ga_code}
        twitter_analytics_id={twitter_analytics_id}
        bing_uet_tag_code={bing_uet_tag_code}
        google_adwords_id={google_adwords_id}
        facebook_pixel_id={facebook_pixel_id}
        fullstory_id={fullstory_id}
        zendesk_id={zendesk_id}
        sfmc_business_account_id={sfmc_business_account_id}
        google_optimize_id={google_optimize_id}
        outbrain_tracking_id={outbrain_tracking_id}
        user={{ email: 'test@mail.com' }}
        jackmedia_pixel_id={jackmedia_pixel_id}
      />
    );

    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      google_tag_mgr_id
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain(ga_code);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      bing_uet_tag_code
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      google_adwords_id
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      facebook_pixel_id
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain(fullstory_id);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(zendesk_id);
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      google_optimize_id
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      sfmc_business_account_id
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain('setUserInfo');
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      outbrain_tracking_id
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      jackmedia_pixel_id
    );
    expect(getByTestId('TrackingRegister').innerHTML).toContain(
      twitter_analytics_id
    );
  });
});
