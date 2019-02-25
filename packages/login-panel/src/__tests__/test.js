import React from 'react';
import axios from 'axios';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  wait,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import LoginPanel from '../index';
import loginPanelProps from '../__fixtures__/loginPanel';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const mockSuccessResponse = ['2000, BARANGAROO'];
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

describe('<LoginPanel />', () => {
  it('matches expected output', async () => {
    const { getByText, getByValue } = render(
      <LoginPanel {...loginPanelProps} />
    );

    // expect hidden fields
    const jumpPath = getByValue(loginPanelProps.hiddenFields.jump_path);
    expect(jumpPath.name).toEqual('jump_path');
    const registeringCampaignId = getByValue(
      loginPanelProps.hiddenFields.registering_campaign_id.toString()
    );
    expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(loginPanelProps.title)).toBeInTheDocument();
    expect(getByText(loginPanelProps.buttonText)).toBeInTheDocument();
  });

  it('success call with input props', async () => {
    // set Up
    axios.post.mockResolvedValue({ data: { redirectPath: '/' } });

    const { getByText, getByLabelText } = render(
      <LoginPanel {...loginPanelProps} />
    );

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    // expect props event was fired
    await wait(() => {
      expect(axios.post).toHaveBeenCalledWith(
        loginPanelProps.loginUrl,
        {
          ...loginPanelProps.hiddenFields,
          user: {
            email: 'user@example.com',
            postcode_suburb: '2000, Barangaroo',
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
      <LoginPanel {...loginPanelProps} />
    );

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
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

    const { getByText, getByLabelText } = render(
      <LoginPanel {...loginPanelProps} />
    );

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      // expect formError will display
    });
  });

  it('autocompelete api was called', async () => {
    const { getByLabelText } = render(<LoginPanel {...loginPanelProps} />);

    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000' },
    });

    await wait(async () => {
      // Wait until popup arrives
      const item = await getByLabelText('2000, BARANGAROO');
      expect(item).toBeInTheDocument();
    });
  });
});
