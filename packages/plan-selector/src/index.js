import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';

import { Plan } from './plan';

const ContentWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  div:first-child {
    margin-left: 0;
  }
`;

const PlanWrapper = styled(Box)`
  margin: 0 10px;
`;

const PlanSelector = ({ header, plans }) => (
  <Box>
    <Box>{header}</Box>
    <ContentWrapper>
      {plans &&
        plans.map(plan => (
          <PlanWrapper>
            <Plan {...plan} />
          </PlanWrapper>
        ))}
    </ContentWrapper>
  </Box>
);

PlanSelector.propTypes = {
  children: PropTypes.node,
};

export { Plan, PlanSelector };
