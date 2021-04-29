import axios from 'axios';

export const sendToConversionAPI = async (data) => {
  const fbpValue = getFbClientId();
  if (data.meta && data.meta.fb_pixel_id && data.meta.fb_conversion_api_url) {
    const url = data.meta.fb_conversion_api_url;
    try {
      return await axios.post(url,
        {
          event_name: data.action,
          email: data.meta.email,
          postcode: data.meta.postcode,
          state: data.meta.state,
          pixel_id: data.meta.fb_pixel_id,
          fbp: fbpValue,
          category: data.category,
          plan_type: data.meta.plan_type,
          tracking_id: data.meta.tracking_id
        }
      )
    }
    catch (error) {
      console.error('caught exception', error)
      return false;
    }
  } else {
    console.log('Missing data for conversion api ', data.meta);
  }
};

function getFbClientId() {
  let result = /_fbp=(fb\.1\.\d+\.\d+)/.exec(window.document.cookie);
  if (!(result && result[1])) {
    return null;
  }
  return result[1];
}
