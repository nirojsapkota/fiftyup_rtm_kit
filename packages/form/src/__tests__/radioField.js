import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import Form from '../index';

const radioField = {
  label: 'E-Billing',
  error: 'Please select an option',
  name: 'ebilling',
  value: 'yes',
  type: 'radio',
  validator: 'required',
  options: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }],
};

const setup = () => {
  return render(<Form fields={[radioField]} />);
};

// We are providing all field values on render
// since testing of fields is done elsewhere
describe('<RadioField/>', () => {
  describe('when clicking on the radio icon', async () => {
    it('marks itself as checked', async () => {
      const { getByLabelText } = setup();

      const itemInput = getByLabelText(/no/i);

      fireEvent.click(itemInput);

      await wait(() => {
        expect(itemInput).toHaveAttribute('checked');
      });
    });
  });

  describe('when clicking on the label', async () => {
    it('marks itself as checked', async () => {
      const { getByLabelText, getByText } = setup();

      const itemLabel = getByText(/no/i);
      const itemInput = getByLabelText(/no/i);
      fireEvent.click(itemLabel);

      await wait(() => {
        expect(itemInput).toHaveAttribute('checked');
      });
    });
  });

  describe('when not clicking anything', async () => {
    it('marks itself as required', async () => {
      const { getByText } = setup();

      const submit = getByText(/get started/i);
      fireEvent.click(submit);

      await wait(() => {
        getByText(/required/i);
      });
    });
  });
});
