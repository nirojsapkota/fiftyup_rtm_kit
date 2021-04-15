import axios from 'axios';
import { dummyData } from './__fixtures__/dummyData';

export const sendToConversionAPI = async (eventName, data) => {
  // BELOW PARAMS NEED TO BE CONFIGURED FROM ACTIVE ADMIN
  const API_VERSION = dummyData.apiVersion;
  const PIXEL_ID = dummyData.fbPixelId;    // Test Staging Account II's Pixel
  const TOKEN = dummyData.conversionAPiAccessToken;

  const timestamp = Math.floor(Date.now() / 1000);
  const eventSrcUrl = window.location.href;
  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}`

  try {
    return await axios.post(url,
      {
        "data": [
          {
            event_name: eventName,      //required
            event_time: timestamp,      //required
            action_source: "website",   //required
            user_data: {
              em: "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068", //hashed email ID
              client_user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15"
              //required
            },
            event_source_url: eventSrcUrl,   //required
            custom_data: data
          }
        ],
        // test_event_code: "TEST2791"
      }
    );
  }
  catch (error) {
    console.error(error)
    return false;
  }
};
