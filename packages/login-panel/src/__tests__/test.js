import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import LoginPanel from '../index';

describe('<LoginPanel />', () => {
  it('matches expected output', async () => {
    // const onSubmit = jest.fn();

    const { getByText, getByPlaceholderText } = render(<LoginPanel />);

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);
  });
});
