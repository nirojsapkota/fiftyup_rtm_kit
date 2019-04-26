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
  it(`presents a notice when stripe can't be reached`, async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(<Form onSubmit={handleSubmit} {...form} />);

    const stripeScript = await document.getElementById('stripe');
    var event = new Event('error');
    stripeScript.dispatchEvent(event);

    const errorContainer = getByTestId('stripe-load-error');
    await wait(async () => {
      expect(errorContainer).toHaveTextContent(
        'Unable to load payment gateway'
      );
    });
  });
});
