import {
  getKeys,
  getValues,
  reformatDefault,
  getOptionalKeys,
} from './pageViewHelper';

class Bing {
  static sendData(tracking) {
    const keys = getKeys(tracking.category);
    let values = getValues(keys, tracking);

    const requiredKeys = keys.filter(
      e => !getOptionalKeys(tracking.category).includes(e)
    );
    const requiredValues = getValues(requiredKeys, tracking, true);

    if (!requiredValues.every(value => value && value !== '')) {
      // Log errors here
    } else {
      if (tracking.category === 'default') {
        values = reformatDefault(keys, values, tracking.meta);
      }
      const eventPath = values.filter(e => e && e !== '').join('/');
      console.log('BING EventPath: ', eventPath);
      if (window.uetq) {
        window.uetq.push('event', 'page_view', {
          page_path: `/virtual/${eventPath}`,
        });
      }
    }
  }
}

export default Bing;
