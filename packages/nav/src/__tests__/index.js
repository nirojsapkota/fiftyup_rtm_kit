import React from 'react';
// eslint-disable-next-line
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Nav from '../index';

describe(`<Nav />`, () => {
  it(`should render`, () => {
    const onClick = jest.fn();
    const { getByText, getByTestId } = render(
      <Nav
        logo="thumbs-up"
        header={toggle => (
          <button data-test-id="header-action" onClick={toggle} />
        )}
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
    fireEvent.click(toggle);

    wait(() => {
      const toggle = getByTestId('header-action');
      const item = getByText(/privacy policy/i);
      expect(item).not.toBeInTheDocument();
      fireEvent.click(item);
      expect(item).toBeInTheDocument();
      expect(onClick).toHaveBeenCalled();
    });
  });
});
