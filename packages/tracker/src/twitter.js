import {
  getKeys,
  getValues,
  getOptionalKeys,
  reformatDefault,
} from './pageViewHelper';

class Twitter {
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
      console.log('Missing keys for twitter analytics pageview');
    } else {
      if (tracking.category === 'default') {
        values = reformatDefault(keys, values, tracking.meta);
      }
      // Remove empty or null values in the eventPath
      const eventPath = values.filter(e => e && e !== '').join('/');
      console.log('TWITTER EventPath: ', eventPath);
      if (typeof window.twq === 'function') {
        window.twq('track', 'PageView', { page: `virtual/${eventPath}` });
      }
    }
  }
}

export default Twitter;
