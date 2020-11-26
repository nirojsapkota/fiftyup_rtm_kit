import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import planProps, { actions } from '../__fixtures__/plans';
import { PrimaryAction } from '../PrimaryAction';

const axios = require('axios');
jest.mock('axios');

const fillAndFireForm = ({
  data,
  fireEvent,
  getByLabelText,
  getByText,
  getByTestId,
  submitText,
}) => {
  fireEvent.change(getByLabelText(/First Name:/i), {
    target: { value: data.first_name },
  });
  fireEvent.change(getByLabelText(/Last Name:/i), {
    target: { value: data.last_name },
  });
  fireEvent.change(getByLabelText(/Phone Number:/i), {
    target: { value: data.phone },
  });
  fireEvent.click(getByTestId('checkbox-agreement_checkbox_yes'));

  const formSubmitButton = getByText(submitText).closest('button');

  fireEvent.click(formSubmitButton);
};
const completeForm = ({ onSuccess }) => {
  const { authenticityToken, plan, phonebackProps } = planProps;
  const phonebackActionProps = {
    ...actions.request_call_back,
    ...phonebackProps,
    setPhonebackSubmitted: onSuccess,
    authenticityToken,
    campaignId: plan.campaign_id,
  };
  const util = render(<PrimaryAction {...phonebackActionProps} />);
  const { getByText, getByLabelText, getByTestId } = util;
  fireEvent.click(getByText(/request a callback/i));
  expect(getByText(phonebackProps.header)).toBeInTheDocument();

  const data = {
    campaign_id: plan.campaign_id,
    first_name: 'Tony',
    last_name: 'Joe',
    phone: '0788266553',
  };

  fillAndFireForm({
    data,
    fireEvent,
    getByLabelText,
    getByText,
    getByTestId,
    submitText: phonebackProps.submitText,
  });

  return { data, util };
};

describe('<PrimaryAction />', () => {
  describe('with the callback option', () => {
    it('calls the setSubmitted callback', async () => {
      axios.post.mockResolvedValue({ status: 200 });
      const mockSetSubmitted = jest.fn();
      const { data } = completeForm({ onSuccess: mockSetSubmitted });

      await wait(async () => {
        expect(mockSetSubmitted).toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(
          actions.request_call_back.link,
          {
            agreement_checkbox: 'yes',
            phoneback: data,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-CSRF-Token': planProps.authenticityToken,
            },
          }
        );
      });
    });
    it('handles server errors properly', async () => {
      const mockSetSubmitted = jest.fn();
      axios.post.mockRejectedValue({
        response: {
          status: 500,
        },
      });
      const { data, util } = completeForm({ onSuccess: mockSetSubmitted });

      await wait(async () => {
        expect(mockSetSubmitted).not.toHaveBeenCalled();
        expect(util.getByText('Unexpected problem, please contact support.'));
        expect(axios.post).toHaveBeenCalledWith(
          actions.request_call_back.link,
          {
            agreement_checkbox: 'yes',
            phoneback: data,
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-CSRF-Token': planProps.authenticityToken,
            },
          }
        );
      });
    });
  });
});
