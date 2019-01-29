import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { BasicHeader } from '../index';

describe('<Header />', () => {
  it('render custom logo', () => {
    const { getByAltText, container } = render(
      <BasicHeader logoUrl="https://placehold.it/100x100" />
    );
    expect(getByAltText('logo')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
