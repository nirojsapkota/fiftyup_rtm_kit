import React from 'react';
import styled from 'styled-components';
import { fireEvent, render } from '../../../bootstrap/setup/testSetup';
import { blocks } from '../../docs/content.md';
import {
  Header,
  Label,
  Markdown,
  Paragraph,
  Small,
  Text,
  ValidateMarkdown,
} from '../index';
import {
  alignmentProps,
  fontStyles,
  labelTextStyles,
  weightProps,
} from '../text';

const mockTrackEvent = jest.fn();
jest.mock('@rtm-ui/tracker', () => {
  const original = require.requireActual('@rtm-ui/tracker');
  return {
    ...original,
    useTracker: () => ({
      trackEvent: mockTrackEvent,
    }),
  };
});

describe('<Text />', () => {
  [Header, Paragraph, Small, Label].map(Component => {
    // FIXME: output name of component in test
    it('matches expected output', () => {
      const { getByText } = render(
        <Component p={10} color="accent">
          Hello, World!
        </Component>
      );
      expect(getByText('Hello, World!')).toBeInTheDocument();
      expect(getByText('Hello, World!')).toHaveStyleRule('color', '#ef8612');
    });

    it('provides box-styling when box props are provided', () => {
      const { getByText } = render(<Component p={10}>Hello, World!</Component>);
      expect(getByText('Hello, World!')).toHaveStyleRule('padding', '10px');
    });

    it('renders dangerous HTML when provided', () => {
      const potentiallyDangerousString =
        '<div>Danger:<ul><li>List Item</li></ul></div>';
      const { getByText } = render(
        <Component p={10} dangerousHTML={potentiallyDangerousString}>
          Hello, World!
        </Component>
      );
      expect(getByText('Danger:')).toBeInTheDocument();
    });
  });

  const weightAssertions = ['100', '400', '900', '400'];
  [...weightProps].map((weight, index) => {
    it(`matches the weight prop - ${weight}`, () => {
      const { getByText } = render(
        <Header weight={weight}>Hello, World!</Header>
      );
      expect(getByText('Hello, World!')).toHaveStyleRule(
        'font-weight',
        weightAssertions[index]
      );
    });
    it(`has no weight style when nothing is provided`, () => {
      const { getByText } = render(<Text tag="p">Hello, World!</Text>);
      expect(getByText('Hello, World!')).toHaveStyleRule(
        'font-weight',
        undefined
      );
    });
  });

  const fontStyleAssertions = ['Museo', 'MuseoSans'];
  fontStyles.map((fontStyle, index) => {
    it(`matches the font style prop - ${fontStyle}`, () => {
      const { getByText } = render(
        <Header font={fontStyle}>Hello, World!</Header>
      );
      expect(getByText('Hello, World!')).toHaveStyleRule(
        'font-family',
        fontStyleAssertions[index]
      );
    });
  });

  it('matchs the lableTextStyles', () => {
    const LabelTextStyles = styled(Label)`
      ${labelTextStyles};
    `;
    const { getByText } = render(
      <LabelTextStyles>Hello, World!</LabelTextStyles>
    );
    expect(getByText('Hello, World!')).toHaveStyleRule(
      'font-family',
      'MuseoSans'
    );
  });

  alignmentProps.map(alignment => {
    it(`matches the align prop - ${alignment}`, () => {
      const { getByText } = render(
        <Header align={alignment}>Hello, World!</Header>
      );
      expect(getByText('Hello, World!')).toHaveStyleRule(
        'text-align',
        alignment
      );
    });
  });
});

describe('<Markdown />', () => {
  it('renders links properly', () => {
    const { container } = render(
      <Markdown raw="Hello [world!](https://example.com)" />
    );
    expect(container).toContainElement(document.querySelector('a'));
  });
  it('allows tracking to work when a track option is provided', () => {
    const { getByText, container } = render(
      <Markdown raw="Hello [world!|get_started](https://example.com)" />
    );
    expect(container).toContainElement(document.querySelector('a'));
    fireEvent.click(getByText('world!'));
    expect(mockTrackEvent).toHaveBeenCalled();
  });
  it('adds in additional attributes when provided with correct object format', () => {
    const { container } = render(
      <Markdown raw='Hello [world!|get_started|{"target": "_blank"}](https://example.com)' />
    );
    expect(container).toContainElement(
      document.querySelector('a[target="_blank"]')
    );
  });
  it('does not break when we pass a single quoted additional attribute', () => {
    const { container } = render(
      <Markdown raw="Hello [world!|get_started|{'target': '_blank'}](https://example.com)" />
    );
    expect(container).not.toContainElement(
      document.querySelector('a[target="_blank"]')
    );
  });
  it('interpolates values when given a reference object', () => {
    const { getByText } = render(
      <Markdown
        referenceObject={{
          campaign: {
            name: 'Origin BES',
          },
        }}
        raw="This is the {{campaign.name}} campaign"
      />
    );
    expect(getByText('Origin BES')).toBeInTheDocument();
  });
  it('interpolates link values when given a reference object', () => {
    const { container } = render(
      <Markdown
        referenceObject={{
          campaign: {
            link: 'https://example.com',
          },
        }}
        raw="This is the campaign [here]({{campaign.link}})"
      />
    );
    expect(container).toContainElement(document.querySelector('a'));
  });
  it('renders "undefined" when the reference lookup doesn\'t exist', () => {
    const { getByText } = render(
      <Markdown
        referenceObject={{
          campaign: {
            name: 'Origin BES',
          },
        }}
        raw="This is the {{some.other.object.key}} campaign"
      />
    );
    expect(getByText('undefined')).toBeInTheDocument();
  });
  it('validates markdown false', () => {
    const bool = ValidateMarkdown(
      { campaign: { name: 'Origin BES' } },
      'This is the {{some.other.object.key}} campaign'
    );
    expect(bool).toBe(false);
  });
  it('validates markdown true', () => {
    const bool = ValidateMarkdown(
      { campaign: { name: 'Origin BES' } },
      'This is the {{campaign.name}} campaign'
    );
    expect(bool).toBe(true);
  });
  it('renders superscripts properly', () => {
    const { container } = render(<Markdown raw="Hello [^test]" />);
    expect(container).toContainElement(document.querySelector('sup'));
  });
  it('renders bold text properly', () => {
    const { container } = render(<Markdown raw="Hello **bold** text" />);
    expect(container).toContainElement(document.querySelector('strong'));
  });

  it('renders list properly', () => {
    const { container } = render(<Markdown raw="* Like * These lists?" />);
    expect(container).toContainElement(document.querySelector('li'));
  });
  it('renders italicized text properly', () => {
    const { container } = render(<Markdown raw="Hello _emphasized_ text" />);
    expect(container).toContainElement(document.querySelector('em'));
  });
  it('renders header text properly', () => {
    const { container } = render(<Markdown raw="## Hello" />);
    expect(container).toContainElement(document.querySelector('h2'));
  });
  it('renders left aligned text properly', async () => {
    const { getByText } = await render(<Markdown raw="<- Hello <-" />);
    expect(getByText('Hello').parentNode.parentNode).toHaveAttribute(
      'style',
      'text-align: left;'
    );
  });
  it('renders right aligned text properly', async () => {
    const { getByText } = await render(<Markdown raw="-> Hello ->" />);
    expect(getByText('Hello').parentNode.parentNode).toHaveAttribute(
      'style',
      'text-align: right;'
    );
  });
  it('renders center aligned text properly', async () => {
    const { getByText } = await render(<Markdown raw="-> Hello <-" />);
    expect(getByText('Hello').parentNode.parentNode).toHaveAttribute(
      'style',
      'text-align: center;'
    );
  });
  it('renders blocks properly', () => {
    const { getAllByText } = render(<Markdown raw={blocks} />);
    expect(getAllByText(/hello, world/i)[0].closest('p')).toHaveStyleRule(
      'font-size',
      '1em'
    );
    expect(
      getAllByText(/hello, world larger/i)[0].closest('div')
    ).toHaveStyleRule('font-size', '32px');
  });
  it('renders an image link', () => {
    const { container } = render(
      <Markdown raw="[![](https://someimage.com/image.png)](https://sample.com)" />
    );
    expect(container).toContainElement(document.querySelector('img'));
  });
  it('renders an image link with interpolation', () => {
    const { container } = render(
      <Markdown raw="[![](https://someimage.com/image.png)]({{campaign.link}})" />
    );
    expect(container).toContainElement(document.querySelector('a'));
    expect(container).toContainElement(document.querySelector('img'));
  });
  it('strips out html', () => {
    const { getByText } = render(<Markdown raw={`<span>Raw html</span>`} />);
    getByText('Raw html');
  });
});
