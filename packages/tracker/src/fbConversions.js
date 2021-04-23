import axios from 'axios';
import { dummyData } from './__fixtures__/dummyData';

export const sendToConversionAPI = (data) => {
  const url = dummyData.conversionApiUrl;

  if(data.meta && data.meta.fb_pixel_id) {
    try {
      axios.post(url,
        {
          event_name: data.action,
          email: data.meta.email,
          postcode: data.meta.postcode,
          state: data.meta.state,
          pixel_id: "495286158496858"
        }
      );
    }
    catch (error) {
      console.error('caught exception', error)
      return false;
    }
  }
};
