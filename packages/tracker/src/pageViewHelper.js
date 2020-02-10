/* eslint-disable no-console */
const categoryKeys = {
  signin: ['category', 'action', 'hybrid_nonhybrid'],
  energy: [
    'category',
    'campaign_type',
    'action',
    'internal_external',
    'state',
    'fuel_type',
    'solar_nonsolar',
  ],
  generic: ['category', 'campaign_type', 'action'],
};

const optionalKeys = {
  signin: [],
  energy: ['campaign_type'],
  generic: ['campaign_type']
};

const getTrackingValues = (keys, tracking, requiredOnly = false) => {
  if (requiredOnly) {
    keys = keys.filter((e) => !getOptionalKeys(tracking.category).includes(e) )
  }
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

export const getValues = (keys, tracking, requiredOnly = false) => {
  // FIXME: energy presignup hybrid doesn't have plan's info cause not match required values of energy category
  if (
    tracking.category === 'energy' &&
    (tracking.action === 'presignup' ||
      tracking.action === 'preoffer' ||
      tracking.action === 'signin')
  ) {
    return getTrackingValues(categoryKeys.generic, tracking, requiredOnly);
  }

  const getValuesFunc = getValuesMap[tracking.category] || getValuesMap.generic;
  return getValuesFunc(keys, tracking);
};

export const getKeys = category => {
  return categoryKeys[category] || categoryKeys.generic;
};

export const getOptionalKeys = category => {
  return optionalKeys[category] || optionalKeys.generic;
}
