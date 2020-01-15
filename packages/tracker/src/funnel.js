const axios = require('axios');
const LogRocket = require('logrocket');

const sendDataToServer = (data, authenticityToken) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
  };

  axios.post('/ajax/funnel-report/track-step', data, config).catch(error => {
    LogRocket.captureException(error, {
      tags: {
        service: 'funnel',
      },
    });
  });
};

const defaultCategoryKeys = (category = '') => {
  return {
    get_started: tracking => {
      return {
        step_code: `${category.replace(/-/g, '_')}_click_get_started`,
        plan_id: tracking.meta.tracking_id,
      };
    }
  }
};

const categoryKeys = {
  'life-insurance': {
    get_quote: tracking => {
      return {
        step_code: 'life_get_a_quote_page',
        plan_id: tracking.meta.tracking_id,
      };
    },
    call_me_back: tracking => {
      return {
        step_code: 'life_submit_call_me_back_page',
        plan_id: tracking.meta.tracking_id,
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
        };
      }

      return {
        step_code: 'click_get_started',
        plan_id: tracking.meta.tracking_id,
      };
    },
    switch_confirm: tracking => {
      return {
        step_code: 'energy_click_switch_confirm',
        plan_id: tracking.meta.tracking_id,
      };
    },
  },
  'health-insurance': {
    get_started: tracking => {
      return {
        step_code: 'health_click_get_started',
        plan_id: tracking.meta.tracking_id,
      };
    },
  },
  'car-insurance': {
    get_started: tracking => {
      return {
        step_code: 'car_click_get_started',
        plan_id: tracking.meta.tracking_id,
      };
    },
  },
  'home-and-contents-insurance': {
    get_started: tracking => {
      return {
        step_code: 'home_and_contents_click_get_started',
        plan_id: tracking.meta.tracking_id,
      };
    },
  }
};

class Funnel {
  static sendData(tracking) {
    const categoryKey = categoryKeys[tracking.category] || defaultCategoryKeys(tracking.category);
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
