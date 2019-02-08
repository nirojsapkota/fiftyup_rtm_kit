export const inputs = {
  steps: [
    {
      options: {
        submitText: 'Personal Info',
        submitIcon: 'view-forward',
      },
      fields: [
        {
          label: 'My Zipcode:',
          name: 'zipcode',
          type: 'text',
          validator: 'zipcode',
        },
        {
          label: 'My Email:',
          name: 'email',
          validator: 'email',
        },
      ],
    },
    {
      fields: [
        {
          label: 'First Name:',
          error: 'Name must be at least 6 characters',
          name: 'first_name',
          validator: 'required',
        },
        {
          label: 'Last Name:',
          error: 'Name must be at least 6 characters',
          name: 'family_name',
          validator: 'required',
        },
        {
          label: 'Phone Number:',
          hint: 'Please follow the format provided (US numbers only)',
          name: 'phone_number',
          type: 'tel',
          mask: 'phoneUS',
          validator: 'mask',
          validatorArgs: ['phoneUS', 'Phone Number'],
        },
        {
          label: 'Property Address:',
          placeholder: '123 Main St',
          hint: 'Start typing and then select from the list',
          error: 'Invalid address',
          name: 'address',
          type: 'text',
          validator: 'required',
        },
        {
          label: 'Enter a password:',
          error: 'Password too easy',
          disabled: true,
          name: 'password',
          autoComplete: 'new-password',
          type: 'password',
          validator: 'required',
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
      ],
    },
    {
      fields: [
        {
          label: 'I would like to use One Big Switch for:',
          validator: 'requiredRadio',
          name: 'switch_for_current_address',
          value: 'true',
          type: 'radio',
          options: [
            { label: 'My current address', value: 'true' },
            { label: 'Moving to a new address', value: 'false' },
          ],
        },
        {
          label: 'Are you currently under contract with your provider?',
          validator: 'requiredRadio',
          name: 'currently_with_provider',
          value: '',
          type: 'radio',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
            { label: 'Not Sure', value: 'notSure' },
          ],
        },
        {
          label: 'Do you want to use only (renewable) green energy?',
          error: 'Please select an option',
          name: 'want_green_energy',
          value: '',
          validator: 'requiredRadio',
          type: 'radio',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
        },
      ],
    },
    {
      fields: [
        {
          label: 'Do you want to receive your bills via email only?',
          error: 'Please select an option',
          name: 'e_billing',
          value: 'yes',
          type: 'radio',
          validator: 'requiredRadio',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
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
        },
        {
          label: 'Payment:',
          name: 'cc_token',
          type: 'paymentField',
        },
        {
          label: 'My billing address is the same as the supply address',
          error: 'Please select an option',
          name: 'billing_same_as_supply',
          value: 'yes',
          type: 'radio',
          validator: 'required',
          options: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ],
        },
        {
          label: 'Social Security Number:',
          error: 'Must be 9 digits',
          placeholder: '  -  -    ',
          mask: 'ssn',
          validator: 'mask',
          validatorArgs: ['ssn'],
          name: 'ssn',
        },
        {
          label: 'Date of Birth:',
          error: 'Invalid date format',
          placeholder: 'MM/DD/YY',
          hint: 'MM/DD/YY',
          name: 'dob',
          type: 'text',
        },
      ],
    },
  ],
};

export const radioInput = {
  label: 'My billing address is the same as the supply address',
  error: 'Please select an option',
  name: 'billing_same_as_supply',
  value: 'yes',
  type: 'radio',
  validator: 'required',
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
};
