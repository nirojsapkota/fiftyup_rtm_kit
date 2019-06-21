import LogRocket from 'logrocket';
import { getKeys, getValues } from './pageViewHelper';

class Bing {
  static sendData(tracking) {
    const keys = getKeys(tracking.category);
    const values = getValues(keys, tracking);
    if (!values.every(value => value !== undefined)) {
      LogRocket.captureException('Missing keys for Bing Analytics UET page_view', {
        tags: {
          service: 'uet',
        },
      });
    } else {
      const eventPath = values.join('/');
      if (window.uetq) {
        window.uetq.push('event', 'page_view', { 'page_path': `/virtual/${eventPath}` });
      }
    }
  }
}

export default Bing;
