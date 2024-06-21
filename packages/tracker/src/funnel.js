const axios = require('axios');

const sendDataToServer = (data, authenticityToken) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
  };

  axios.post('/ajax/funnel-report/track-step', data, config).catch(_error => {
    // Log errors here
  });
};

const defaultCategoryKeys = (category = '') => {
  return {
    get_started: tracking => {
      return {
        step_code: `${category.replace(/-/g, '_')}_click_get_started`,
        plan_id: tracking.meta.tracking_id,
        product: `${category.replace(/-/g, '_')}`,
        get_started: true,
      };
    },
  };
};

// Returns a key value pairs that we will send to the server
// step_code: the funnel step code
// plan_id: can be the id of the plan, campaign, etc. (this is a bit confusing, doule check in rails funnel_report_controller)
// product: product mapped to the user profile (e.g life = life_insurance_profile in the server)
// get_started: whether we want to record the last get started event or not
const categoryKeys = {
  'life-insurance': {
    get_quote: tracking => {
      return {
        step_code: 'life_get_a_quote_page',
        plan_id: tracking.meta.tracking_id,
        product: 'life',
        get_started: true,
      };
    },
    call_me_back: tracking => {
      return {
        step_code: 'life_submit_call_me_back_page',
        plan_id: tracking.meta.tracking_id,
        product: 'life',
        get_started: false,
      };
    },
  },
  energy: {
    get_started: tracking => {
      if (tracking.meta.internal_external === 'external') {
        // FIXME: for now we are just adding 'click_get_started' as our
        // funnel reporting doesn't know any different.
        return {
          step_code: 'click_get_started',
          plan_id: tracking.meta.tracking_id,
          product: 'energy',
          get_started: true,
        };
      }

      return {
        step_code: 'click_get_started',
        plan_id: tracking.meta.tracking_id,
        product: 'energy',
        get_started: true,
      };
    },
    switch_confirm: tracking => {
      return {
        step_code: 'energy_click_switch_confirm',
        plan_id: tracking.meta.tracking_id,
        product: 'energy',
        get_started: false,
      };
    },
  },
  'health-insurance': {
    get_started: tracking => {
      return {
        step_code: 'health_click_get_started',
        plan_id: tracking.meta.tracking_id,
        product: 'health',
        get_started: true,
      };
    },
  },
  'car-insurance': {
    get_started: tracking => {
      return {
        step_code: 'car_click_get_started',
        plan_id: tracking.meta.tracking_id,
        product: 'car',
        get_started: true,
      };
    },
  },
  'home-and-contents-insurance': {
    get_started: tracking => {
      return {
        step_code: 'home_and_contents_click_get_started',
        plan_id: tracking.meta.tracking_id,
        product: 'home',
        get_started: true,
      };
    },
  },
};

class Funnel {
  static sendData(tracking) {
    const categoryKey =
      categoryKeys[tracking.category] || defaultCategoryKeys(tracking.category);
    if (categoryKey !== undefined) {
      const actionKey = categoryKey[tracking.action];
      if (actionKey !== undefined) {
        const { authenticityToken } = tracking;
        const data = actionKey(tracking);
        sendDataToServer(data, authenticityToken);
      }
    }
  }
}

export default Funnel;
export { categoryKeys, defaultCategoryKeys };
