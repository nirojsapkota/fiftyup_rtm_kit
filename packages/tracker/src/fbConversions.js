import axios from 'axios';

export const sendToConversionAPI = async (data) => {
  const fbpValue = getFbClientId();
  if (data.meta && data.pixelId && data.conversionUrl) {
    const url = data.conversionUrl;
    const result = await axios.post(url,
      {
        event_name: data.action,
        email: data.meta.email,
        postcode: data.meta.postcode,
        state: data.meta.state,
        pixel_id: data.pixelId,
        fbp: fbpValue,
        category: data.category,
        plan_type: data.meta.plan_type,
        tracking_id: data.meta.tracking_id
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((ex) => {
        console.error(ex);
        return false;
      })
    return result;
  } else {
    if (!data.pixelId) {
      console.log('Missing facebook pixel id in meta');
    }
    if (!data.conversionUrl) {
      console.log('Missing facebook conversion api url in meta');
    }
    return false;
  }
};

function getFbClientId() {
  let result = /_fbp=(fb\.1\.\d+\.\d+)/.exec(window.document.cookie);
  if (!(result && result[1])) {
    return null;
  }
  return result[1];
}
