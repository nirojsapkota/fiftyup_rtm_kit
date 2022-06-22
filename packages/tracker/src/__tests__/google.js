import Google from '../google';

describe(`Google`, () => {
  it(`sends an event to the universal GA object`, () => {
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

  it(`sends an event to the GA4 object`, () => {
    global.gtag = jest.fn();
    const spyGa = jest.spyOn(global, 'gtag');

    Google.sendData({
      category: 'signin',
      action: 'get_started',
      hybrid_nonhybrid: 'nonhybrid',
    });

    expect(spyGa).toHaveBeenCalledWith('event', 'pageview', {
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

    Google.sendData({
      category: 'some_product',
      action: 'get_started',
      meta: {
        campaign_type: 'business',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/some_product/business/get_started',
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
    process.env.NODE_ENV = 'development';
    const logSpy = jest.spyOn(console, 'log');

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

  it(`with energy category from landing page and no props provided`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'click_to_call',
      page: 'landing_page',
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/click_to_call',
    });
  });

  it(`with energy category, presignup action and campaign_type`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'presignup',
      meta: {
        campaign_type: 'business',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/business/presignup',
    });
  });

  it(`with energy category and preoffer action`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'preoffer',
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/preoffer',
    });
  });

  it(`with energy category, preoffer action and campaign_type`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'preoffer',
      meta: {
        campaign_type: 'residential',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/residential/preoffer',
    });
  });

  it(`with energy category and signin action`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'signin',
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/signin',
    });
  });

  it(`with energy category, signin action and campaign_type`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'signin',
      meta: {
        campaign_type: 'business',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/business/signin',
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
      process.env.NODE_ENV = 'development';
      const logSpy = jest.spyOn(console, 'log');

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
      process.env.NODE_ENV = 'development';
      const logSpy = jest.spyOn(console, 'log');

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

    it(`works with campaign_type meta`, () => {
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
          campaign_type: 'business',
        },
      });

      expect(spyGa).toHaveBeenCalledWith('send', {
        hitType: 'pageview',
        page:
          'virtual/energy/business/get_started/internal/NSW/Electricity/solar',
      });
    });
  });

  it(`with energy category, tile-click action and category energy, state VIC, plan_type EG  without optional fields campaign_type, solar_nonsolar, internal_external`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'tile-click',
      meta: {
        state: 'VIC',
        plan_type: 'EG',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/tile-click/VIC/DualFuel',
    });
  });

  it(`with energy category, tile-click action and category energy, state VIC, plan_type EG,  solar true,  without optional fields campaign_type, internal_external`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'tile-click',
      meta: {
        state: 'NSW',
        plan_type: 'EG',
        is_solar: true,
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/tile-click/NSW/DualFuel/solar',
    });
  });

  it(`with home category, tile-click action and category home month-selected june`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'home',
      action: 'renewal-month-tile-click',
      meta: {
        renewal_month: 'june',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/home/renewal-month-tile-click/june',
    });
  });

  it(`with car category, tile-click action and category car month-selected dont-have`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'car',
      action: 'renewal-month-tile-click',
      meta: {
        renewal_month: 'dont-have',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/car/renewal-month-tile-click/dont-have',
    });
  });

  it(`with health category, tile-click action and category health familyType-selected couple`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'health',
      action: 'family-type-tile-click',
      meta: {
        family_type: 'couple',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/health/family-type-tile-click/couple',
    });
  });

  it(`with home-loans(default) category, tile-click action and category default offer-type-selected investment`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'default',
      action: 'home-loans-offer-type-tile-click',
      meta: {
        offer_type: 'investment',
        defaultProduct: 'home-loans',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/home-loans/home-loans-offer-type-tile-click/investment',
    });
  });

  it(`with home-loans(default) category, tile-click action and category default offer-type-selected investment no default product provided`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'default',
      action: 'home-loans-offer-type-tile-click',
      meta: {
        offer_type: 'investment',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/default/home-loans-offer-type-tile-click/investment',
    });
  });

  it(`with dashboard-preferences category, should track all products`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'dashboard-preferences',
      action: 'cta',
      meta: {
        products: 'car+electricity',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/dashboard-preferences/cta/car+electricity',
    });
  });

  it(`with energy category and existing customer question`, () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    Google.sendData({
      category: 'energy',
      action: 'tile-click',
      meta: {
        state: 'NSW',
        existing_customer: 'isnewcustomer',
        plan_type: 'EG',
      },
    });

    expect(spyGa).toHaveBeenCalledWith('send', {
      hitType: 'pageview',
      page: 'virtual/energy/tile-click/NSW/DualFuel/isnewcustomer',
    });
  });
});
