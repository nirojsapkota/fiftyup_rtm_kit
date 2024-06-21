import Bing from '../bing';

describe(`Bing`, () => {
  it(`sends an event to the UET object`, () => {
    global.uetq = { push: jest.fn() };
    const spyUET = jest.spyOn(global.uetq, 'push');

    Bing.sendData({
      category: 'signin',
      action: 'get_started',
      hybrid_nonhybrid: 'nonhybrid',
    });

    expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/virtual/signin/get_started/nonhybrid',
    });
  });

  it(`with meta values sends an event to the UET object`, () => {
    global.uetq = { push: jest.fn() };
    const spyUET = jest.spyOn(global.uetq, 'push');

    Bing.sendData({
      category: 'signin',
      action: 'get_started',
      meta: { hybrid_nonhybrid: 'nonhybrid' },
    });

    expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/virtual/signin/get_started/nonhybrid',
    });
  });

  it(`falls back to generic keys when a category can't be determined`, () => {
    global.uetq = { push: jest.fn() };
    const spyUET = jest.spyOn(global.uetq, 'push');

    Bing.sendData({
      category: 'some_product',
      action: 'get_started',
    });

    expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/virtual/some_product/get_started',
    });
  });

  it(`when there is no UET object on the window`, () => {
    global.uetq = undefined;
    const spyError = jest.spyOn(console, 'error');

    Bing.sendData({
      category: 'signin',
      action: 'get_started',
      meta: { hybrid_nonhybrid: 'nonhybrid' },
    });

    // FIXME: This is to implicit
    expect(spyError).not.toHaveBeenCalled();
  });

  it(`with energy category and presignup action`, () => {
    global.uetq = { push: jest.fn() };
    const spyUET = jest.spyOn(global.uetq, 'push');

    Bing.sendData({
      category: 'energy',
      action: 'presignup',
    });

    expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/virtual/energy/presignup',
    });
  });

  it(`with energy category and preoffer action`, () => {
    global.uetq = { push: jest.fn() };
    const spyUET = jest.spyOn(global.uetq, 'push');

    Bing.sendData({
      category: 'energy',
      action: 'preoffer',
    });

    expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/virtual/energy/preoffer',
    });
  });

  it(`with energy category and signin action`, () => {
    global.uetq = { push: jest.fn() };
    const spyUET = jest.spyOn(global.uetq, 'push');

    Bing.sendData({
      category: 'energy',
      action: 'signin',
    });

    expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
      page_path: '/virtual/energy/signin',
    });
  });

  describe(`energy category`, () => {
    it(`get_started action, Electricity and solar`, () => {
      global.uetq = { push: jest.fn() };
      const spyUET = jest.spyOn(global.uetq, 'push');

      Bing.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          plan_type: 'E',
          is_solar: true,
        },
      });

      expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
        page_path: '/virtual/energy/get_started/internal/NSW/Electricity/solar',
      });
    });

    it(`get_started action, DualFuel and non solar`, () => {
      global.uetq = { push: jest.fn() };
      const spyUET = jest.spyOn(global.uetq, 'push');

      Bing.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          plan_type: 'EG',
          is_solar: false,
        },
      });

      expect(spyUET).toHaveBeenCalledWith('event', 'page_view', {
        page_path: '/virtual/energy/get_started/internal/NSW/DualFuel/nonsolar',
      });
    });

    it(`get_started action, missing is_solar`, () => {
      Bing.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          plan_type: 'EG',
        },
      });
    });

    it(`get_started action, missing plan_type`, () => {
      Bing.sendData({
        category: 'energy',
        action: 'get_started',
        meta: {
          internal_external: 'internal',
          state: 'NSW',
          is_solar: false,
        },
      });
    });
  });
});
