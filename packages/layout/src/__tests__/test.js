import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Block, Card, Pane, Flex, useWindowSize, TopBorderCard, scrollToElement } from '../index';

const text = 'Hello, World';

describe('<Pane />', () => {
  it('renders the background color of the variant provided', () => {
    const { getByText } = render(<Pane variant="c">{text}</Pane>, {
      themeOverrides: { 'colors.variants.c.background': 'blue' },
    });

    expect(getByText(text)).toHaveStyleRule('background', 'blue');
  });
});

describe('<Block />', () => {
  const sampleText = 'Hello World!';

  it('shows content at specified screen size', () => {
    const { getByText } = render(<Block showAt="md">{sampleText}</Block>);
    window.innerWidth = 10;
    expect(getByText(sampleText)).not.toBeVisible;

    window.innerWidth = 2500;
    expect(getByText(sampleText)).toBeVisible;
  });

  it('hides content at specified screen size', () => {
    const { getByText } = render(<Block hideAt="sm">{sampleText}</Block>);
    window.innerWidth = 10;
    expect(getByText(sampleText)).not.toBeVisible;

    window.innerWidth = 1400;
    expect(getByText(sampleText)).not.toBeVisible;
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

    const resizeWindow = (x,y) => {
      window.innerWidth = x;
      window.innerHeight = y;
      window.dispatchEvent(new Event('resize'));
    }

    resizeWindow(200, 300);
    expect(getByTestId('width')).toHaveTextContent('200');
    expect(getByTestId('height')).toHaveTextContent('300');
  });

  /* ****************************************** */
  describe('<TopBorderCard />', () => {
    it('renders the border color of the variant provided', () => {
      const { getByText } = render(
      <TopBorderCard variant="c" bordercolor="primary">{text}</TopBorderCard>, {
        themeOverrides: { 'colors.variants.c.primary': '#1566ad' },
      });

      expect(getByText(text)).toHaveStyleRule('border-top-color', '#1566ad');
    });

    it('provides the theme border color to the Card', () => {
      const { getByText } = render(<TopBorderCard variant="c" bordercolor="accent">{text}</ TopBorderCard>, {
        themeOverrides: { 'colors.variants.c.accent': '#ef8612' },
      });

      expect(getByText(text)).toHaveStyleRule('border-top-color', '#ef8612');
    });
  });

});

describe('scrollToElement', () => {
  it('scrolls to a given element attribute', async () => {
    window.scrollTo = jest.fn();
    const spy = jest.spyOn(window, 'scrollTo');
    const { getByText } = await render(
      <>
        <a onClick={(e) => scrollToElement(e, 'findMe')}>Test</a>
        <div scroll-target="findMe" />
      </>
    );
    const navItem = getByText("Test");
    fireEvent.click(navItem);

    await wait(() => {
      expect(spy).toHaveBeenCalled();
    })
  })
})
