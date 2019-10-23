import React from 'react';
import { useForm, useFieldGroup, Field } from '../src';

export const example = {
  onSubmit: async values => console.log('gottt it', values),
  options: { autoComplete: true },
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
  const props = example; // Just an example - use props passed in
  const { fieldGroupMachine } = useForm(props);

  return <>{fieldGroupMachine && <FieldGroup service={fieldGroupMachine} />}</>;
};
