import axios from 'axios';
import Cookies from 'universal-cookie';
import { createHash } from 'crypto';

const cookies = new Cookies();

export const sendToTiktokEventsAPI = async (tracking, fullEventPath) => {
  console.log('sendToTiktokEventsAPI data ', tracking);
  const ttclid = cookies.get('ttclid');
  const tiktokEventUrl = window.tiktok_event_url;
  const pixelId = window.tiktok_pixel;
  const hashedEmail = createHash(tracking.meta.email).update('bacon').digest('base64');

  if (pixelId && conversionUrl) {
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
              email: hashedEmail
            },
            page: {
              url: fullEventPath
            },
            properties: {
              contents: [
                {
                  content_category: tracking.category,
                  content_name: tracking.meta.plan_type
                }
              ]
            }
          }
        ]
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
}
