import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { LoginView } from '../index';

describe('<LoginView />', () => {
  it('matches expected output', () => {
    const props = {
      howItWorkProps: {
        header:
          'New Energy Group Discounts now available for a limited time only!',
        icons: [
          {
            glyph: 'hand-like',
            title: 'You join the movement for free',
          },
          {
            glyph: 'hands-shake',
            title: 'We negotiate Group Discounts',
          },
          {
            glyph: 'hand-touch',
            title: 'You decide what’s right for you',
          },
        ],
      },
      disclaimerProps: {
        disclaimerText: '* test',
      },
      title: 'Enter your details to view<br>Energy discounts in your area',
      authenticityToken:
        'I7t3w13syZv9gWaz0kbQA3fL6NqrhwiZlfIt9HixtbKNZIy5nsB36XE8eQHC+AtA5lT2p7Kt182TIrUDgSZ+gw==',
      hiddenFields: {
        registering_campaign_id: 276,
        jump_path: '/campaigns/OBS_BES_2017_Offers',
      },
    };

    const { getByText } = render(<LoginView {...props} />);

    expect(getByText(props.disclaimerProps.disclaimerText)).toBeInTheDocument();
  });
});
