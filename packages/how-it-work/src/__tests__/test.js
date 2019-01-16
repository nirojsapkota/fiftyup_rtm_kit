import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HowItWork from '../index';

describe('<HowItWork />', () => {
  it('matches expected output', () => {
    const props = {
      header:
        'One Big Switch takes the stress out of getting value on your household bills by doing the neogtiating for you!',
      icons: [
        {
          glyph: 'user-help',
          title: 'You join the movement for free',
        },
        {
          glyph: 'balance',
          title: 'We negotiate Group Discounts',
        },
        {
          glyph: 'hands-shake-2',
          title: 'You decide what’s right for you',
        },
      ],
    };

    const { getByText, container } = render(<HowItWork {...props} />);

    expect(getByText(props.header)).toBeInTheDocument();
    expect(getByText(props.icons[0].title)).toBeInTheDocument();
    expect(getByText(props.icons[1].title)).toBeInTheDocument();
    expect(getByText(props.icons[2].title)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
