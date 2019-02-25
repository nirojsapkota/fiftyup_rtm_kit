import LogRocket from 'logrocket';

/* eslint-disable no-console */
const categoryKeys = {
  signin: ['category', 'action', 'hybrid_nonhybrid'],
  energy: [
    'category',
    'action',
    'internal_external',
    'state',
    'fuel_type',
    'solar_nonsolar',
  ],
  generic: ['category', 'action'],
};

const getTrackingValues = (keys, tracking) => {
  return keys.map(
    key => tracking[key] || (tracking.meta && tracking.meta[key]) || undefined
  );
};

const energyTrackingValues = (keys, tracking) => {
  const fuelTypes = {
    E: 'Electricity',
    EG: 'DualFuel',
    G: 'Gas',
  };

  const solarValue =
    tracking.meta.is_solar === true
      ? 'solar'
      : tracking.meta.is_solar === false
        ? 'nonsolar'
        : undefined;
  const energyTracking = {
    ...tracking,
    fuel_type: fuelTypes[tracking.meta.plan_type] || undefined,
    solar_nonsolar: solarValue,
  };

  return getTrackingValues(keys, energyTracking);
};

const getValuesMap = {
  energy: energyTrackingValues,
  generic: getTrackingValues,
};

const getValues = (keys, tracking) => {
  // FIXME: energy presignup hybrid doesn't have plan's info cause not match required values of energy category
  if (tracking.category === 'energy' && (tracking.action === 'presignup' || tracking.action === 'preoffer')) {
    return getTrackingValues(categoryKeys.generic, tracking);
  }

  const getValuesFunc = getValuesMap[tracking.category] || getValuesMap.generic;
  return getValuesFunc(keys, tracking);
};

class Google {
  static sendData(tracking) {
    const keys = categoryKeys[tracking.category] || categoryKeys.generic;
    const values = getValues(keys, tracking);
    if (!values.every(value => value !== undefined)) {
      LogRocket.captureException('Missing keys for google analytics pageview', {
        tags: {
          service: 'google',
        },
      });
    } else {
      const eventPath = values.join('/');
      if (typeof window.ga === 'function') {
        window.ga('send', {
          hitType: 'pageview',
          page: `virtual/${eventPath}`,
        });
      }
    }
  }
}

export default Google;
