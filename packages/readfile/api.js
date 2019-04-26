import axios from 'axios';

export const readFile = async () =>
  axios.get(
    'https://7gx0dbfa20.execute-api.ap-southeast-2.amazonaws.com/admin/list',
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }
  );
export const downloadFile = async file =>
  axios.get(
    `https://7gx0dbfa20.execute-api.ap-southeast-2.amazonaws.com/admin/download/{file}`,
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }
  );
