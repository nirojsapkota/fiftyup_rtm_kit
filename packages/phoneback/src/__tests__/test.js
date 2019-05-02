import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { PhonebackBox } from '../index';
import sample from '../../sample';

const setup = form => {
  const rendered = render(<PhonebackBox form={form} text={sample.text} />);
  const callbackButton = rendered.getByText(/request a callback/i);
  fireEvent.click(callbackButton);

  const emailField = rendered.getByLabelText(/my email:/i);
  const phoneNumberField = rendered.getByLabelText(/phone number:/i);
  fireEvent.change(emailField, {
    target: { value: 'user@example.com' },
  });
  fireEvent.change(phoneNumberField, {
    target: { value: '0422058679' },
  });

  const formSubmitButton = rendered.getByText(/call me back/i);
  fireEvent.click(formSubmitButton);

  return rendered;
};

describe('<Phoneback />', () => {
  describe('with a valid callback handler', () => {
    it.only('calls the onSubmit and onSuccess handlers', async () => {
      const onSubmit = jest.fn(async fields => fields);
      const onSuccess = jest.fn(async () => {});
      const formProps = { ...sample.form, onSubmit, onSuccess };

      const { getByText } = setup(formProps);

      await wait(async () => {
        expect(onSubmit).toHaveBeenCalled();
        expect(onSuccess).toHaveBeenCalled();
        await wait(() => {
          expect(
            getByText('Thank you for requesting a call back.')
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe('with an invalid callback handler', () => {
    it('shows an error', async () => {
      const onSubmit = jest.fn(async () => {
        throw new Error('some error');
      });
      const onSuccess = jest.fn(async () => {});
      const formProps = { ...sample.form, onSubmit, onSuccess };

      const { getByText } = setup(formProps);

      await wait(async () => {
        expect(onSubmit).toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
        await wait(() => {
          expect(getByText(/something went wrong/i)).toBeInTheDocument();
        });
      });
    });
  });
});
