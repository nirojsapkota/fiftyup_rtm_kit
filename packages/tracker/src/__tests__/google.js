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
});
