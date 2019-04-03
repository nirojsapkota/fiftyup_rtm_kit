import React from 'react';
import { render, act, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Card, Pane, Flex, useWindowSize } from '../index';
import Icon from '../../../icon';

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

describe('<Flex />', () => {
  it('renders the background color of the variant provided', () => {
    const { getByText } = render(<Flex variant="c">{text}</Flex>, {
      themeOverrides: { 'colors.variants.c.background': 'blue' },
    });

    expect(getByText(text)).toHaveStyleRule('background', 'blue');
  });

  it('sets the background when backgroundColor props is provided', () => {
    const { getByText } = render(
      <Flex variant="c" backgroundColor="primary">
        {text}
      </Flex>,
      {
        themeOverrides: { 'colors.variants.c.primary': 'yellow' },
      }
    );

    expect(getByText(text)).toHaveStyleRule('background', 'yellow');
  });

  it('displays the children even when no variant prop', () => {
    const { getByText } = render(<Flex>{text}</Flex>);
    expect(getByText(text)).toBeInTheDocument();
  });
});

describe('useWindowSize', () => {
  const TestFn = () => {
    const windowSize = useWindowSize();
    return (
      <div>
        <span data-testid="width">{windowSize.width}</span>
        <span data-testid="height">{windowSize.height}</span>
      </div>
    );
  };

  it('responds to window resize', () => {
    window.innerWidth = 100;
    window.innerHeight = 200;
    const { getByTestId } = render(<TestFn />);

    expect(getByTestId('width')).toHaveTextContent('100');
    expect(getByTestId('height')).toHaveTextContent('200');

    window.innerWidth = 200;
    window.innerHeight = 300;

    act(() => {
      var event = new Event('resize');
      window.dispatchEvent(event);
    });

    expect(getByTestId('width')).toHaveTextContent('200');
    expect(getByTestId('height')).toHaveTextContent('300');
  });
});
