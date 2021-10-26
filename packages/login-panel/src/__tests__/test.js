import React from 'react';
import axios from 'axios';
import * as Tracker from '../../../tracker';
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
import { LoginPanel } from '../index';
import loginPanelProps from '../__fixtures__/loginPanel';
import loginPanelExitIntentProps from '../__fixtures__/loginPanelExitIntent';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<LoginPanel />', () => {
  it('matches expected output with phone and name fields', async () => {
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

    const { getByText, getByDisplayValue } = await render(
      <LoginPanel
        {...loginPanelProps}
        stateField={postCodeField}
        emailField={emailField}
        showFullNameField={true}
        showPhoneNumberField={true}
      />
    );

    const { hiddenFields } = loginPanelProps;

    // expect hidden fields
    const jumpPath = getByDisplayValue(hiddenFields.jump_path);
    expect(jumpPath.name).toEqual('jump_path');
    const registeringCampaignId = getByDisplayValue(
      hiddenFields.registering_campaign_id.toString()
    );
    expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(loginPanelProps.title)).toBeInTheDocument();
    expect(getByText(loginPanelProps.buttonText)).toBeInTheDocument();

    expect(getByText(postCodeField.label)).toBeInTheDocument();
    expect(getByText(postCodeField.hint)).toBeInTheDocument();

    expect(getByText(emailField.label)).toBeInTheDocument();

    expect(getByText('First Name:')).toBeInTheDocument();
    expect(getByText('Last Name:')).toBeInTheDocument();
    expect(getByText('Phone Number:')).toBeInTheDocument();
  });

  it('matches expected output without phone and name fields', async () => {
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

    const { getByText, queryByText, getByDisplayValue } = await render(
      <LoginPanel
        {...loginPanelProps}
        stateField={postCodeField}
        emailField={emailField}
      />
    );

    const { hiddenFields } = loginPanelProps;

    // expect hidden fields
    const jumpPath = getByDisplayValue(hiddenFields.jump_path);
    expect(jumpPath.name).toEqual('jump_path');
    const registeringCampaignId = getByDisplayValue(
      hiddenFields.registering_campaign_id.toString()
    );
    expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(loginPanelProps.title)).toBeInTheDocument();
    expect(getByText(loginPanelProps.buttonText)).toBeInTheDocument();

    expect(getByText(postCodeField.label)).toBeInTheDocument();
    expect(getByText(postCodeField.hint)).toBeInTheDocument();

    expect(getByText(emailField.label)).toBeInTheDocument();

    expect(queryByText('First Name:')).not.toBeInTheDocument();
    expect(queryByText('Last Name:')).not.toBeInTheDocument();
    expect(queryByText('Phone Number:')).not.toBeInTheDocument();
  });

  it('success call with input props', async () => {
    // set Up
    const data = ['5000, ADELAIDE', '5000, ADELAIDE BC'];
    axios.get.mockResolvedValue({
      data,
    });
    axios.post.mockResolvedValue({ data: { redirectPath: '/' } });
    axios.post.mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { redirectPath: '/' },
      })
    );

    const { getByText, getByLabelText } = await render(
      <LoginPanel {...loginPanelProps} />
    );

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

    const spiedTrack = jest.spyOn(Tracker, 'track');

    // expect props event was fired
    await wait(() => {
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
    expect(spiedTrack).toHaveBeenCalled();
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
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelProps.buttonText).closest('button');
    fireEvent.click(submit);

    await wait(() => {
      expect(container).toHaveTextContent('Email is not valid');
      expect(container).toHaveTextContent('Postcode is not valid');
    });
  });

  it('Get internal errors from server when submit login', async () => {
    // set Up
    // axios.post.mockRejectedValue({
    //   response: {
    //     status: 500,
    //     data: { errors: ['Random error'] },
    //   },
    // });

    axios.post.mockImplementation(() =>
      Promise.resolve({
        status: 500,
        data: { errors: ['Random error'] },
      })
    );

    const { getByText, getByLabelText, container } = await render(
      <LoginPanel {...loginPanelProps} />
    );

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

    const spiedTrack = jest.spyOn(Tracker, 'track');

    await wait(async () => {
      expect(container).toHaveTextContent(
        'An error has occurred, please try again in a few minutes'
      );
      expect(spiedTrack).toHaveBeenCalled();
    });
  });

  it('autocompelete api was called', async () => {
    // setup resolve
    const data = ['5000, ADELAIDE', '5000, ADELAIDE BC'];
    // axios.get.mockResolvedValue({
    //   data,
    // });

    axios.get.mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: data,
      })
    );

    const { getByLabelText, container } = await render(
      <LoginPanel {...loginPanelProps} />
    );

    const postcode = getByLabelText('My Postcode:');
    await fireEvent.change(postcode, {
      target: { value: '5000' },
    });

    await wait(async () => {
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
      const item = await getByLabelText('5000, ADELAIDE BC');
      expect(item).toBeInTheDocument();
    });

    await wait(async () => {
      // setup reject
      axios.get.mockRejectedValue({
        response: {
          status: 500,
          data: { errors: ['error'] },
        },
      });

      await fireEvent.change(postcode, {
        target: { value: '5000, ADELAIDE' },
      });

      await wait(async () => {
        expect(axios.get).toHaveBeenCalled();
        expect(container).not.toHaveTextContent('5000, ADELAIDE BC');
      });
    });
  });

  it('state field with pre-populate data', async () => {
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

    const { getByLabelText } = render(
      <LoginPanel {...loginPanelProps} stateField={stateField} />
    );

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });

    const state = getByLabelText(stateField.label);
    await fireEvent.change(state, {
      target: { value: 'Carlow' },
    });

    await wait(async () => {
      // Wait until popup arrives
      const item = await getByLabelText(stateField.options[0].label);
      expect(item).toBeInTheDocument();

      await fireEvent.click(item);
      expect(state.value).toEqual(stateField.options[0].label);
    });
  });
});

describe('<LoginPanel />', () => {
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

    const { getByText, getByDisplayValue } = render(
      <LoginPanel
        {...loginPanelExitIntentProps}
        stateField={postCodeField}
        emailField={emailField}
      />
    );

    const { hiddenFields } = loginPanelProps;

    // expect hidden fields
    const jumpPath = getByDisplayValue(hiddenFields.jump_path);
    expect(jumpPath.name).toEqual('jump_path');
    const registeringCampaignId = getByDisplayValue(
      hiddenFields.registering_campaign_id.toString()
    );
    expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(loginPanelProps.title)).toBeInTheDocument();
    expect(getByText(loginPanelProps.buttonText)).toBeInTheDocument();

    expect(getByText(postCodeField.label)).toBeInTheDocument();
    expect(getByText(postCodeField.hint)).toBeInTheDocument();

    expect(getByText(emailField.label)).toBeInTheDocument();
  });

  it('Get unauthorize errors from server when submit login on', async () => {
    // set Up
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { errors: ['Email is not valid', 'Postcode is not valid'] },
      },
    });

    const { getByText, getByLabelText, container } = render(
      <LoginPanel {...loginPanelExitIntentProps} />
    );

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelExitIntentProps.buttonText).closest(
      'button'
    );
    fireEvent.click(submit);

    await wait(() => {
      expect(container).toHaveTextContent('Email is not valid');
      expect(container).toHaveTextContent('Postcode is not valid');
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
      <LoginPanel {...loginPanelExitIntentProps} />
    );

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelExitIntentProps.buttonText).closest(
      'button'
    );
    fireEvent.click(submit);

    await wait(() => {
      expect(container).toHaveTextContent('Email is not valid');
      expect(container).toHaveTextContent('Postcode is not valid');
    });
  });

  it('Get internal errors from server when submit login - exit intent', async () => {
    // set Up
    axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: { errors: ['Random error'] },
      },
    });

    const { getByText, getByLabelText, container } = render(
      <LoginPanel {...loginPanelExitIntentProps} />
    );

    const email = getByLabelText('My Email:');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByLabelText('My Postcode:');
    fireEvent.change(postcode, {
      target: { value: '2000, BARANGAROO' },
    });

    const submit = getByText(loginPanelExitIntentProps.buttonText).closest(
      'button'
    );
    fireEvent.click(submit);

    const spiedTrack = jest.spyOn(Tracker, 'track');

    await wait(async () => {
      expect(container).toHaveTextContent(
        'An error has occurred, please try again in a few minutes'
      );
      expect(spiedTrack).toHaveBeenCalled();
    });
  });
});
