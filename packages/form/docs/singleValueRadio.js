import React from 'react';
import { useForm, useFieldGroup, Field } from '../src';

export const example = {
  onSubmit: async values => console.log('gottt it', values),
  options: { autoComplete: true },
  form: {
    fields: [
      {
        label: 'Enter your email',
        config: {
          machine: 'text',
          validator: 'email',
        },
        name: 'email',
        value: '',
        type: 'text',
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
            name: 'fuel',
            value: '',
            type: 'radio',
            options: [
              { label: 'ELECTRICITY', value: 'e', icon: 'electricity' },
            ],
          },
        ],
        // next: {
        //   fields: [
        //     {
        //       label: 'Please select items',
        //       config: {
        //         machine: 'radio',
        //         component: 'panelRadio',
        //         validator: 'requiredRadio',
        //       },
        //       hint: 'Select for some reason',
        //       name: 'solar',
        //       value: '',
        //       type: 'radio',
        //       options: [
        //         { label: 'SOLAR', value: 'solar', icon: 'electricity' },
        //         { label: 'NONSOLAR', value: 'nonsolar', icon: 'electricity' },
        //       ],
        //     },
        //   ],
        // },
      },
  },
};

export const simple = {
  onSubmit: async values => console.log('gottt it', values),
  options: {
    autoComplete: true,
  },
  form: {
    fields: [
      {
        label: 'Do you have solar',
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
          label: 'Choose your fuel type',
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
            label: 'Enter your email',
            config: {
              machine: 'text',
              validator: 'email',
            },
            name: 'email',
            value: '',
            type: 'text',
          },
        ],
        next: {
          fields: [
            {
              label: 'What is your household size',
              config: {
                machine: 'radio',
                component: 'panelRadio',
                validator: 'requiredRadio',
              },
              hint: 'Select for some reason',
              name: 'household',
              value: '',
              type: 'radio',
              options: [
                // { label: 'SMALL', value: 'small', icon: 'electricity' },
                { label: 'MEDIUM', value: 'medium', icon: 'electricity' },
              ],
            },
          ],
        },
      },
    }),
  },
};

export const FieldGroup = ({ service }) => {
  const { fields, send, nextMachine, groupIsValidating } = useFieldGroup(
    service
  );

  return (
    <>
      {fields.map(field => (
        <Field
          key={field.name}
          groupIsValidating={groupIsValidating}
          machine={field.machine}
        />
      ))}
      <button onClick={() => send('submit')}>Submit</button>
      {nextMachine && <FieldGroup service={nextMachine} />}
    </>
  );
};

export const SingleValue = _props => {
  const props = simple; // Just an example - use props passed in
  const { fieldGroupMachine } = useForm(props);

  return (
    <>
      {fieldGroupMachine && <FieldGroup service={fieldGroupMachine} />}
      <div onClick={() => console.log('im focused')}>Click away</div>
    </>
  );
};
