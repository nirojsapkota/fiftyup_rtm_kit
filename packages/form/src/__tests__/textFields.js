import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

describe(`<TextField />`, async () => {
  describe(`when submitting immediately`, async () => {
    const handleSubmit = jest.fn();
    it(`prevents submission and shows an error`, async () => {
      const { queryAllByTestId, getByTestId, debug } = render(
        <Form
          id="test"
          onSubmit={handleSubmit}
          fields={[
            {
              label: 'Name',
              name: 'name',
              type: 'text',
              config: {
                validator: 'required',
              },
            },
          ]}
        />
      );

      const errorContainers = queryAllByTestId('fieldError');

      const submit = getByTestId(`submit-test`);
      fireEvent.click(submit);

      await wait(() => {
        expect(errorContainers[0]).toHaveTextContent('Required');
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });
  });
  describe(`without matching passwords`, async () => {
    describe(`the password confirm validator`, async () => {
      const handleSubmit = jest.fn();
      it(`prevents submission and shows no match`, async () => {
        const { queryAllByTestId, getByTestId, getByLabelText } = render(
          <Form
            id="test"
            onSubmit={handleSubmit}
            fields={[
              {
                label: 'Enter a password:',
                error: 'Password too easy',
                name: 'password',
                autoComplete: 'new-password',
                type: 'password',
                config: {
                  validator: 'passwordComplexity',
                },
              },
              {
                label: 'Confirm password:',
                error: 'Passwords do not match',
                name: 'confirmPassword',
                autoComplete: 'new-password',
                type: 'password',
                config: {
                  validator: 'passwordConfirm',
                  validatorArgs: ['password'],
                },
              },
            ]}
          />
        );
        const itemInput = getByLabelText('Enter a password:');
        const passwordConfirmInput = getByLabelText('Confirm password:');
        fireEvent.change(itemInput, {
          target: { value: 'password' },
        });
        fireEvent.change(passwordConfirmInput, {
          target: { value: 'other-password' },
        });
        const errorContainers = queryAllByTestId('fieldError');

        const submit = getByTestId(`submit-test`);
        fireEvent.click(submit);

        await wait(() => {
          expect(errorContainers[1]).toHaveTextContent("Passwords don't match");
          expect(handleSubmit).not.toHaveBeenCalled();
        });
      });
    });
  });
});
