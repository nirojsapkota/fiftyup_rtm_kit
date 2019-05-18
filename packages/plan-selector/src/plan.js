import React from 'react';
import PropTypes from 'prop-types';

import { EnergyPlan } from './energyPlan';
import { GenericPlan } from './genericPlan';

const planComponents = {
  energy: EnergyPlan,
  generic: GenericPlan,
};

const Plan = ({ plan, ...rest }) => {
  const Component = planComponents[plan.productName || 'generic'];

  return <Component {...plan} {...rest} />;
};

Plan.propTypes = {
  plan: PropTypes.shape({
    productName: PropTypes.string,
  }),
};

Plan.defaultProps = {
  plan: {},
};

export { Plan };
