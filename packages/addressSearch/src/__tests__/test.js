// import React from 'react';
import { render, fireEvent } from '@rtm-ui/bootstrap/setup/testSetup';
// import AddressSearch from '../index';
import { setup } from '../util/setup';

describe('<AddressSearch />', () => {
  it('creates an valid input field', () => {
    const { getByLabelText } = render(
      setup({ label: 'Address', name: 'address' })
    );

    expect(getByLabelText('Address')).toBeInTheDocument();
  });

  it('turns off browser autocomplete', () => {
    const { getByLabelText } = render(
      setup({ label: 'Address', name: 'address' })
    );

    expect(getByLabelText('Address')).toHaveAttribute('autocomplete', 'off');
  });

  it('selects the item', () => {
    const label = 'Address';
    const { getByLabelText, getByText } = render(
      setup({ label, name: 'address' })
    );
    const input = getByLabelText(label);
    fireEvent.click(input);
    fireEvent.change(input, {
      target: { value: 'Oh' },
    });

    const selection = getByText(/OH -/);
    fireEvent.click(selection);

    expect(getByLabelText('Address').value).toEqual('OH - Ohio');
  });
});
