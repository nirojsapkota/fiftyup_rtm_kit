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
    'existing_customer',
  ],
  car: ['category', 'campaign_type', 'action', 'renewal_month'],
  home: ['category', 'campaign_type', 'action', 'renewal_month'],
  broadband: ['category', 'campaign_type', 'action', 'existing_customer'],
  mobile: ['category', 'campaign_type', 'action', 'existing_customer'],
  genericEnergy: ['category', 'campaign_type', 'action', 'existing_customer'],
  generic: [
    'category',
    'campaign_type',
    'action',
    'existing_customer',
    'offer_type',
  ],
  health: ['category', 'campaign_type', 'action', 'family_type'],
  default: ['category', 'campaign_type', 'action', 'offer_type'],
  'dashboard-preferences': ['category', 'action', 'products'],
};

const optionalKeys = {
  signin: [],
  energy: [
    'campaign_type',
    'solar_nonsolar',
    'internal_external',
    'existing_customer',
    'fuel_type',
  ],
  generic: ['campaign_type', 'existing_customer', 'offer_type'],
  genericEnergy: ['campaign_type', 'existing_customer'],
  home: ['campaign_type', 'renewal_month'],
  car: ['campaign_type', 'renewal_month'],
  broadband: ['campaign_type', 'existing_customer'],
  mobile: ['campaign_type', 'existing_customer'],
  health: ['campaign_type', 'family_type'],
  'dashboard-preferences': ['products'],
};

const getTrackingValues = (keys, tracking, requiredOnly = false) => {
  if (requiredOnly) {
    keys = keys.filter(e => !getOptionalKeys(tracking.category).includes(e));
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
    typeof tracking.meta.is_solar === 'boolean'
      ? tracking.meta.is_solar
        ? 'solar'
        : 'nonsolar'
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
      tracking.action === 'signin' ||
      tracking.page === 'landing_page')
  ) {
    return getTrackingValues(
      categoryKeys.genericEnergy,
      tracking,
      requiredOnly
    );
  }

  const getValuesFunc = getValuesMap[tracking.category] || getValuesMap.generic;
  return getValuesFunc(keys, tracking);
};

export const getKeys = category => {
  return categoryKeys[category] || categoryKeys.generic;
};

export const reformatDefault = (keys, values, meta) => {
  const categoryIndex = keys.indexOf('category');
  if (categoryIndex === -1) {
    return values;
  } else if (!meta || !meta.defaultProduct) {
    return values;
  } else {
    values[categoryIndex] = meta.defaultProduct;
    return values;
  }
};

export const getOptionalKeys = category => {
  return optionalKeys[category] || optionalKeys.generic;
};
