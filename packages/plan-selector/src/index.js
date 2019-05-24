import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from '@rtm-ui/typography';
import { Box, Pane } from '@rtm-ui/layout';
import { A } from '@rtm-ui/a';

import { Plan } from './plan';

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  padding-left: 10px;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    flex-direction: column;
    padding-left: 0;
  }
`;

const PlanWrapper = styled(Box)`
  margin: 0 10px;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    margin: 10px 0;
    padding: 0 5px;
  }
`;

const StyledCallCenter = styled(Pane)``;

const CallCenter = ({ moreInfo, callMerchant, phoneNumber, officeHour }) => (
  <A href={`tel:${phoneNumber}`}>
    <StyledCallCenter
      rounded
      elevation="1"
      mt={50}
      width={[1, 1, 0.7, 0.7]}
      mx={'auto'}
    >
      <Box p={20}>
        {moreInfo && (
          <Header tag="h3" weight="normal" dangerousHTML={moreInfo} />
        )}
        {callMerchant && (
          <Header
            tag="h3"
            color="dark"
            weight="normal"
            dangerousHTML={callMerchant}
          />
        )}
        {phoneNumber && (
          <Header tag="h3" color="tertiary" dangerousHTML={phoneNumber} />
        )}
        {officeHour && (
          <Header
            tag="h5"
            color="dark"
            weight="normal"
            dangerousHTML={officeHour}
          />
        )}
      </Box>
    </StyledCallCenter>
  </A>
);

const PlanSelector = ({ header, plans, renderPlan, callCentre }) => (
  <Box>
    <Header tag="h3" pb={30}>
      {header}
    </Header>
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
    {callCentre && <CallCenter {...callCentre} />}
  </Box>
);

PlanSelector.propTypes = {
  header: PropTypes.string,
  plans: PropTypes.arrayOf(PropTypes.shape({})),
  renderPlan: PropTypes.func,
};

export { Plan, PlanSelector };
