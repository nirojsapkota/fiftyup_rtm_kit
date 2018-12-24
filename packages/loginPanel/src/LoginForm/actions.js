// import axios from 'axios';
const axios = require('axios');

export const submitLogin = (url, data, authenticityToken) => {
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

  return axios(config)
    .then(response => {
      const { data } = response;
      console.log(response);
      return data;
    })
    .catch(() => {
      console.log('error');
      return null;
    });
};
