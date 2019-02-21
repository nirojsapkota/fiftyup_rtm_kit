import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HowItWorks from '../index';

describe('<HowItWork />', () => {
  it('matches expected snapshot', () => {
    const defaultProps = {
      header:
        'One Big Switch takes the stress out of getting value on your household bills by doing the negotiating for you!',
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
    const { getByText, container } = render(<HowItWorks {...defaultProps}/>);

    expect(getByText(defaultProps.header)).toBeInTheDocument();
    expect(getByText(defaultProps.icons[0].title)).toBeInTheDocument();
    expect(getByText(defaultProps.icons[1].title)).toBeInTheDocument();
    expect(getByText(defaultProps.icons[2].title)).toBeInTheDocument();
  });

  it('matches expected output when providing the props', () => {
    const { getByText } = render(
      <HowItWorks
        orientation="vertical"
        header="How it works"
        icons={[
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
        ]}
      />
    );
    expect(getByText('You join the movement for free')).toBeInTheDocument();
    expect(getByText('We negotiate Group Discounts')).toBeInTheDocument();
    expect(getByText('You decide what’s right for you')).toBeInTheDocument();
  });
});
