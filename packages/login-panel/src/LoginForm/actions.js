// NOTE: there is a rollup bug when compile file with import axios
// import axios from 'axios';
const axios = require('axios');

export const submitLogin = async (url, data, authenticityToken) => {
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
      return { status, data };
    })
    .catch(error => {
      const { data, status } = error.response;
      if (status !== 401) {
        return {
          data: {
            errors: [
              'An error has occurred, please try again in a few minutes',
            ],
          },
          status,
        };
      }
      return { status, data };
    });

  return result;
};
