import axios from 'axios';

export const sendToConversionAPI = (data) => {
  const url = data.meta.fbConversionApiUrl;

  if(data.meta && data.meta.fb_pixel_id && data.meta.fbConversionApiUrl) {
    try {
      return axios.post(url,
        {
          event_name: data.action,
          email: data.meta.email,
          postcode: data.meta.postcode,
          state: data.meta.state,
          pixel_id: data.meta.fb_pixel_id
        }
      )
    }
    catch (error) {
      console.error('caught exception', error)
      return false;
    }
  }
};
