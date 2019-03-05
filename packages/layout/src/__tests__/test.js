import React from 'react';
import { render, wait } from '../../../bootstrap/setup/testSetup';
import { Card, Pane, WindowSize } from '../index';

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

describe('<WindowSize />', () => {
  jest.fn(WindowSize());
  var event = new Event('resize');

  global.window.innerWidth = 100;
  global.window.innerHeight = 200;

  global.dispatchEvent(event);

  expect(WindowSize().width).toBe(100);
  expect(WindowSize().height).toBe(200);
});
