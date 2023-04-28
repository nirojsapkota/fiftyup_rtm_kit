import React from 'react';
import {
  render,
  fireEvent,
  wait,
  screen,
} from '../../../bootstrap/setup/testSetup';
import {
  Block,
  Card,
  Pane,
  Flex,
  useWindowSize,
  TopBorderCard,
  scrollToElement,
  scrollToElementExtended,
  useElementVisible,
  generateAbsoluteUrl,
} from '../index';

const text = 'Hello, World';

afterEach(() => {
  jest.clearAllMocks();
});

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

    const resizeWindow = (x, y) => {
      window.innerWidth = x;
      window.innerHeight = y;
      window.dispatchEvent(new Event('resize'));
    };

    resizeWindow(200, 300);
    expect(getByTestId('width')).toHaveTextContent('200');
    expect(getByTestId('height')).toHaveTextContent('300');
  });

  /* ****************************************** */
  describe('<TopBorderCard />', () => {
    it('renders the border color of the variant provided', () => {
      const { getByText } = render(
        <TopBorderCard variant="c" bordercolor="primary">
          {text}
        </TopBorderCard>,
        {
          themeOverrides: { 'colors.variants.c.primary': '#1566ad' },
        }
      );

      expect(getByText(text)).toHaveStyleRule('border-top-color', '#1566ad');
    });

    it('provides the theme border color to the Card', () => {
      const { getByText } = render(
        <TopBorderCard variant="c" bordercolor="accent">
          {text}
        </TopBorderCard>,
        {
          themeOverrides: { 'colors.variants.c.accent': '#ef8612' },
        }
      );

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
        <a onClick={e => scrollToElement(e, 'findMe')}>Test</a>
        <div scroll-target="findMe" />
      </>
    );
    const navItem = getByText('Test');
    fireEvent.click(navItem);

    await wait(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('scrolls to a given element attribute regardless of event', async () => {
    window.scrollTo = jest.fn();
    const spy = jest.spyOn(window, 'scrollTo');
    const { getByText } = await render(
      <>
        <a onClick={e => scrollToElement(null, 'findMe')}>Test</a>
        <div scroll-target="findMe" />
      </>
    );
    const navItem = getByText('Test');
    fireEvent.click(navItem);

    await wait(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});

describe('scrollToElementExtended', () => {
  it('scrolls to a given element attribute', async () => {
    window.scrollTo = jest.fn();
    const spy = jest.spyOn(window, 'scrollTo');
    const { getByText } = await render(
      <>
        <a onClick={e => scrollToElementExtended(e, 'findMe')}>Test</a>
        <div name="findMe" />
      </>
    );
    const navItem = getByText('Test');
    fireEvent.click(navItem);

    await wait(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});

describe('useElementVisible', () => {
  beforeEach(() => {
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  const TestFn = ({ element, ...props }) => {
    const elemIsVisible = useElementVisible(element);
    return (
      <div style={{ minHeight: '1000px' }}>
        <span data-testid="elem-visible">{elemIsVisible ? 'Yes' : 'No'}</span>
        <div style={{ marginTop: '20px', width: '100%' }} />
        <div className="target-element">I am target element</div>
        <div data-testid="response">
          <p>I am {elemIsVisible}</p>
        </div>
      </div>
    );
  };

  // FIXME: Apparently, after upgrading to @testing-library/jest-dom v4.0.0,
  // the actual window.scrollTo stopped working (unless you mock it).
  it.skip('checks if the given element is visible in the window viewport', async () => {
    const { getByTestId, rerender } = await render(
      <TestFn element=".target-element" />
    );
    window.dispatchEvent(new Event('scroll'));
    expect(getByTestId('elem-visible')).toHaveTextContent('Yes');
    window.scrollTo(0, 10000);
    window.dispatchEvent(new Event('scroll'));
    rerender(<TestFn element=".target-element" />);
    expect(getByTestId('elem-visible')).toHaveTextContent('No');
  });

  it('raises error while passing invalid element', async () => {
    const { getByTestId, rerender } = render(
      <TestFn element=".not-existing" />
    );
    window.dispatchEvent(new Event('scroll'));
    expect(getByTestId('response')).toHaveTextContent('I am invalid element');
  });
});

describe('generateAbsoluteUrl', () => {
  it('prepends a // to href that starts with www.', () => {
    const absoluteUrl = generateAbsoluteUrl('www.helloworlds.com');
    const { getByText } = render(<div>{absoluteUrl}</div>);
    expect(getByText('//www.helloworlds.com')).toBeInTheDocument();
  })

  it('retains http of a href', () => {
    const absoluteUrl = generateAbsoluteUrl('http://www.helloworlds.com');
    const { getByText } = render(<div>{absoluteUrl}</div>);
    expect(getByText('http://www.helloworlds.com')).toBeInTheDocument();
  })

  it('retains https of a href', () => {
    const absoluteUrl = generateAbsoluteUrl('https://www.helloworlds.com');
    const { getByText } = render(<div>{absoluteUrl}</div>);
    expect(getByText('https://www.helloworlds.com')).toBeInTheDocument();
  })

  it('retains mailto of a href', () => {
    const absoluteUrl = generateAbsoluteUrl('mailto:test@test.com');
    const { getByText } = render(<div>{absoluteUrl}</div>);
    expect(getByText('mailto:test@test.com')).toBeInTheDocument();
  })
})
