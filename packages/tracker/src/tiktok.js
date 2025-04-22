import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  getKeys,
  getOptionalKeys,
  getValues,
  reformatDefault,
} from './pageViewHelper';

const cookies = new Cookies();

const eventCode = fullEventPath => {
  const viewContent = /^(virtual\/general\/)(onebigswitch\.com\.au|onebigswitch\.ie|fiftyupclub\.com)---campaigns$/;
  const clickbutton = /\/signin\/submit/;
  const search = /virtual\/mobile\/signin\/submit/;
  const submitForm = /virtual\/energy\/get_started/;
  const download = /virtual\/travel\/get_started/;
  const contact = /virtual\/health-insurance\/signin\/submit/;
  const initiateCheckout = /virtual\/car-insurance\/signin\/submit/;
  const addPaymentInfo = /virtual\/home-and-contents-insurance\/signin\/submit/;
  const addToCart = /virtual\/travel\/signin\/submit/;
  const completePayment = /virtual\/health\/get_started/;
  const completeRegistration = /virtual\/car\/get_started/;
  const placeAnOrder = /virtual\/home\/get_started/;
  const addToWishlist = /virtual\/energy\/signin\/submit/;
  const subscribe = /virtual\/mobile\/get_started/;

  /* istanbul ignore next */
  if (viewContent.test(fullEventPath)) {
    return 'ViewContent';
  } else if (clickbutton.test(fullEventPath)) {
    return 'Clickbutton';
  } else if (search.test(fullEventPath)) {
    return 'Search';
  } else if (submitForm.test(fullEventPath)) {
    return 'SubmitForm';
  } else if (download.test(fullEventPath)) {
    return 'Download';
  } else if (contact.test(fullEventPath)) {
    return 'Contact';
  } else if (initiateCheckout.test(fullEventPath)) {
    return 'InitiateCheckout';
  } else if (addPaymentInfo.test(fullEventPath)) {
    return 'AddPaymentInfo';
  } else if (addToCart.test(fullEventPath)) {
    return 'AddToCart';
  } else if (completePayment.test(fullEventPath)) {
    return 'CompletePayment';
  } else if (completeRegistration.test(fullEventPath)) {
    return 'CompleteRegistration';
  } else if (placeAnOrder.test(fullEventPath)) {
    return 'PlaceAnOrder';
  } else if (addToWishlist.test(fullEventPath)) {
    return 'AddToWishlist';
  } else if (subscribe.test(fullEventPath)) {
    return 'Subscribe';
  } else {
    return fullEventPath.replace(/\//g, '-');
  }
};

// Need to send email from browser track, may be through context
//https://business-api.tiktok.com/portal/docs?id=1741601162187777
export const sendToTiktokEventsAPI = async (tracking, fullEventPath) => {
  console.log('sendToTiktokEventsAPI data ', tracking);
  var currentURL = window.location.href;
  const ttclid = cookies.get('ttclid');
  const tiktokEventUrl = window.tiktok_events_url;
  const pixelId = window.tiktok_pixel_id;
  // https://business-api.tiktok.com/portal/docs?id=1771100879787009
  // https://www.simoahava.com/analytics/custom-templates-guide-for-google-tag-manager/
  if (pixelId && tiktokEventUrl) {
    // https://business-api.tiktok.com/portal/docs?id=1771100865818625
    const eventTime = +new Date();
    const result = await axios
      .post(tiktokEventUrl, {
        event_source: 'web',
        event_source_id: pixelId,
        event_id: `${cookies.get('user_email')}_${eventCode(fullEventPath)}`,
        data: [
          {
            /* istanbul ignore next */
            event: eventCode(fullEventPath),
            event_time: eventTime,
            user: {
              ttclid: ttclid,
              email: cookies.get('user_email_sha256'),
              external_id: cookies.get('user_external_id_sha256'),
            },
            page: {
              url: currentURL,
            },
            properties: {
              contents: [
                {
                  content_category: tracking.category,
                  content_name: tracking.meta.plan_type,
                  brand: tracking.entity,
                },
              ],
            },
          },
        ],
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

class TikTok {
  static async sendData(tracking) {
    const keys = getKeys(tracking.category);
    let values = getValues(keys, tracking);

    if (tracking.category === 'default') {
      values = reformatDefault(keys, values, tracking.meta);
      tracking.category =
        tracking.meta && tracking.meta.defaultProduct
          ? tracking.meta.defaultProduct
          : 'default';
    }

    const requiredKeys = keys.filter(
      e => !getOptionalKeys(tracking.category).includes(e)
    );
    const requiredValues = getValues(requiredKeys, tracking, true);

    if (
      !requiredValues.every(value => value && value !== '') &&
      process.env.NODE_ENV !== 'test'
    ) {
      console.log('Missing keys for tiktok events api');
    } else {
      // Remove empty or null values in the eventPath
      const eventPath = values.filter(e => e && e !== '').join('/');
      console.log('TIKTOK EventPath: ', eventPath);
      const res = await sendToTiktokEventsAPI(tracking, `virtual/${eventPath}`);
      console.log('res: ', res);
      res;
    }
  }
}

export default TikTok;
