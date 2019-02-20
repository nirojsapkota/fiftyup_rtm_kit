export const presignupInputs = {
  id: 'presignup',
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
      type: 'text',
      validator: 'email',
    },
  ],
};

export const formInputs = {
  id: 'kitcket-sink',
  onSubmit: (values, bag, context) => {
    console.log(values, bag, context);
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
      type: 'text',
      validator: 'email',
    },
    {
      label: 'Payment:',
      name: 'cc_token',
      type: 'paymentField',
      validator: 'required',
      sensitive: true,
    },
    {
      label: 'Phone Number:',
      hint: 'US numbers only',
      name: 'phone_number',
      type: 'tel',
      mask: 'phoneUS',
      validator: 'mask',
      validatorArgs: ['phoneUS', 'Phone Number'],
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
      label: 'Some preference',
      validator: 'requiredRadio',
      name: 'some_pref',
      value: '',
      type: 'checkbox',
      options: [{ label: 'Yes', value: 'yes' }],
    },
    {
      label: 'Authorize',
      validator: 'requiredRadio',
      name: 'authorized',
      value: [],
      type: 'checkbox',
      options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
    },
  ],
};

export const stepInputs = {
  steps: [presignupInputs, formInputs],
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
