import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Icon, ICONS, Logo } from '../index';
import { Box } from '../../../layout/src';

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
  });

  it('renders the obs logo', () => {
    render(<Logo entityBrand="obs" />);
  });

  it('renders the OBS logo when the background is dark', () => {
    render(
      <Box variant="b">
        <Logo entityBrand="obs" />
      </Box>
    );
  });

  it('renders the 50Up logo', () => {
    render(<Logo entityBrand="fiftyup" />);
  });

  it('renders the 50Up logo when the background is dark', () => {
    render(
      <Box variant="b">
        <Logo entityBrand="fiftyup" />
      </Box>
    );
  });

  it('renders custom logo', () => {
    const { getByAltText } = render(
      <Logo customLogo="https://placehold.it/100x100" />
    );
    expect(getByAltText('logo')).toBeInTheDocument();
  });
});
