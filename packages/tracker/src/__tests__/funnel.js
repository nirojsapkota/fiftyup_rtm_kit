import axios from 'axios';

// eslint-disable-next-line import/named
import { cleanup } from '../../../bootstrap/setup/testSetup';
import Funnel, { categoryKeys } from '../funnel';

jest.mock('axios');

afterEach(cleanup);

describe(`Funnel`, () => {
  it(`invalid category`, () => {
    // set Up
    axios.post.mockResolvedValue({ data: {} });

    Funnel.sendData({});
    expect(axios.post).not.toHaveBeenCalled();
  });

  it(`invalid action`, () => {
    // set Up
    axios.post.mockResolvedValue({ data: {} });

    Funnel.sendData({ category: 'energy' });
    expect(axios.post).not.toHaveBeenCalled();
  });

  it(`call tracking action`, () => {
    // set Up
    axios.post.mockResolvedValue({ data: {} });

    Object.keys(categoryKeys).forEach(category => {
      const actions = categoryKeys[category];

      Object.keys(actions).forEach(key => {
        const action = actions[key];
        action({ meta: { tracking_id: 1 } });

        const data = {
          category: category,
          action: key,
          authenticityToken: 'token_key',
          meta: { tracking_id: 1 },
        };
        Funnel.sendData(data);
        const sendingData = action(data);

        expect(axios.post).toHaveBeenCalledWith(
          '/ajax/funnel-report/track-step',
          sendingData,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-CSRF-Token': 'token_key',
            },
          }
        );
      });
    });
  });

  it(`call tracking action with energy category, get_started action and external`, () => {
    // set Up
    axios.post.mockResolvedValue({ data: {} });

    const data = {
      category: 'energy',
      action: 'get_started',
      authenticityToken: 'token_key',
      meta: { tracking_id: 1, internal_external: 'external' },
    };
    Funnel.sendData(data);
    const sendingData = categoryKeys['energy']['get_started'](data);

    expect(axios.post).toHaveBeenCalledWith(
      '/ajax/funnel-report/track-step',
      sendingData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': 'token_key',
        },
      }
    );
  });
});
