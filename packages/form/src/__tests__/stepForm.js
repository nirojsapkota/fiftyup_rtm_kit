import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import StepForm from '../stepForm';

export const inputs = {
  steps: [
    {
      fields: [
        {
          label: 'First Name:',
          error: 'Name must be at least 6 characters',
          name: 'first_name',
          validator: 'required',
          initialValue: 'User',
        },
        {
          label: 'My Zipcode:',
          name: 'zipcode',
          type: 'addressSearch',
          validator: 'zipcode',
          apiService: 'zipcode',
          shouldMock: true,
          initialValue: '75000',
        },
        {
          label: 'My Email:',
          name: 'email',
          validator: 'email',
          initialValue: 'user@example.com',
        },
        {
          label: 'How would you like to be billed?',
          error: 'Please select an option',
          name: 'billing_period',
          value: 'year',
          validator: 'requiredRadio',
          type: 'radio',
          options: [
            { label: '$90/year (Best Value)', value: 'year' },
            { label: '$10/month', value: 'month' },
          ],
          initialValue: 'month',
        },
        {
          label: 'Social Security Number:',
          error: 'Must be 9 digits',
          placeholder: '  -  -    ',
          mask: 'ssn',
          validator: 'mask',
          validatorArgs: ['ssn'],
          name: 'ssn',
          initialValue: '123-45-6789',
        },
        {
          label: 'Phone Number:',
          hint: 'Please follow the format provided (US numbers only)',
          name: 'phone_number',
          type: 'tel',
          mask: 'phoneUS',
          validator: 'mask',
          validatorArgs: ['phoneUS', 'Phone Number'],
          initialValue: '+1 (234) 213-4233',
        },
        {
          label: 'Date of Birth:',
          error: 'Invalid date format',
          placeholder: 'MM/DD/YY',
          hint: 'MM/DD/YY',
          name: 'dob',
          type: 'datepicker',
          mask: 'dateUS',
          validator: 'mask',
          validatorArgs: ['dateUS'],
          initialValue: '02/02/1999',
        },
      ],
    },
  ],
};
// We are providing all field values on render
// since testing of fields is done elsewhere
describe('<Form />', () => {
  describe('with valid fields', () => {
    it('calls the onSubmit handler', async () => {
      const onSubmit = jest.fn();

      const { getByText } = render(<StepForm {...inputs} />);

      const submit = getByText(/get started/i);
      fireEvent.click(submit);

      await wait(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });

  it("doesn't allow invalid inputs", async () => {
    const onSubmit = jest.fn();

    const { getByLabelText, getByText } = render(<StepForm {...inputs} />);

    const email = getByLabelText(/my email/i);
    fireEvent.change(email, {
      target: { value: 'user' },
    });
    const postcode = getByLabelText(/my zipcode/i);
    fireEvent.change(postcode, {
      target: { value: '' },
    });

    const submit = getByText('Get Started');
    fireEvent.click(submit);

    await wait(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
