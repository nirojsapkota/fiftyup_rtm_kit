// NOTE: there is a rollup bug when compile file with import axios
// import axios from 'axios';
//const axios = require('axios');
import axios from 'axios';
export const submitLogin = async (url, data, authenticityToken) => {
  // TODO REMOVE THIS
  // console.log("I AM BEING CALLED")
  // console.log(data)
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
  };

  return await axios
    .post(url, data, config)
    .then(response => {
      const { data, status } = response;
      return { status, data };
    })
    .catch(error => {
      const { data, status } = error.response;
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

  // TODO REMOVE THIS
  // console.log("THY RESPONSE IS")
  // console.log(result)
  return result;
};

export const submitLifeInsuranceQuoteDetails = async (
  url,
  campaignId,
  data,
  authenticityToken
) => {
  const params = {
    campaign_id: campaignId,
    authenticity_token: authenticityToken,
    method: 'patch',
    'lead[first_name]': data.firstName,
    'lead[last_name]': data.surname,
    'lead[primary_contact_no]': data.phoneNumber,
    'lead[age]': data.age,
    'lead[gender]': data.gender,
    'life_insurance_lead_fragment[smoker]': data.smoker,
    'life_insurance_lead_fragment[cover_required]': data.cover,
  };
  const result = await axios
    .get(url, { params })
    .then(response => {
      const { data } = response;
      return data;
    })
    .catch(() => {
      return [];
    });

  return result;
};

export const submitCallbackTime = async (
  url,
  campaignId,
  data,
  authenticityToken
) => {
  const params = {
    campaign_id: campaignId,
    authenticity_token: authenticityToken,
    'phoneback[preferred_time]': data.phoneBackPrefferedTime,
    api: true,
    _: 0,
  };
  const result = await axios
    .get(url, { params })
    .then(response => {
      const { data } = response;
      return data;
    })
    .catch(() => {
      return [];
    });

  return result;
};
