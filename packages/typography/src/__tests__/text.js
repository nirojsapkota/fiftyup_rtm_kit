import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Header, Paragraph, Label, Text, Small, Markdown } from '../index';
import {
  weightProps,
  fontStyles,
  alignmentProps,
  labelTextStyles,
} from '../text';
import styled from 'styled-components';

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
  it('renders superscripts properly', () => {
    const { container } = render(<Markdown raw="Hello [^test]" />);
    expect(container).toContainElement(document.querySelector('sup'));
  });
  it('renders bold text properly', () => {
    const { container } = render(<Markdown raw="Hello **bold** text" />);
    expect(container).toContainElement(document.querySelector('strong'));
  });
  it('renders italicized text properly', () => {
    const { container } = render(<Markdown raw="Hello _emphasized_ text" />);
    expect(container).toContainElement(document.querySelector('em'));
  });
  it('renders header text properly', () => {
    const { container } = render(<Markdown raw="## Hello" />);
    expect(container).toContainElement(document.querySelector('h2'));
  });
});
