import axios from 'axios';

export const sendToConversionAPI = async (tracking, fullEventPath) => {
  console.log('sendToConversionAPI data ', tracking);
  const fbpValue = getFbClientId();
  const conversionUrl = window.facebook_conversion_url;
  const pixelId = window.facebook_pixel_id;

  if (pixelId && conversionUrl) {
    const result = await axios
      .post(conversionUrl, {
        event_name: fullEventPath,
        email: tracking.meta.email,
        postcode: tracking.meta.postcode,
        state: tracking.meta.state,
        pixel_id: pixelId,
        fbp: fbpValue,
        category: tracking.category,
        plan_type: tracking.meta.plan_type,
        tracking_id: tracking.meta.tracking_id,
      })
      .then(response => {
        return response.data;
      })
      .catch(ex => {
        console.error(ex);
        return false;
      });
    return result;
  } else {
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
