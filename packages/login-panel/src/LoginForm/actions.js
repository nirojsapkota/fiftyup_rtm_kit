// NOTE: there is a rollup bug when compile file with import axios
// import axios from 'axios';
const axios = require('axios');

export const submitLogin = async (url, data, authenticityToken) => {
  const config = {
    method: 'post',
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
    data,
  };

  const result = await axios(config)
    .then(response => {
      const { data } = response;
      return data;
    })
    .catch(error => {
      const { data } = error.response;
      return data;
    });

  return result;
};
