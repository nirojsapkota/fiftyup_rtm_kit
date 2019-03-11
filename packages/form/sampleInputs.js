export const presignupInputs = {
  id: 'presignup',
  onSubmit: async values => values,
  fields: [
    {
      label: 'My Email:',
      name: 'email',
      type: 'text',
      config: {
        validator: 'email',
      },
    },
    {
      label: 'My Zipcode:',
      name: 'zipcode',
      type: 'text',
      hint: 'Ex. 2000, Barangaroo',
      autoComplete: 'off',
      config: {
        component: 'autocomplete',
        // searchFunction: async searchTerm => {
        //   return [
        //     { label: `${searchTerm}, Sydney` },
        //     { label: `${searchTerm}, Barangaroo` },
        //   ];
        // },
        searchFunction: searchTerm => {
          return fetch(
            `http://obsau.develop:3000/suburbs/autocomplete_postcode?term=${searchTerm}`,
            {
              method: 'GET',
            }
          )
            .then(payload => {
              return payload.json();
            })
            .then(results => {
              return results.map(item => {
                return { label: item };
              });
            });
        },
        validator: 'zipcode',
      },
    },
  ],
};

export const formInputs = {
  id: 'kitcket-sink',
  onSubmit: (values, context) => {
    console.log(values, context);
  },
  fields: [
    ...presignupInputs.fields,
    {
      label: 'Payment:',
      name: 'cc_token',
      type: 'text',
      config: {
        component: 'stripePayment',
        apiKey: 'pk_test_82Xn9YM3wF2LVCLD0kPewINf',
        validator: 'required',
        sensitive: true,
      },
    },
    {
      label: 'Phone Number:',
      disabled: true,
      hint: 'US numbers only',
      name: 'phone_number',
      type: 'tel',
      config: {
        mask: 'phoneUS',
        validator: 'mask',
        validatorArgs: ['phoneUS', 'Phone Number'],
      },
    },
    {
      label: 'Are you currently under contract with your provider?',
      config: {
        validator: 'requiredRadio',
      },
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
      config: {
        validator: 'requiredRadio',
      },
      name: 'some_pref',
      value: '',
      type: 'checkbox',
      options: [{ label: 'Yes', value: 'yes' }],
    },
    {
      label: 'Authorize',
      config: {
        validator: 'requiredRadio',
      },
      name: 'authorized',
      value: [],
      type: 'checkbox',
      options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
    },
    {
      label: 'authenticity_token',
      name: 'authenticity_token',
      type: 'hidden',
      config: {},
    },
  ],
};

export const stepInputs = {
  steps: [presignupInputs, formInputs],
};
