import axios from 'axios';

export const sendToConversionAPI = async (tracking, fullEventPath) => {
  console.log('sendToConversionAPI data ', tracking);
  const fbpValue = getFbClientId();
  const url = window.facebook_conversion_url || '';
  const pixelId = window.facebook_pixel_id || '';
  console.log('FB params', url, pixelId, typeof pixelId);

  if (pixelId.length > 0 && url.length > 0) {
    const result = await axios
      .post(url, {
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
