import axios from 'axios';
import Cookies from 'universal-cookie';
import { createHash } from 'crypto';
import {
  getKeys,
  getValues,
  reformatDefault,
  getOptionalKeys,
} from './pageViewHelper';

const cookies = new Cookies();

const sendToTiktokEventsAPI = async (tracking, fullEventPath) => {
  console.log('sendToTiktokEventsAPI data ', tracking);
  const ttclid = cookies.get('ttclid');
  const tiktokEventUrl =
    window.tiktok_events_url || window.current_entity.entity.tiktok_events_url;
  const pixelId =
    window.tiktok_pixel_id || window.current_entity.entity.tiktok_pixel_id;
  const hashedEmail =
    tracking.user && tracking.user.email
      ? createHash(tracking.meta.email)
          .update('bacon')
          .digest('base64')
      : '';

  if (pixelId && tiktokEventUrl) {
    // https://business-api.tiktok.com/portal/docs?id=1771100865818625
    const eventTime = +new Date();
    const result = await axios
      .post(tiktokEventUrl, {
        event_source: 'web',
        event_source_id: pixelId,
        data: [
          {
            event: fullEventPath,
            event_time: eventTime,
            user: {
              ttclid: ttclid,
              email: hashedEmail,
            },
            page: {
              url: fullEventPath,
            },
            properties: {
              contents: [
                {
                  content_category: tracking.category,
                  content_name: tracking.meta.plan_type,
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

const genericPlanKeys = tracking => {
  return {
    action: tracking.action,
    tracking_id: tracking.meta && tracking.meta.tracking_id,
    merchant_name: tracking.meta && tracking.meta.merchant_name,
    product: tracking.category,
  };
};

const energyPlanKeys = tracking => {
  return {
    ...genericPlanKeys(tracking),
    state: tracking.meta && tracking.meta.state,
    plan_type: tracking.meta && tracking.meta.plan_type,
    is_solar: tracking.meta && tracking.meta.solar_nonsolar,
  };
};

const categoryKeys = {
  energy: energyPlanKeys,
  generic: genericPlanKeys,
};

const chooseCategoryKeys = category =>
  categoryKeys[category] || categoryKeys.generic;

class TikTok {
  static async sendData(tracking) {
    const categoryKeys = chooseCategoryKeys(tracking.category);

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
      await sendToTiktokEventsAPI(tracking, `virtual/${eventPath}`);
    }
  }
}

export default TikTok;
