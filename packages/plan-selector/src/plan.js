import React from 'react';
import PropTypes from 'prop-types';

import { EnergyPlan } from './energyPlan';
import { GenericPlan } from './genericPlan';

const plans = {
  energy: EnergyPlan,
  generic: GenericPlan,
};

const Plan = props => {
  const productName = (props.plan && props.plan.productName) || 'generic';
  const Component = plans[productName];

  return <Component {...props} />;
};

Plan.propTypes = {
  productName: PropTypes.string,
};

export { Plan };
