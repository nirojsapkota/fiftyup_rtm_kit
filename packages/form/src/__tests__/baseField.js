import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

describe(`<BaseField />`, async () => {
  describe(`when entering values in a masked input`, async () => {
    it(`matches the mask`, async () => {
      const { getByLabelText } = render(
        <Form
          formId="test"
          onSubmit={async () => {}}
          fields={[
            {
              label: 'Phone Number:',
              hint: 'Please follow the format provided (US numbers only)',
              name: 'phone_number',
              type: 'tel',
              mask: 'phoneUS',
              validator: 'mask',
              validatorArgs: ['phoneUS', 'Phone Number'],
            },
          ]}
        />
      );

      const itemInput = getByLabelText('Phone Number:');
      fireEvent.change(itemInput, {
        target: { value: '2345678901' },
      });

      await wait(() => {
        expect(itemInput.value).toEqual('+12345678901');
        // Set it back to null to test behavior on value deletion
        fireEvent.change(itemInput, {
          target: { value: null },
        });
        expect(itemInput.value).toEqual('');
      });
    });
  });
  describe(`when disabled`, async () => {
    const handleSubmit = jest.fn();
    it(`doesn't allow input`, async () => {
      const { getByLabelText } = render(
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
    });
  });
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
