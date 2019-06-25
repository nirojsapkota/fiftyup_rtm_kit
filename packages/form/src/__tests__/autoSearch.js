import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

describe(`An autosearch form`, () => {
  it(`can submit the form when valid`, async () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = await render(
      <Form
        onSubmit={handleSubmit}
        id="test"
        autoSearch
        fields={[
          {
            label: 'Do you have solar panels?',
            config: {
              validator: 'requiredRadio',
            },
            name: 'solar',
            value: '',
            type: 'radio',
            options: [
              { label: 'Yes', value: 'true' },
              { label: 'No', value: 'false' },
            ],
          },
        ]}
      />
    );

    const itemInput = await getByLabelText(/yes/i);
    await fireEvent.click(itemInput);
    await wait(async () => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
