import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';
import { injectStripe, CardElement } from 'react-stripe-elements';

beforeEach(() => {
  global.Stripe = publicKey => {};
});

describe(`<StripeField />`, async () => {
  describe(`with invalid info`, async () => {
    it.only(`prevents submission and shows no match`, async () => {
      const { queryAllByTestId, getByTestId, getByLabelText } = render(
        <Form
          formId="payment"
          onSubmit={() => {}}
          fields={[
            {
              label: 'Payment:',
              name: 'cc_token',
              type: 'paymentField',
            },
          ]}
        />
      );

      const item = getByTestId('stripe-input');
      item.focus();
      fireEvent.change(item, {
        target: { value: '4111111111111111' },
      });

      const submit = getByTestId('form-payment-submit');
      submit.focus();
      fireEvent.click(submit);

      await wait(() => {});
    });
  });
});
