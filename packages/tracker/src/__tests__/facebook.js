import { cleanup } from '@rtm-test/bootstrap/setup/testSetup';
import Facebook from '../facebook';

afterEach(cleanup);

describe(`Facebook`, () => {
  it(`sends an event to the fbq object`, () => {
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

  // it(`logs to the console when an event has been sent`, () => {
  //   const spyGa = jest.spyOn(console, 'log');
  //   global.fbq = jest.fn();

  //   Facebook.sendData({
  //     category: 'life_insurance',
  //     action: 'get_started',
  //   });

  //   expect(spyGa).toHaveBeenCalled();
  // });

  it(`does nothing when fbq does not exist`, () => {
    global.fbq = undefined;

    Facebook.sendData({
      category: 'life_insurance',
      action: 'get_started',
    });
  });
});
