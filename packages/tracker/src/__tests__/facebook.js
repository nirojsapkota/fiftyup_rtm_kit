// eslint-disable-next-line import/named
import { cleanup } from '../../../bootstrap/setup/testSetup';
import Facebook from '../facebook';

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

  it(`does nothing when fbq does not exist`, () => {
    global.fbq = undefined;

    Facebook.sendData({
      category: 'life_insurance',
      action: 'get_started',
    });
  });
});
