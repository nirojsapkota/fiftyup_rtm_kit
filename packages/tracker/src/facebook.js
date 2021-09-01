import { sendToConversionAPI } from './fbConversions';
import {
  getKeys,
  getValues,
  reformatDefault,
  getOptionalKeys,
} from './pageViewHelper';
/* eslint-disable no-console */
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

// const setCookie = name => {
//   const expires = new Date();
//   expires.setMinutes(expires.getMinutes() + 5);
//   cookies.set(name, true, {
//     expires,
//   });
// };

const trackCustomEvent = (eventName, data) => {
  // const eventCookieName = `${eventName}-facebook-pixel-${data.tracking_id}`;
  if (window.fbq) {
    // if (!cookies.get(eventCookieName)) {
    window.fbq('trackCustom', eventName, data);
    // setCookie(eventCookieName);
    // }
  }
};

const actionMap = {
  get_started: 'getStarted',
  signin: 'SignUp', // keeping this as SingUp for tracking purposes
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

// TODO: Extract this to a util function
const filterObject = obj =>
  Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined) _acc[key] = obj[key];
    return _acc;
  }, {});

const chooseCategoryKeys = category =>
  categoryKeys[category] || categoryKeys.generic;

class Facebook {
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

    trackCustomEvent(
      actionMap[tracking.action] || tracking.action,
      filterObject(categoryKeys(tracking))
    );

    const requiredKeys = keys.filter(
      e => !getOptionalKeys(tracking.category).includes(e)
    );
    const requiredValues = getValues(requiredKeys, tracking, true);

    if (
      !requiredValues.every(value => value && value !== '') &&
      process.env.NODE_ENV !== 'test'
    ) {
      console.log('Missing keys for facebook conversion event');
    } else {
      // Remove empty or null values in the eventPath
      const eventPath = values.filter(e => e && e !== '').join('/');
      console.log('FACEBOOK EventPath: ', eventPath);
      await sendToConversionAPI(tracking, `virtual/${eventPath}`);
    }
  }
}

export default Facebook;
