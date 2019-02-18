import { formInputs as sampleInputs } from '../../sampleInputs';

const getFieldProps = name => {
  return sampleInputs.fields.find(({ name: fieldName }) => fieldName === name);
};

describe('filler', () => {
  it('should be true', () => {});
});

const formSetup = [
  {
    field: getFieldProps('zipcode'),
    valid: [{ entry: '45044', expect: '45044' }],
    invalid: { entry: '450', expect: 'Must be 5 digits' },
  },
  {
    field: getFieldProps('email'),
    valid: { entry: 'user@example.com' },
    invalid: [
      { entry: 'user.com', expect: 'Invalid email' },
      { entry: 'user@com', expect: 'Invalid email' },
    ],
  },
  {
    field: getFieldProps('phone_number'),
    valid: { entry: '2345678901', expect: '+1 (234) 567-8901' },
    invalid: { entry: '34567', expect: 'Not enough characters' },
  },
  {
    field: getFieldProps('currently_with_provider'),
    valid: { entry: 'yes' },
  },
  {
    field: getFieldProps('authorized'),
    valid: { entry: 'yes', expect: ['yes'] },
  },
];

export const formInputs = formSetup.map(item => {
  return {
    valid: item.valid,
    invalid: item.invalid,
    form: {
      id: 'test-form',
      fields: [item.field],
    },
  };
});
