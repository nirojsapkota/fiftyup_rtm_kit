import React from 'react';
import { render, cleanup } from '../../../bootstrap/setup/testSetup';
import { TrackerRegistration } from '../index';

afterEach(cleanup);

describe('<TrackerRegistration />', () => {
 
  it('matches expected output', async () => {
    const ga_code = 'UA-121324450-2';
    const bing_uet_tag_code = '25041030';
    const google_adwords_id = 'AW-964414963';
    const facebook_pixel_id = '1111111111';
    const zendesk_id = 'a85c71b0-2af3-4bb0-9cd3-3a9eb0ebcb67';

    const { getByTestId } = await render(
      <TrackerRegistration 
        ga_code={ga_code} 
        bing_uet_tag_code={bing_uet_tag_code} 
        google_adwords_id={google_adwords_id} 
        facebook_pixel_id={facebook_pixel_id}
        zendesk_id={zendesk_id}
      />
    );
    expect(getByTestId('testTrackingRegister')).toBeInTheDocument();
  });
})
