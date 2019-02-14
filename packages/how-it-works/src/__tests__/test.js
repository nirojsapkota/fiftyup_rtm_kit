import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HowItWorks from '../index';
import { howItWorksContent } from '../constants';

describe('<HowItWork />', () => {
  it('matches expected default content for obs', () => {
    const content = howItWorksContent.obs;
    const { getByText } = render(<HowItWorks />);
    expect(getByText(content.header)).toBeInTheDocument();
    expect(getByText(content.icons[0].title)).toBeInTheDocument();
    expect(getByText(content.icons[1].title)).toBeInTheDocument();
    expect(getByText(content.icons[2].title)).toBeInTheDocument();
  });

  it('matches expected output for entities', () => {
    const entities = ['obs', 'ninesaver', 'fiftyup'];
    entities.forEach(entity => {
      const content = howItWorksContent[entity];
      const { getByText } = render(<HowItWorks entity={entity} />);

      expect(getByText(content.header)).toBeInTheDocument();
      expect(getByText(content.icons[0].title)).toBeInTheDocument();
      expect(getByText(content.icons[1].title)).toBeInTheDocument();
      expect(getByText(content.icons[2].title)).toBeInTheDocument();
    });
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
