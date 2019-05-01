import axios from 'axios';

export const csrfValidate = async (url, authenticityToken) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
    },
    params: {
      authenticityToken,
    },
  };

  const result = await axios
    .get(url, config)
    .then(response => {
      const { data } = response;
      // console.log(data);
      return data.validationResult;
    })
    .catch(() => {
      // console.log(error);
      return false;
    });

  return result;
};

export const csrfGenerate = async url => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache',
    },
  };

  const result = await axios
    .get(url, config)
    .then(response => {
      const { data } = response;
      // console.log(data);
      return data.authenticityToken;
    })
    .catch(() => {
      // console.log(error);
      return null;
    });

  return result;
};
