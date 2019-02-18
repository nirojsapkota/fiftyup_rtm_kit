import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

describe(`<BaseField />`, async () => {
  describe(`with an error`, async () => {
    const handleSubmit = jest.fn();
    it.skip(`highlights the error message when not focused`, async () => {
      const { getByTestId, getByText, getByLabelText } = render(
        <Form
          formId="test"
          onSubmit={handleSubmit}
          fields={[
            {
              label: 'Enter your name',
              error: 'Required',
              name: 'name',
              type: 'text',
              validator: 'required',
              itemValue: 'User',
            },
          ]}
        />,
        {
          themeOverrides: {
            'colors.variants.a.error': 'red',
            'colors.variants.a.text': 'black',
          },
        }
      );
      const itemInput = getByLabelText('Enter your name');
      fireEvent.change(itemInput, {
        target: { value: '' },
      });
      const errorContainer = getByTestId('fieldError');

      const submit = getByText('Get Started');
      fireEvent.click(submit);

      await wait(async () => {
        await expect(errorContainer).toHaveStyleRule('color', 'red');
        await itemInput.focus();
        await expect(errorContainer).toHaveStyleRule('color', 'black');
      });
    });
  });
});
