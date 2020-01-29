import React from 'react';
// eslint-disable-next-line import/named
import { render, wait } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';
import { getFieldProps } from './fieldSetup';

const form = {
  id: 'test-form',
  fields: [getFieldProps('cc_token')],
};

describe(`For a stripePayment component`, () => {
  it('works', () => {
    const handleSubmit = jest.fn();
    const { queryByTestId } = render(<Form onSubmit={handleSubmit} {...form} />);
    expect(queryByTestId('stripe-load-error')).toBeNull();
    console.log('stripe: ',queryByTestId('stripe-load-error'))
  });

  it('returns a stripe load error', () => {
    const handleSubmit = jest.fn();
    const setState = jest.fn(() => [null,true]);
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
    const { getByTestId } = render(<Form onSubmit={handleSubmit} {...form} />);

    wait(() => {
      expect(getByTestId('stripe-load-error')).toBeInTheDocument();
    })
  })
});
