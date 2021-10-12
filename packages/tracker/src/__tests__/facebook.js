// eslint-disable-next-line import/named
import Facebook from '../facebook';
import { sendToConversionAPI } from '../fbConversions';
import axios from 'axios';

jest.mock('axios');

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

  describe(`when default multi offer`, () => {
    it(`with home-loans(default) category, tile-click action and category default offer-type-selected investment`, () => {
      global.fbq = jest.fn();
      const spyFbq = jest.spyOn(global, 'fbq');

      Facebook.sendData({
        category: 'default',
        action: 'home-loans-offer-type-tile-click',
        meta: {
          offer_type: 'investment',
          defaultProduct: 'home-loans',
        },
      });

      expect(spyFbq).toHaveBeenCalledWith(
        'trackCustom',
        'home-loans-offer-type-tile-click',
        {
          action: 'home-loans-offer-type-tile-click',
          product: 'home-loans',
        }
      );
    });

    it(`with home-loans(default) category, tile-click action and category default offer-type-selected investment no default product provided`, () => {
      global.fbq = jest.fn();
      const spyFbq = jest.spyOn(global, 'fbq');

      Facebook.sendData({
        category: 'default',
        action: 'home-loans-offer-type-tile-click',
        meta: {
          offer_type: 'investment',
        },
      });

      expect(spyFbq).toHaveBeenCalledWith(
        'trackCustom',
        'home-loans-offer-type-tile-click',
        {
          action: 'home-loans-offer-type-tile-click',
          product: 'default',
        }
      );
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
    global.facebook_pixel_id = '1111111111';
    global.facebook_conversion_url = 'https://amazonaws.com/';
    const response = {
      data: {
        _events_received: 1,
        _fbtrace_id: 'AbcdE',
        messages: [],
      },
    };
    axios.post.mockResolvedValue(response);

    await expect(
      sendToConversionAPI({
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
        },
      })
    ).resolves.toEqual(response.data);
  });

  it('does not push data to conversion API when pixel id is missing', async () => {
    global.facebook_pixel_id = undefined;
    global.facebook_conversion_url = 'https://amazonaws.com/';
    await expect(
      sendToConversionAPI({
        category: 'energy',
        action: 'get_started',
        pixelId: '',
        conversionUrl: 'https://amazonaws.com/',
        meta: {
          tracking_id: 8,
          state: 'nsw',
          plan_type: 'E',
          solar_nonsolar: 'solar',
          email: 'user@email.com',
          postcode: 2000,
          state: 'AU',
        },
      })
    ).resolves.toEqual(false);
  });

  it('does not push data to conversion API when api url is missing', async () => {
    global.facebook_pixel_id = '1111111111';
    global.facebook_conversion_url = undefined;
    await expect(
      sendToConversionAPI({
        category: 'energy',
        action: 'get_started',
        pixelId: '1111111111',
        conversionUrl: '',
        meta: {
          tracking_id: 8,
          state: 'nsw',
          plan_type: 'E',
          solar_nonsolar: 'solar',
          email: 'user@email.com',
          postcode: 2000,
          state: 'AU',
        },
      })
    ).resolves.toEqual(false);
  });

  it(`does nothing when fbq does not exist`, () => {
    global.fbq = undefined;

    Facebook.sendData({
      category: 'life_insurance',
      action: 'get_started',
    });
  });
});
