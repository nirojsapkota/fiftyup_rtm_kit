import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

beforeEach(() => {
  // global.Stripe = publicKey => {};
  window.history.pushState({}, 'Test Title', '/test.html?query=true');
});

describe(`For an input of type paymentField`, async () => {
  // FIXME: this is first becuase the others aren't cleaning up properly
  it(`presents a notice when stripe can't be reached`, async () => {
    const handleSubmit = jest.fn();
    const { getByTestId, debug } = render(
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
        ]}
      />
    );

    const stripeScript = await document.getElementById('stripe');
    var event = new Event('error');
    stripeScript.dispatchEvent(event);

    const errorContainer = getByTestId('stripe-load-error');
    await wait(async () => {
      debug();
      expect(errorContainer).toHaveTextContent(
        'Unable to load payment gateway'
      );
    });
  });
  it(`provides the stripe token to the form`, async () => {
    const handleSubmit = jest.fn();
    const { getByTestId, queryAllByTestId, debug } = render(
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
        ]}
      />
    );

    const item = getByTestId('stripe-input');
    item.focus();
    fireEvent.change(item, {
      target: { value: '411111111111111' },
    });

    const submit = getByTestId('submit-payment');

    await wait(() => {
      submit.focus();
      fireEvent.click(submit);
      expect(handleSubmit).toHaveBeenCalledWith(
        [
          {
            label: 'Payment:',
            name: 'cc_token',
            type: 'paymentField',
            validator: 'required',
            value: 'tok_123',
          },
        ],
        expect.anything()
      );
    });
  });

  describe(`with invalid input of 411111111111110`, async () => {
    it(`prevents submission and shows no match`, async () => {
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
          ]}
        />
      );

      const item = getByTestId('stripe-input');
      item.focus();
      fireEvent.change(item, {
        target: { value: '411111111111110' },
      });

      const submit = getByTestId('submit-payment');
      const errorContainers = queryAllByTestId('fieldError');

      await wait(() => {
        submit.focus();
        fireEvent.click(submit);
        expect(handleSubmit).not.toHaveBeenCalled();
        expect(errorContainers[0]).toHaveTextContent('Required');
      });
    });
  });
});
