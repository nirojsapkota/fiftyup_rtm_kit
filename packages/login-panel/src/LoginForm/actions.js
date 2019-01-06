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
      const { data } = response;
      return data;
    })
    .catch(error => {
      const { data, status } = error.response;
      if (status !== 401) {
        return { errors: ['Login was unsuccessful.'] };
      }
      return data;
    });

  return result;
};
