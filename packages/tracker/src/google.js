import { getKeys, getValues } from './pageViewHelper';

class Google {
  static sendData(tracking) {
    const keys = getKeys(tracking.category);
    const values = getValues(keys, tracking);
    if (
      !values.every(value => value !== undefined) &&
      process.env.NODE_ENV !== 'test'
    ) {
      console.log('Missing keys for google analytics pageview');
    } else {
      const eventPath = values.join('/');
      if (typeof window.ga === 'function') {
        window.ga('send', {
          hitType: 'pageview',
          page: `virtual/${eventPath}`,
        });
      }
    }
  }
}

export default Google;
