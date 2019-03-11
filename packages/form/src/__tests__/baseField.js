import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';
import { getFieldProps } from './fieldSetup';

const form = {
  id: 'test-form',
  fields: [getFieldProps('email')],
};

describe(`<BaseField />`, async () => {
  describe(`with an error`, async () => {
    it(`can mutate fields from the submit handler`, async () => {
      const handleSubmit = jest.fn(fields => {
        return [{ ...fields[0], disabled: 'disabled' }];
      });
      const { getByLabelText, getByTestId, debug } = await render(
        <Form onSubmit={handleSubmit} {...form} />
      );
      const itemInput = await getByLabelText(form.fields[0].label);
      await fireEvent.change(itemInput, {
        target: { value: 'user@example.com' },
      });

      const submit = await getByTestId(`submit-test-form`);
      await fireEvent.click(submit);

      debug();
      await wait(async () => {
        await expect(itemInput).toHaveAttribute('disabled');
      });
    });

    it(`highlights the error message when not focused`, async () => {
      const handleSubmit = jest.fn();
      const { getByLabelText, getByTestId } = await render(
        <Form onSubmit={handleSubmit} {...form} />,
        {
          themeOverrides: {
            'colors.variants.a.error': 'red',
            'colors.variants.a.text': 'black',
          },
        }
      );

      const itemInput = await getByLabelText(form.fields[0].label);
      await fireEvent.change(itemInput, {
        target: { value: '' },
      });
      const errorContainer = await getByTestId('fieldError');

      const submit = getByTestId(`submit-test-form`);
      await fireEvent.click(submit);

      await wait(async () => {
        await expect(errorContainer).toHaveStyleRule('color', 'red');
        await fireEvent.focus(itemInput);
        await expect(errorContainer).toHaveStyleRule('color', 'black');
      });
    });
  });
});
