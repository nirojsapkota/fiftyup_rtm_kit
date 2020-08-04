import axios from 'axios';

export const submitSurvey = async (url, email, products) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };
  const data = { email, products };

  try {
    return await axios.post(url, data, config)
  } catch (error) {
    console.error(error)
    return false
  }
};

export const getSurvey = async (url, query) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    params: { email: query.email, t: Date.now() }
  };

  try {
    return await axios.get(url, config);
  } catch (error) {
    console.error(error)
    return false
  }

};



