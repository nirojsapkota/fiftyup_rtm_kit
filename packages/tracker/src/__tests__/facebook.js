// eslint-disable-next-line import/named
import { cleanup } from '../../../bootstrap/setup/testSetup';
import Facebook from '../facebook';
import { sendToConversionAPI } from '../fbConversions';
import axios from 'axios';

jest.mock('axios');

afterEach(cleanup);

describe(`Facebook`, () => {
  describe(`when there are special mappings`, () => {
    describe(`special names are used as the event name`, () => {
      it(`get_started sends getStarted`, () => {
        global.fbq = jest.fn();
        const spyFbq = jest.spyOn(global, 'fbq');

        Facebook.sendData({
          category: 'life_insurance',
          action: 'get_started',
        });

        expect(spyFbq).toHaveBeenCalledWith('trackCustom', 'getStarted', {
          action: 'get_started',
          product: 'life_insurance',
        });
      });
      it(`signin sends SignUp`, () => {
        global.fbq = jest.fn();
        const spyFbq = jest.spyOn(global, 'fbq');

        Facebook.sendData({
          category: 'life_insurance',
          action: 'signin',
        });

        expect(spyFbq).toHaveBeenCalledWith('trackCustom', 'SignUp', {
          action: 'signin',
          product: 'life_insurance',
        });
      });
    });
  });

  describe(`when there are no special mappings`, () => {
    it(`the name of the action is used as the event name`, () => {
      global.fbq = jest.fn();
      const spyFbq = jest.spyOn(global, 'fbq');

      Facebook.sendData({
        category: 'life_insurance',
        action: 'some_action',
      });

      expect(spyFbq).toHaveBeenCalledWith('trackCustom', 'some_action', {
        action: 'some_action',
        product: 'life_insurance',
      });
    });
  });

  it(`can handle data with meta`, () => {
    global.fbq = jest.fn();
    const spyFbq = jest.spyOn(global, 'fbq');

    Facebook.sendData({
      category: 'energy',
      action: 'get_started',
      meta: {
        tracking_id: 8,
        state: 'nsw',
        plan_type: 'E',
        solar_nonsolar: 'solar',
      },
    });

    expect(spyFbq).toHaveBeenCalledWith('trackCustom', 'getStarted', {
      action: 'get_started',
      product: 'energy',
      is_solar: 'solar',
      plan_type: 'E',
      state: 'nsw',
      tracking_id: 8,
    });
  });

  it('pushes successfully data to an API', async () => {
    const response = {
      status: 200,
      data : {
        _events_received: 1,
        _fbtrace_id: "AbcdE",
        messages: []
      }
    }
    axios.post.mockResolvedValue(response);

    await expect(sendToConversionAPI({
      category: 'energy',
      action: 'get_started',
      meta: {
        tracking_id: 8,
        state: 'nsw',
        plan_type: 'E',
        solar_nonsolar: 'solar',
        email: 'user@email.com',
        postcode: 2000,
        state: 'AU',
        fb_pixel_id: '333333333',
        fb_conversion_api_url: 'https://amazonaws.com/'
      },
    })).resolves.toEqual(response);
  });

  it(`does nothing when fbq does not exist`, () => {
    global.fbq = undefined;

    Facebook.sendData({
      category: 'life_insurance',
      action: 'get_started',
    });
  });
});
