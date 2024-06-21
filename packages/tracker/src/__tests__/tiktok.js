// eslint-disable-next-line import/named
import TikTok, { sendToTiktokEventsAPI } from '../tiktok';
import axios from 'axios';
import Cookies from 'universal-cookie';

jest.mock('axios');

describe(`Tiktok`, () => {
  it('pushes successfully data to an API', async () => {
    global.tiktok_pixel_id = '1111111111';
    global.tiktok_events_url = 'https://amazonaws.com/';
    const response = {
      code: 0,
      message: 'OK',
      request_id: 'someid',
      data: {},
    };
    axios.post.mockResolvedValue(response);

    Cookies.prototype.get = jest.fn(() => 'sometiktoktracking');
    const fullPath = '/some/event/path';
    const tracking = {
      category: 'health',
      meta: {
        plan_type: 'health offer',
      },
    };
    const result = await sendToTiktokEventsAPI(tracking, fullPath);
    expect(result).toEqual({});
  });

  it('falls back to entity data if tiktok events setup is not available', () => {
    window.tiktok_events_url = null;
    window.tiktok_pixel_id = null;
    global.current_entity = {
      entity: {
        tiktok_pixel_id: '1111111111',
        tiktok_events_url: 'https://amazonaws.com/',
      },
    };

    const response = {
      code: 0,
      message: 'OK',
      request_id: 'someid',
      data: {},
    };
    axios.post.mockResolvedValue(response);

    Cookies.prototype.get = jest.fn(() => 'sometiktoktracking');
    const fullPath = '/some/event/path';
    const tracking = {
      category: 'health',
      meta: {
        plan_type: 'health offer',
      },
    };

    TikTok.sendData(tracking, fullPath);
  });

  it('logs api errors', async () => {
    const spyError = jest.spyOn(console, 'error');
    axios.post.mockImplementationOnce(() =>
      Promise.reject('There was an error')
    );

    global.tiktok_pixel_id = '1111111111';
    global.tiktok_events_url = 'https://amazonaws.com/';
    const fullPath = '/some/event/path';
    const tracking = {
      category: 'health',
      meta: {
        plan_type: 'health offer',
      },
    };

    await TikTok.sendData(tracking, fullPath);

    expect(spyError).toHaveBeenCalled();
  });

  it(`get_started action, missing is_solar`, () => {
    process.env.NODE_ENV = 'development';
    const logSpy = jest.spyOn(console, 'log');

    TikTok.sendData({
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

  it('logs error when required keys are mising', () => {
    process.env.NODE_ENV = 'development';
    const logSpy = jest.spyOn(console, 'log');

    TikTok.sendData({
      action: 'get_started',
      meta: {
        internal_external: 'internal',
        state: 'NSW',
        plan_type: 'EG',
      },
    });
    expect(logSpy).toHaveBeenCalled();
  });
});
