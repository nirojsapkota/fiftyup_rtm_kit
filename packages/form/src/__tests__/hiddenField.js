import React from 'react';
// eslint-disable-next-line import/named
import { render } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

describe(`<HiddenField />`, () => {
  it(`matches expected output`, async () => {
    const handleSubmit = jest.fn();
    const { getByValue } = render(
      <Form
        id="test"
        onSubmit={handleSubmit}
        fields={[
          {
            label: '',
            name: 'authenticity_token',
            type: 'hidden',
            initialValue: 'token_key',
            config: {},
          },
        ]}
      />
    );

    // expect hidden fields
    const field = getByValue('token_key');
    expect(field.name).toEqual('authenticity_token');
  });
});
