import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Logo from '../index';

describe('<Logo />', () => {
  it('render ninsaver logo', () => {
    const { container } = render(<Logo entityBrand="ninesaver" />);
    expect(container).toMatchSnapshot();
  });

  it('render custom logo', () => {
    const { getByAltText, container } = render(
      <Logo customLogo="https://placehold.it/100x100" />
    );
    expect(getByAltText('logo')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('do not render', () => {
    const { queryByAltText } = render(<Logo />);
    expect(queryByAltText('logo')).not.toBeInTheDocument();
  });
});
