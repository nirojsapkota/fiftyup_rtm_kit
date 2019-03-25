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
      it(`${icon} matches expected output with props: ${JSON.stringify(
        props
      )}`, () => {
        render(<Icon glyph={icon} {...props} />);

        // expect(container).toMatchSnapshot();
      });
    })
  );
});

describe('<Logo />', () => {
  it('renders the ninsaver logo', () => {
    render(<Logo entityBrand="ninesaver" />);
    // expect(container).toMatchSnapshot();
  });

  it('renders the obs logo', () => {
    render(<Logo entityBrand="obs" />);
    // expect(container).toMatchSnapshot();
  });

  it('renders the 50Up logo', () => {
    render(<Logo customLogo="fiftyup" />);
    // expect(getByAltText('logo')).toBeInTheDocument();
  });

  it('renders custom logo', () => {
    const { getByAltText } = render(
      <Logo customLogo="https://placehold.it/100x100" />
    );
    expect(getByAltText('logo')).toBeInTheDocument();
  });
});
