// NOTE: there is a rollup bug when compile file with import axios
// import axios from 'axios';
// const axios = require('axios');

// export const getAutoCompletePostcode = async (url, data, authenticityToken) => {
//   const config = {
//     method: 'get',
//     url,
//     headers: {
//       Accept: 'application/json',
//       'X-CSRF-Token': authenticityToken,
//     },
//     params: {
//       term: data,
//     },
//   };

//   const result = await axios(config)
//     .then(response => {
//       const { data } = response;
//       return data;
//     })
//     .catch(() => {
//       return [];
//     });

//   return result;
// };

function makeid() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i += 1)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const getAutoCompletePostcode = () => {
  const a = makeid();
  const b = makeid();
  const c = makeid();

  return [
    { value: a, label: a },
    { value: b, label: b },
    { value: c, label: c },
  ];
};
