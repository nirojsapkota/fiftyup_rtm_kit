import { formInputs as sampleInputs } from '../../sampleInputs';

export const getFieldProps = name => {
  return sampleInputs.fields.find(({ name: fieldName }) => fieldName === name);
};

describe('filler', () => {
  it('should be true', () => {});
});

const formSetup = [
  {
    field: getFieldProps('phone_number'),
    valid: { entry: '2345678901', expect: '+1 (234) 567-8901' },
    invalid: { entry: '34567', expect: 'Not enough characters' },
  },
  {
    field: getFieldProps('postcode'),
    valid: { entry: '2000', expect: '2000, BARANGAROO' },
    // invalid: { entry: '', expect: 'Required' }, // TODO: not able to remove click on
  },
  {
    field: getFieldProps('currently_with_provider'),
    valid: { entry: 'yes' },
  },
  {
    field: getFieldProps('authorized'),
    valid: { entry: 'yes', expect: ['yes'] },
  },
  {
    field: getFieldProps('some_pref'),
    valid: { entry: 'yes', expect: 'yes' },
  },
  {
    field: getFieldProps('cc_token'),
    valid: { entry: '411111111111111', expect: 'tok_123' },
    invalid: { entry: '411111111111110', expect: 'Required' },
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
  {
    field: getFieldProps('some_pref'),
    valid: { entry: 'yes', expect: 'yes' },
  },
  {
    field: getFieldProps('icon_check'),
    valid: { entry: 'yes', expect: 'yes' },
  },
  {
    field: getFieldProps('icon_radio'),
    valid: { entry: 'yes', expect: 'yes' },
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
