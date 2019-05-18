import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';

import { Plan } from './plan';

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: row;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    flex-direction: column;
  }
`;

const PlanWrapper = styled(Box)`
  margin: 0 10px;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    margin: 10px 0;
    padding: 0 5px;
  }
`;

const PlanSelector = ({ header, plans, renderPlan }) => (
  <Box>
    <Box>{header}</Box>
    <ContentWrapper>
      {plans &&
        plans.map((plan, index) => {
          const style = index === 0 ? { marginLeft: 0 } : {};
          return typeof renderPlan === 'function' ? (
            renderPlan({ plan, index })
          ) : (
            <PlanWrapper style={style} key={`plan_${index}`}>
              <Plan {...plan} />
            </PlanWrapper>
          );
        })}
    </ContentWrapper>
  </Box>
);

PlanSelector.propTypes = {
  header: PropTypes.string,
  plans: PropTypes.arrayOf(PropTypes.shape({})),
  renderPlan: PropTypes.func,
};

export { Plan, PlanSelector };
