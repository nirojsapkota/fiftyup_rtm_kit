import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Logo from '../index';

describe('<Logo />', () => {
  it('has unit tests specified', () => {
    expect(true).toEqual(false);
  });

  it('matches expected output', () => {
    const text = 'Hello, World!';

    const { getByText } = render(<Logo>{text}</Logo>);

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toMatchSnapshot();
  });
});
