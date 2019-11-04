import React from 'react';
import { Xform, useForm, useFieldGroup, useField } from '../src';
import BaseField from '../src/fields/baseField'


export const example = {
  onSubmit: async values => console.log('gottt it', values),
  options: {},
  form: {
    fields: [
      {
        label: 'My postcode:',
        name: 'address',
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
  },
};
export const Field = ({ groupIsValidating, machine, useManualAddress }) => {
  const { context, send } = useField(machine, groupIsValidating);

  if(context.name === 'address' && useManualAddress) {
    const fullAddressForm = {
      onSubmit: async values => send({
        type: 'change',
        value: values,
      }),
      options: {
        autoComplete: true
      },
      form: {
        fields: [
          {
            label: 'Street 1:',
            name: 'street1',
            value: '',
            type: 'text',
            hint: '100 E Washington',
            config: {
              machine: 'text',
              validator: 'required',
            },
          },
          {
            label: 'Street 2:',
            name: 'street2',
            value: '',
            type: 'text',
            hint: 'Apt 2',
            config: {
              machine: 'text',
              validator: 'required',
            },
          },
        ],
      },
    };
    return <Xform {...fullAddressForm} />
  }

  return (
    <BaseField
      {...context}
      fieldUtils={{
        setFieldValue: (_name, value) => {
          send({
            type: 'change',
            value: value,
          });
        },
      }}
      onBlur={() => {
        send(`complete`);
      }}
      onChange={e => {
        send({
          type: 'change',
          value: e.target.value,
        });
      }}
      error={context.error}
    />
  );
};

export const FieldGroup = ({ service }) => {
  const { send, fields, groupIsValidating } = useFieldGroup(service);
  const [useManualAddress, setUseManualAddress] = React.useState(false)

  return (
    <>
      {fields.map(field => (
        <Field
          useManualAddress={useManualAddress}
          key={field.name}
          groupIsValidating={groupIsValidating}
          machine={field.machine}
        />
      ))}
      <button onClick={() => setUseManualAddress(true)}>Fill out manually</button>
      <button onClick={() => send('submit')}>Submit</button>
    </>
  );
};

export const Address = () => {
  const { fieldGroupMachine } = useForm(example);

  return (
  <>{fieldGroupMachine && <FieldGroup service={fieldGroupMachine} />}
  </>);
};
