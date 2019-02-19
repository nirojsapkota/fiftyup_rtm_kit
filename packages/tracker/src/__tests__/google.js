import LogRocket from 'logrocket';
import Google from '../google';

// ['send', { hitType: 'pageview', page: 'virtual/signin/get_started/hybrid' }];

describe(`Google`, () => {
  it(`sends an event to the GA object`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'signin',
      action: 'get_started',
      hybrid_nonhybrid: 'nonhybrid',
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/signin/get_started/nonhybrid',
    });
  });

  it(`with meta values sends an event to the GA object`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'signin',
      action: 'get_started',
      meta: { hybrid_nonhybrid: 'nonhybrid' },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/signin/get_started/nonhybrid',
    });
  });

  it(`falls back to generic keys when a category can't be determined`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'some_product',
      action: 'get_started',
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/some_product/get_started',
    });
  });

  it(`when there is no ga object on the window`, () => {
    global.ga = undefined;
    const spyError = jest.spyOn(console, 'error');

    Google.sendData({
      category: 'signin',
      action: 'get_started',
      meta: { hybrid_nonhybrid: 'nonhybrid' },
    });

    // FIXME: This is to implicit
    expect(spyError).not.toHaveBeenCalled();
  });

  it(`when not enough data is present it logs the failure`, () => {
    const logSpy = jest.spyOn(LogRocket, 'captureException');

    Google.sendData({
      category: 'signin',
      action: 'get_started',
    });

    expect(logSpy).toHaveBeenCalled();
  });

  it(`with energy category and presignup action`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'presignup',
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/presignup',
    });
  });

  describe(`energy category`, () => {
    it(`get_started action, Electricity and solar`, () => {
      global.ga = jest.fn();
      const spyGa = jest.spyOn(global, 'ga');

      Google.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          plan_type: 'E',
          is_solar: true,
        },
      });

      expect(spyGa).toHaveBeenCalledWith('send', {
        hitType: 'pageview',
        page: 'virtual/energy/get_started/internal/NSW/Electricity/solar',
      });
    });

    it(`get_started action, DualFuel and non solar`, () => {
      global.ga = jest.fn();
      const spyGa = jest.spyOn(global, 'ga');

      Google.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          plan_type: 'EG',
          is_solar: false,
        },
      });

      expect(spyGa).toHaveBeenCalledWith('send', {
        hitType: 'pageview',
        page: 'virtual/energy/get_started/internal/NSW/DualFuel/nonsolar',
      });
    });

    it(`get_started action, missing is_solar`, () => {
      const logSpy = jest.spyOn(LogRocket, 'captureException');

      Google.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          plan_type: 'EG',
        },
      });

      expect(logSpy).toHaveBeenCalled();
    });

    it(`get_started action, missing plan_type`, () => {
      const logSpy = jest.spyOn(LogRocket, 'captureException');

      Google.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          is_solar: false,
        },
      });

      expect(logSpy).toHaveBeenCalled();
    });
  });
});
