import {
  getKeys,
  getValues,
  reformatDefault,
  getOptionalKeys,
} from './pageViewHelper';

class Google {
  static sendData(tracking) {
    const keys = getKeys(tracking.category);
    let values = getValues(keys, tracking);

    const requiredKeys = keys.filter(
      e => !getOptionalKeys(tracking.category).includes(e)
    );
    const requiredValues = getValues(requiredKeys, tracking, true);
    if (
      !requiredValues.every(value => value && value !== '') &&
      process.env.NODE_ENV !== 'test'
    ) {
      console.log('Missing keys for google analytics pageview');
    } else {
      if (tracking.category === 'default') {
        values = reformatDefault(keys, values, tracking.meta);
      }
      // Remove empty or null values in the eventPath
      const eventPath = values.filter(e => e && e !== '').join('/');
      console.log('GOOGLE EventPath: ', eventPath);
      if (typeof window.ga === 'function') {
        window.ga('send', {
          hitType: 'pageview',
          page: `virtual/${eventPath}`,
        });
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'pageview', {
          page: `virtual/${eventPath}`,
        });
      }
    }
  }
}

export default Google;
