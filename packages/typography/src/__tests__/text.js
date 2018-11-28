import React from 'react';
import { render } from '@rtm-test/bootstrap/setup/testSetup';
import { Header, Paragraph, Small } from '../index';
import { weightProps, fontStyles, alignmentProps } from '../text';

describe('<Text />', () => {
  [Header, Paragraph, Small].map(Component => {
    // FIXME: output name of component in test
    it('matches expected output', () => {
      const { getByText } = render(
        <Component variant="b" title="testing" p={10}>
          Hello, World!
        </Component>
      );
      expect(getByText('Hello, World!')).toBeInTheDocument();
      expect(getByText('Hello, World!')).toMatchSnapshot();
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
  [...weightProps, null].map((weight, index) => {
    it(`matches the weight prop - ${weight}`, () => {
      const { getByText } = render(
        <Header weight={weight}>Hello, World!</Header>
      );
      expect(getByText('Hello, World!')).toHaveStyleRule(
        'font-weight',
        weightAssertions[index]
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
