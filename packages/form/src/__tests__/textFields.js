import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

describe(`<TextField />`, () => {
  describe(`when submitting immediately`, () => {
    const handleSubmit = jest.fn();
    it(`prevents submission and shows an error`, async () => {
      const { queryAllByTestId, getByTestId } = render(
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
  describe(`with function as validator`, () => {
    const handleSubmit = jest.fn();
    const validatorFn = jest.fn();
    it(`prevents submission and shows an error`, async () => {
      const { queryAllByTestId, getByTestId, getByLabelText } = render(
        <Form
          id="test"
          onSubmit={handleSubmit}
          fields={[
            {
              label: 'Name',
              name: 'name',
              type: 'text',
              config: {
                validator: 'valueMatch',
                validatorArgs: [validatorFn, "error message"],
              },
            },
          ]}
        />
      );
      const itemInput = getByLabelText('Name');
      fireEvent.change(itemInput, {
        target: { value: 'test' },
      });
      const submit = getByTestId(`submit-test`);
      fireEvent.click(submit);
      await wait(() => {
        expect(validatorFn).toHaveBeenCalled();
      });
    })
  })
  describe(`with regex validation`, () => {
    const handleSubmit = jest.fn();
    it(`prevents submission and shows an error`, async () => {
      const { queryAllByTestId, getByTestId, getByLabelText } = render(
        <Form
          id="test"
          onSubmit={handleSubmit}
          fields={[
            {
              label: 'Name',
              name: 'name',
              type: 'text',
              config: {
                validator: 'valueMatch',
                validatorArgs: ["^[a-z]{1,2}[0-9]{7}$", "1 to 2 letters, 7 digits, no spaces"],
              },
            },
          ]}
        />
      );
      const itemInput = getByLabelText('Name');
      const errorContainers = queryAllByTestId('fieldError');
      fireEvent.change(itemInput, {
        target: { value: 'test' },
      });
      const submit = getByTestId(`submit-test`);
      fireEvent.click(submit);
      await wait(() => {
        expect(errorContainers[0]).toHaveTextContent('1 to 2 letters, 7 digits, no spaces');
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    })
  })

  describe(`without matching passwords`, () => {
    describe(`the password confirm validator`, () => {
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
