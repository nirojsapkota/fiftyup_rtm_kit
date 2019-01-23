import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Context from '../index';

describe('<Context />', () => {
  it('has unit tests specified', () => {
    expect(true).toEqual(false);
  });

  it('matches expected output', () => {
    const text = 'Hello, World!';

    const { getByText } = render(<Context>{text}</Context>);

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toMatchSnapshot();
  });
});
