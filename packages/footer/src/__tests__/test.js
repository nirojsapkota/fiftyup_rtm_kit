import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Footer from '../index';

describe('<Footer />', () => {
  it('render custom logo', () => {
    const copyRightText = 'test copyright';
    const { getByAltText, container, getByText } = render(
      <Footer
        logoUrl="https://placehold.it/100x100"
        copyRightText={copyRightText}
      />
    );
    expect(getByAltText('logo')).toBeInTheDocument();
    expect(getByText(copyRightText)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
