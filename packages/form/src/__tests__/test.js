import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

describe('<Form />', () => {
  it('matches expected output', async () => {
    const onSubmit = jest.fn();

    const { getByLabelText, getByText } = render(<Form onSubmit={onSubmit} />);

    const email = getByLabelText('email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('Get Started');
    fireEvent.click(submit);

    await wait(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("doesn't allow invalid inputs", async () => {
    const onSubmit = jest.fn();

    const { getByLabelText, getByText } = render(<Form onSubmit={onSubmit} />);

    const email = getByLabelText('email');
    fireEvent.change(email, {
      target: { value: 'user' },
    });
    const postcode = getByLabelText('postcode');
    fireEvent.change(postcode, {
      target: { value: '' },
    });

    const submit = getByText('Get Started');
    fireEvent.click(submit);

    await wait(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it("doesn't allow empty inputs", async () => {
    const onSubmit = jest.fn();

    const { getByText, getByLabelText } = render(<Form onSubmit={onSubmit} />);

    const email = getByLabelText('email');
    fireEvent.change(email, {
      target: { value: '' },
    });

    const submit = getByText('Get Started');
    fireEvent.click(submit);

    await wait(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
