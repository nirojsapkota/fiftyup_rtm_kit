import React from 'react';
import axios from 'axios';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  wait,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import { Csrf } from '../index';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<Csrf />', () => {
  const data = {
    authenticityToken: 'token',
    validateUrl: '/csrf/validate',
    generateTokenUrl: '/csrf/generate',
  };

  it('error when calling request', async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        status: 400,
        data: { errors: ['Bad request'] },
      },
    });

    axios.get.mockRejectedValueOnce({
      response: {
        status: 500,
        data: { errors: ['Internal server error'] },
      },
    });

    const { getByTestId } = render(
      <Csrf {...data}>
        {({ authenticityToken }) => (
          <div data-testid="id-token">{authenticityToken}</div>
        )}
      </Csrf>
    );

    // Expect that provided urls were called
    await wait(async () => {
      await expect(axios.get).toHaveBeenCalledWith(data.validateUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-control': 'no-cache',
        },
        params: {
          authenticityToken: data.authenticityToken,
        },
      });

      await expect(axios.get).toHaveBeenCalledWith(data.generateTokenUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-control': 'no-cache',
        },
      });

      expect(axios.get).toBeCalledTimes(2);
      expect(getByTestId('id-token').textContent).toEqual('');

      axios.get.mockReset();
    });
  });

  it('invalid token and generate success', async () => {
    const generatedToken = 'new_generated_token';

    axios.get.mockResolvedValueOnce({
      data: { validationResult: false },
    });

    axios.get.mockResolvedValueOnce({
      data: { authenticityToken: generatedToken },
    });

    const { getByTestId } = render(
      <Csrf {...data}>
        {({ authenticityToken }) => (
          <div data-testid="id-token">{authenticityToken}</div>
        )}
      </Csrf>
    );

    await wait(async () => {
      expect(getByTestId('id-token').textContent).toEqual(generatedToken);

      expect(axios.get).toBeCalledTimes(2);

      axios.get.mockReset();
    });
  });

  it('valid token', async () => {
    axios.get.mockResolvedValueOnce({
      data: { validationResult: true },
    });

    const { getByTestId } = render(
      <Csrf {...data}>
        {({ authenticityToken }) => (
          <div data-testid="id-token">{authenticityToken}</div>
        )}
      </Csrf>
    );

    await wait(async () => {
      expect(getByTestId('id-token').textContent).toEqual(
        data.authenticityToken
      );

      expect(axios.get).toBeCalledTimes(1);

      axios.get.mockReset();
    });
  });
});
