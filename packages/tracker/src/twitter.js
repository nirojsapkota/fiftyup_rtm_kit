import { getKeys, getValues, getOptionalKeys } from './pageViewHelper';

class Twitter {
  static sendData(tracking) {
    const keys = getKeys(tracking.category);
    const values = getValues(keys, tracking);

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
      // Remove empty or null values in the eventPath
      const eventPath = values.filter(e => e && e !== '').join('/');
      console.log('eventPath: ', eventPath);
      if (typeof window.twq === 'function') {
        window.twq('track', 'PageView', {
          path: `virtual/${eventPath}`,
        });
      }
    }
  }
}

export default Twitter;
