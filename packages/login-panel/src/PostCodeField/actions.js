// NOTE: there is a rollup bug when compile file with import axios
// import axios from 'axios';
const axios = require('axios');

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
