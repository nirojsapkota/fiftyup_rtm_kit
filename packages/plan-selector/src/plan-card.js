import React from 'react';
import PropTypes from 'prop-types';

import { EnergyPlan } from './energyPlan';
import { GenericPlan } from './genericPlan';

const planComponents = {
  energy: EnergyPlan,
  generic: GenericPlan,
};

const PlanCard = props => {
  const Component = planComponents[props.productName] || planComponents.generic;

  return <Component {...props} />;
};

PlanCard.propTypes = {
  productName: PropTypes.string,
};

export { PlanCard };
