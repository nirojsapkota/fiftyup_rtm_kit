import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Icon, { ICONS, Logo } from '../index';

describe('<Icon />', () => {
  [
    { size: 48 },
    { rotate: 45 },
    { hover: 'secondary' },
    { fill: 'primary' },
    { inline: true },
  ].map(props =>
    Object.keys(ICONS).map(icon => {
      it(`matches expected output with props: ${JSON.stringify(props)}`, () => {
        render(<Icon glyph={icon} {...props} />);

        // expect(container).toMatchSnapshot();
      });
    })
  );
});

describe('<Logo />', () => {
  it('render ninsaver logo', () => {
    render(<Logo entityBrand="ninesaver" />);
    // expect(container).toMatchSnapshot();
  });

  it('render custom logo', () => {
    const { getByAltText, container } = render(
      <Logo customLogo="https://placehold.it/100x100" />
    );
    expect(getByAltText('logo')).toBeInTheDocument();
    // expect(container).toMatchSnapshot();
  });

  it('do not render', () => {
    const { queryByAltText } = render(<Logo />);
    // expect(queryByAltText('logo')).not.toBeInTheDocument();
  });
});
