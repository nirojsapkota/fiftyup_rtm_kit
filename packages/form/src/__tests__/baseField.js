import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

describe(`<BaseField />`, async () => {
  describe(`when disabled`, async () => {
    const handleSubmit = jest.fn();
    it.only(`doesn't allow input`, async () => {
      const { debug, getByLabelText } = render(
        <Form
          onSubmit={handleSubmit}
          fields={[
            {
              label: 'Enter your name',
              error: 'Requied',
              name: 'name',
              type: 'text',
              disabled: true,
              validator: 'required',
            },
          ]}
        />
      );
      const itemInput = getByLabelText('Enter your name');
      fireEvent.change(itemInput, {
        target: { value: 'User' },
      });
      debug();
    });
  });
  describe(`with an error`, async () => {
    const handleSubmit = jest.fn();
    it(`highlights the error message when not focused`, async () => {
      const { getByTestId, getByText, getByLabelText } = render(
        <Form
          onSubmit={handleSubmit}
          fields={[
            {
              label: 'Enter your name',
              error: 'Requied',
              name: 'name',
              type: 'text',
              validator: 'required',
            },
          ]}
        />
      );
      const itemInput = getByLabelText('Enter your name');
      fireEvent.change(itemInput, {
        target: { value: 'password' },
      });
      const errorContainer = getByTestId('fieldError');

      const submit = getByText('Get Started');
      fireEvent.click(submit);

      // expect text color to be red
      fireEvent.click(itemInput);
      // expect text color to be regular

      await wait(() => {
        expect(errorContainer).toHaveStyleRule('color', 'red');
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
