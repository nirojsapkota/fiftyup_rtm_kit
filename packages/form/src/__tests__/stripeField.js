import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';
import { injectStripe, CardElement } from 'react-stripe-elements';

beforeEach(() => {
  global.Stripe = publicKey => {};
});

describe(`For an input of type paymentField`, async () => {
  describe(`with invalid input of 411111111111110`, async () => {
    it.only(`prevents submission and shows no match`, async () => {
      const handleSubmit = jest.fn();
      const { getByTestId, queryAllByTestId } = render(
        <Form
          id="payment"
          onSubmit={handleSubmit}
          fields={[
            {
              label: 'Payment:',
              name: 'cc_token',
              type: 'paymentField',
              validator: 'required',
            },
            {
              label: 'Payment:',
              name: 'other',
              type: 'paymentField',
            },
          ]}
        />
      );

      const item = getByTestId('stripe-input');
      item.focus();
      fireEvent.change(item, {
        target: { value: '411111111111110' },
      });

      const submit = getByTestId('submit-payment');
      submit.focus();
      fireEvent.click(submit);

      const errorContainers = queryAllByTestId('fieldError');
      await wait(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
        expect(errorContainers[0]).toHaveTextContent('Required');
      });
    });
  });
});
