import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { SwitchConfirmPage } from '../index';
import { dummyData } from '../__fixtures__/dummyData';

describe('<SwitchConfirmPage />', () => {
  it('matches expected output', () => {
    const { queryByText } = render(<SwitchConfirmPage {...dummyData} />);
    expect(queryByText(/Confirm and agreement/i)).toBeInTheDocument();
    expect(queryByText(/Review your plan below/i)).toBeInTheDocument();
    expect(queryByText(/0909887778/i)).toBeInTheDocument();
    expect(queryByText(/Switch Now/i)).toBeInTheDocument();
  });

  it('Display review details when fireevent on tab', () => {
    const { queryByText, getByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    const headerElement = getByText('Your Plan Details');
    fireEvent.click(headerElement);

    expect(queryByText(/Contact Name/i)).toBeInTheDocument();
  });

  it('Display accordion details when fireevent on tab', () => {
    const { queryByText, getByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    const headerElement = getByText('Confirm and agreements');
    fireEvent.click(headerElement);

    expect(
      queryByText(/Content for confirm and agreements/i)
    ).toBeInTheDocument();
  });

  it('Submit to server when form valid', async () => {
    const { queryByText, getByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    const headerElement = getByText('Yes, I agree');

    const divSubmit = getByText('Switch Now');
    const btnSubmit = divSubmit.closest('button');

    fireEvent.click(headerElement);
    fireEvent.click(btnSubmit);

    expect(queryByText('Please select an option')).not.toBeInTheDocument();

  });

  it('Will trigger button click to submit form', async () => {
    const { queryByText, getByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    const submitLink = getByText('Click here to continue Your switch');
    fireEvent.click(submitLink);
    await wait(() => {
      expect(queryByText('Please select an option')).toBeInTheDocument();
    });
  });
});
