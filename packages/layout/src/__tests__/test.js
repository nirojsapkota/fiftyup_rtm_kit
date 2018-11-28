import React from 'react';
import { render } from '@rtm-ui/bootstrap/setup/testSetup';
import { Card, Pane } from '../index';

const text = 'Hello, World';

describe('<Pane />', () => {
  it('renders the background color of the variant provided', () => {
    const { getByText } = render(<Pane variant="c">{text}</Pane>, {
      themeOverrides: { 'colors.variants.c.background': 'blue' },
    });

    expect(getByText(text)).toHaveStyleRule('background', 'blue');
  });
});

describe('<Card />', () => {
  it('renders the background color of the variant provided', () => {
    const { getByText } = render(<Card variant="c">{text}</Card>, {
      themeOverrides: { 'colors.variants.c.background': 'blue' },
    });

    expect(getByText(text)).toHaveStyleRule('background', 'blue');
  });

  it('provides the theme border radius to the Pane', () => {
    const { getByText } = render(<Card>{text}</Card>, {
      themeOverrides: { borderRadius: '12px' },
    });

    expect(getByText(text)).toHaveStyleRule('border-radius', '12px');
  });
});
