import React from 'react';
import axios from 'axios';
import {
  render,
  waitFor,
  fireEvent,
  cleanup,
  screen,
} from '../../../bootstrap/setup/testSetup';
import { LoginCalculatorPanel } from '../index';

import loginPanelProps from '../__fixtures__/loginPanel';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<LoginCalculatorPanel />', () => {
  it('matches expected output', async () => {
    const postCodeField = {
      label: 'My Postcode:',
      placeholder: 'Postcode',
      fieldName: 'postcode',
      hint: '10001, New York',
    };
    const emailField = {
      label: 'My Email:',
      fieldName: 'postcode',
      placeholder: 'Email',
    };

    const { getByText, getByValue } = render(
      <LoginCalculatorPanel
        {...loginPanelProps}
        stateField={postCodeField}
        emailField={emailField}
      />
    );

    const { hiddenFields } = loginPanelProps;

    // expect hidden fields
    const jumpPath = getByValue(hiddenFields.jump_path);
    expect(jumpPath.name).toEqual('jump_path');
    const registeringCampaignId = getByValue(
      hiddenFields.registering_campaign_id.toString()
    );
    expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(loginPanelProps.title)).toBeInTheDocument();
    expect(getByText(loginPanelProps.buttonText)).toBeInTheDocument();

    expect(getByText(postCodeField.label)).toBeInTheDocument();
    expect(getByText(postCodeField.hint)).toBeInTheDocument();

    expect(getByText(emailField.label)).toBeInTheDocument();
  });

  it('success call with input props', async () => {
    // set Up
    axios.post.mockResolvedValue({ data: { redirectPath: '/' } });

    const { getByText, getByLabelText } = render(
      <LoginCalculatorPanel {...loginPanelProps} />
    );

    const email = screen.getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });

    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelProps.buttonText).closest('button');
    fireEvent.click(submit);

    // expect props event was fired
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        loginPanelProps.loginUrl,
        {
          ...loginPanelProps.hiddenFields,
          user: {
            email: 'user@example.com',
            postcode_suburb: '2000, BARANGAROO',
          },
          authenticity_token: loginPanelProps.authenticityToken,
          redirectPath: '',
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': loginPanelProps.authenticityToken,
          },
        }
      );
    });
  });

  it('Get unauthorize errors from server when submit login', async () => {
    // set Up
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { errors: ['Email is not valid', 'Postcode is not valid'] },
      },
    });

    const { getByText, getByLabelText, container } = render(
      <LoginCalculatorPanel {...loginPanelProps} />
    );
    // This awaits for the useEffect within login-calculator-panel (index) (think like onCompleteMount) to fire off.
    await screen.findByLabelText('My Email:');

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelProps.buttonText).closest('button');
    fireEvent.click(submit);

    await waitFor(() => {
      expect(container).toHaveTextContent('Email is not valid');
      expect(container).toHaveTextContent('Postcode is not valid');
    });
  });

  it('Get internal errors from server when submit login', async () => {
    // set Up
    axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: { errors: ['Random error'] },
      },
    });

    const { getByText, getByLabelText, container } = render(
      <LoginCalculatorPanel {...loginPanelProps} />
    );

    // This awaits for the useEffect within login-calculator-panel (index) (think like onCompleteMount) to fire off.
    await screen.findByLabelText('My Email:');

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelProps.buttonText).closest('button');
    fireEvent.click(submit);

    await waitFor(() => {
      expect(container).toHaveTextContent(
        'An error has occurred, please try again in a few minutes'
      );
    });
  });

  it('autocompelete api was called', async () => {
    // setup resolve
    const data = ['5000, ADELAIDE', '5000, ADELAIDE BC'];
    axios.get.mockResolvedValue({
      data,
    });

    const { container } = render(<LoginCalculatorPanel {...loginPanelProps} />);
    const postcode = screen.getByLabelText('My Postcode:');
    await fireEvent.change(postcode, {
      target: { value: '5000' },
    });

    await waitFor(async () => {
      expect(axios.get).toHaveBeenCalledWith(
        loginPanelProps.autocompletePostcodeUrl,
        {
          headers: {
            Accept: 'application/json',
            'X-CSRF-Token': loginPanelProps.authenticityToken,
          },
          params: { term: '5000' },
        }
      );

      // Wait until popup arrives
      const item = getByLabelText('5000, ADELAIDE BC');
      expect(item).toBeInTheDocument();
    });

    await waitFor(async () => {
      // setup reject
      axios.get.mockRejectedValue({
        response: {
          status: 500,
          data: { errors: ['error'] },
        },
      });

      fireEvent.change(postcode, {
        target: { value: '5000, ADELAIDE' },
      });

      await waitFor(async () => {
        expect(axios.get).toHaveBeenCalled();
        expect(container).not.toHaveTextContent('5000, ADELAIDE BC');
      });
    });
  });

  it('state field with pre-populated data', async () => {
    // set Up
    axios.post.mockResolvedValue({ data: { redirectPath: '/' } });

    const stateField = {
      label: 'My County:',
      fieldName: 'state',
      name: 'state',
      placeholder: 'County',
      hint: 'E.g: Carlow',
      options: [
        { label: 'Carlow', value: 'CW' },
        { label: 'Kilkenny', value: 'KK' },
      ],
    };

    const { findByText, findByLabelText, getByLabelText } = render(
      <LoginCalculatorPanel {...loginPanelProps} stateField={stateField} />
    );

    // This awaits for the useEffect within login-calculator-panel (index) (think like onCompleteMount) to fire off.
    await findByText('My Email:');
    const email = getByLabelText('My Email:');

    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });

    const state = await findByLabelText(stateField.label);

    await fireEvent.change(state, {
      target: { value: 'Carlow' },
    });

    await waitFor(async () => {
      // Wait until popup arrives
      const item = await findByLabelText(stateField.options[0].label);
      expect(item).toBeInTheDocument();

      await fireEvent.click(item);
      expect(state.value).toEqual(stateField.options[0].label);
    });
  });
});
