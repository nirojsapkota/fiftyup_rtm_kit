import React from 'react';
// eslint-disable-next-line
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import Nav from '../index';

describe(`<Nav />`, () => {
  it(`should render`, () => {
    const onClick = jest.fn();
    const { getByText, getByTestId } = render(
      <Nav
        logo="thumbs-up"
        items={[
          {
            id: 'privacy-policy',
            onClick,
            label: 'Privacy Policy',
          },
        ]}
      />
    );

    const toggle = getByTestId('toggle-nav');
    const item = getByText(/privacy policy/i);
    fireEvent.click(toggle);
    fireEvent.click(item);

    expect(onClick).toHaveBeenCalled();
  });
});
