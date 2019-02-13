import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

const testFields = [
  {
    fieldType: '<TextField />',
    testData: [
      {
        inputValue: '',
        errorMessage: 'Required',
        field: {
          label: 'Zipcode:',
          name: 'zipcode',
          validator: 'required',
        },
      },
      {
        inputValue: '123',
        errorMessage: 'Must be 5 digits',
        field: {
          label: 'Zipcode:',
          name: 'zipcode',
          validator: 'zipcode',
        },
      },
      {
        inputValue: '123',
        errorMessage: 'Not enough characters',
        field: {
          label: 'Phone Number:',
          hint: 'Please follow the format provided (US numbers only)',
          name: 'phone_number',
          type: 'tel',
          mask: 'phoneUS',
          validator: 'mask',
          validatorArgs: ['phoneUS', 'Phone Number'],
        },
      },
    ],
  },
  {
    fieldType: '<NumberField />',
    testData: [
      {
        inputValue: '',
        errorMessage: 'Required',
        field: {
          label: 'My Email:',
          name: 'email',
          validator: 'required',
        },
      },
      {
        inputValue: 'invalidemail',
        errorMessage: 'Invalid email address',
        field: {
          label: 'My Email:',
          name: 'email',
          validator: 'email',
        },
      },
    ],
  },
];

const setup = (handleSubmit, field) => {
  return render(<Form onSubmit={handleSubmit} fields={[field]} />);
};

const runTest = ({ field, inputValue, errorMessage }) => {
  const validatorDescription = field.validatorArgs
    ? `${field.validator} (${field.validatorArgs[0]})`
    : field.validator;
  describe(`the ${validatorDescription} validator`, async () => {
    const handleSubmit = jest.fn();
    it(`prevents submission and shows ${errorMessage}`, async () => {
      const { getByTestId, getByText, getByLabelText } = setup(
        handleSubmit,
        field
      );
      const itemInput = getByLabelText(field.label);
      fireEvent.change(itemInput, {
        target: { value: inputValue },
      });
      const errorContainer = getByTestId('fieldError');
      const submit = getByText('Get Started');
      fireEvent.click(submit);

      await wait(() => {
        expect(errorContainer).toHaveTextContent(errorMessage);
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });
  });
};

testFields.map(({ fieldType, testData }) => {
  describe(fieldType, () => {
    describe('with invalid input', () => {
      testData.map(testField => {
        runTest(testField);
      });
    });
  });
});

describe(`<TextField />`, async () => {
  describe(`without matching passwords`, async () => {
    describe(`the password confirm validator`, async () => {
      const handleSubmit = jest.fn();
      it(`prevents submission and shows no match`, async () => {
        const { queryAllByTestId, getByText, getByLabelText } = render(
          <Form
            onSubmit={handleSubmit}
            fields={[
              {
                label: 'Enter a password:',
                error: 'Password too easy',
                name: 'password',
                autoComplete: 'new-password',
                type: 'password',
                validator: 'passwordComplexity',
              },
              {
                label: 'Confirm password:',
                error: 'Passwords do not match',
                name: 'confirmPassword',
                autoComplete: 'new-password',
                type: 'password',
                validator: 'passwordConfirm',
                validatorArgs: ['password'],
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

        const submit = getByText('Get Started');
        fireEvent.click(submit);

        await wait(() => {
          expect(errorContainers[1]).toHaveTextContent("Passwords don't match");
          expect(handleSubmit).not.toHaveBeenCalled();
        });
      });
    });
  });
});
