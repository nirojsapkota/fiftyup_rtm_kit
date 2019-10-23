import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Xform } from '../index';

export const simple = {
  onSubmit: async values => console.log('gottt it', values),
  options: {
    autoComplete: true,
  },
  form: {
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
    nextFn: async () => ({
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
    }),
  },
};

describe('xform', () => {
  it('is good', () => {
    const util = render(<Xform {...simple} />);
    util.debug();
  });
});
