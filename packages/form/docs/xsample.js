export const example = {
  onSubmit: async values => console.log('gottt it', values),
  options: {},
  form: {
    fields: [
      {
        label: 'My postcode:',
        name: 'postcode',
        value: '',
        type: 'text',
        hint: 'Eg. 2000, BARANGAROO',
        autoComplete: 'off',
        config: {
          machine: 'text',
          component: 'autocomplete',
          searchFunction: async searchTerm => {
            return [
              { label: `${searchTerm}, Sydney` },
              { label: `${searchTerm}, Barangaroo` },
            ];
          },
          validator: 'required',
        },
      },
    ],
    nextFn: async () =>
      await {
        fields: [
          {
            label: 'Please select items',
            config: {
              machine: 'radio',
              component: 'panelRadio',
              validator: 'requiredRadio',
            },
            hint: 'Select for some reason',
            name: 'solar',
            value: '',
            type: 'radio',
            options: [
              { label: 'SOLAR', value: 'solar', icon: 'electricity' },
              { label: 'NON-SOLAR', value: 'nonsolar', icon: 'electricity' },
            ],
          },
        ],
        next: {
          fields: [
            {
              label: 'Please select items',
              config: {
                machine: 'radio',
                component: 'panelRadio',
                validator: 'requiredRadio',
              },
              hint: 'Select for some reason',
              name: 'fuel',
              value: '',
              type: 'radio',
              options: [
                { label: 'ELECTRICITY', value: 'e', icon: 'electricity' },
                { label: 'GAS & ELEC', value: 'eg', icon: 'electricity' },
              ],
            },
          ],
          next: {
            fields: [
              {
                label: 'Please select items',
                config: {
                  machine: 'radio',
                  component: 'panelRadio',
                  validator: 'requiredRadio',
                },
                hint: 'Select for some reason',
                name: 'householdSize',
                value: '',
                type: 'radio',
                options: [
                  { label: 'SMALL', value: 'small', icon: 'electricity' },
                  { label: 'MEDIUM', value: 'medium', icon: 'electricity' },
                  { label: 'LARGE', value: 'large', icon: 'electricity' },
                ],
              },
            ],
          },
        },
      },
  },
};

export const exampleWithAutoComplete = {
  ...example,
  options: {
    autoComplete: true,
  },
};
