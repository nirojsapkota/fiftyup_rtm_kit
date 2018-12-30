import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import LoginPanel from '../index';

describe('<LoginPanel />', () => {
  it('has unit tests specified', () => {
    expect(true).toEqual(false);
  });

  it('matches expected output', () => {
    const text = 'Hello, World!';

    const { getByText } = render(<LoginPanel>{text}</LoginPanel>);

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toMatchSnapshot();
  });
});
