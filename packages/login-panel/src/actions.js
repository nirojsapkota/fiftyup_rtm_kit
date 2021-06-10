import { track } from '@rtm-ui/tracker';
// NOTE: there is a rollup bug when compile file with import axios
// import axios from 'axios';
const axios = require('axios');

export const submitLogin = async (
  url,
  data,
  authenticityToken,
  trackingData
) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
  };

  const result = await axios
    .post(url, data, config)
    .then(response => {
      const { data, status } = response;

      track('signin/submit', trackingData);

      return { status, data };
    })
    .catch(error => {
      const { data, status } = error.response;

      // TODO: replace this with a proper error logging (e.g airbrake)
      track('signin/submit_error', trackingData);

      if (status !== 401) {
        return {
          status,
          data: {
            errors: [
              'An error has occurred, please try again in a few minutes',
            ],
          },
        };
      }
      return { status, data };
    });

  return result;
};

export const getAutoCompletePostcode = async (url, data, authenticityToken) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
    params: {
      term: data,
    },
  };

  const result = await axios
    .get(url, config)
    .then(response => {
      const { data } = response;
      return data;
    })
    .catch(() => {
      return [];
    });

  return result;
};
