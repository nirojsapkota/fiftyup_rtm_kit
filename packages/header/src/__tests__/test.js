import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Header from '../index';

describe('<Header />', () => {
  it('has unit tests specified', () => {
    expect(true).toEqual(false);
  });

  it('matches expected output', () => {
    const text = 'Hello, World!';

    const { getByText } = render(<Header>{text}</Header>);

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toMatchSnapshot();
  });
});
