import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Footer from '../index';

describe('<Footer />', () => {
  it('has unit tests specified', () => {
    expect(true).toEqual(false);
  });

  it('matches expected output', () => {
    const text = 'Hello, World!';

    const { getByText } = render(<Footer>{text}</Footer>);

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toMatchSnapshot();
  });
});
