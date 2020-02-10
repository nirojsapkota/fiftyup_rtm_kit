import LogRocket from 'logrocket';
import { getKeys, getValues, getOptionalKeys } from './pageViewHelper';

class Bing {
  static sendData(tracking) {
    const keys = getKeys(tracking.category);
    const values = getValues(keys, tracking);

    const requiredKeys = keys.filter((e) => !getOptionalKeys(tracking.category).includes(e))
    const requiredValues = getValues(requiredKeys, tracking, true)

    if (!requiredValues.every(value => value && value !== '')) {
      LogRocket.captureException('Missing keys for Bing Analytics UET page_view', {
        tags: {
          service: 'uet',
        },
      });
    } else {
      const eventPath = values.filter((e) => e && e !== '' ).join('/');
      if (window.uetq) {
        window.uetq.push('event', 'page_view', { 'page_path': `/virtual/${eventPath}` });
      }
    }
  }
}

export default Bing;
