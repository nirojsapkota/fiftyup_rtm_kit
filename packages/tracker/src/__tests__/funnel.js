import axios from 'axios';

// eslint-disable-next-line import/named
import Funnel, { categoryKeys, defaultCategoryKeys } from '../funnel';

jest.mock('axios');

const expectRequestCall = (axios, sendingData) => {
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
};

const prepareData = (category, action) => {
  return {
    category: category,
    action: action,
    authenticityToken: 'token_key',
    meta: { tracking_id: 1 },
  };
};

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

        expectRequestCall(axios, sendingData);
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

    expect(sendingData.step_code).toEqual('click_get_started');
    expect(sendingData.product).toEqual('energy');
    expect(sendingData.plan_id).toEqual(data.meta.tracking_id);
  });

  describe(`life-insurance actions`, () => {
    it(`get_quote`, () => {
      axios.post.mockResolvedValue({ data: {} });

      const data = prepareData('life-insurance', 'get_quote');
      Funnel.sendData(data);
      const sendingData = categoryKeys['life-insurance']['get_quote'](data);

      expect(sendingData.step_code).toEqual('life_get_a_quote_page');
      expect(sendingData.product).toEqual('life');
      expect(sendingData.plan_id).toEqual(data.meta.tracking_id);
    });

    it(`call_me_back`, () => {
      axios.post.mockResolvedValue({ data: {} });

      const data = prepareData('life-insurance', 'call_me_back');
      Funnel.sendData(data);
      const sendingData = categoryKeys['life-insurance']['call_me_back'](data);

      expect(sendingData.step_code).toEqual('life_submit_call_me_back_page');
      expect(sendingData.product).toEqual('life');
      expect(sendingData.plan_id).toEqual(data.meta.tracking_id);
    });
  });

  describe(`health-insurance actions`, () => {
    it(`get_started`, () => {
      axios.post.mockResolvedValue({ data: {} });

      const data = prepareData('health-insurance', 'get_started');
      Funnel.sendData(data);
      const sendingData = categoryKeys['health-insurance']['get_started'](data);

      expect(sendingData.step_code).toEqual('health_click_get_started');
      expect(sendingData.product).toEqual('health');
      expect(sendingData.plan_id).toEqual(data.meta.tracking_id);
    });
  });

  describe(`car-insurance actions`, () => {
    it(`get_started`, () => {
      axios.post.mockResolvedValue({ data: {} });

      const data = prepareData('car-insurance', 'get_started');
      Funnel.sendData(data);
      const sendingData = categoryKeys['car-insurance']['get_started'](data);

      expect(sendingData.step_code).toEqual('car_click_get_started');
      expect(sendingData.product).toEqual('car');
      expect(sendingData.plan_id).toEqual(data.meta.tracking_id);
    });
  });

  describe(`home-and-contents-insurance actions`, () => {
    it(`get_started`, () => {
      axios.post.mockResolvedValue({ data: {} });

      const data = prepareData('home-and-contents-insurance', 'get_started');
      Funnel.sendData(data);
      const sendingData = categoryKeys['home-and-contents-insurance'][
        'get_started'
      ](data);

      expect(sendingData.step_code).toEqual(
        'home_and_contents_click_get_started'
      );
      expect(sendingData.plan_id).toEqual(data.meta.tracking_id);
    });
  });

  describe('actions (i.e travel) not defined in the categoryKeys should fallback to the defaultCategoryKeys', () => {
    it(`get_started`, () => {
      axios.post.mockResolvedValue({ data: {} });

      const data = prepareData('travel', 'get_started');
      Funnel.sendData(data);
      const keys = categoryKeys['travel'] || defaultCategoryKeys('travel');
      const sendingData = keys['get_started'](data);

      expect(sendingData.step_code).toEqual('travel_click_get_started');
      expect(sendingData.plan_id).toEqual(data.meta.tracking_id);
    });
  });
});
