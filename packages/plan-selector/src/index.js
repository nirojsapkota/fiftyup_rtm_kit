import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
// import { Box } from '@rtm-ui/layout'

import { Plan } from './plan';

const PlanSelector = ({ children }) => <div>{children}</div>;

PlanSelector.propTypes = {
  children: PropTypes.node,
};

export { Plan, PlanSelector };
