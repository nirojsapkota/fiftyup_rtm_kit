import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paragraph, Span } from '@rtm-ui/typography';
import { Box, Card } from '@rtm-ui/layout';
import { Img } from '@rtm-ui/img';
import { A } from '@rtm-ui/a';
import { Icon } from '@rtm-ui/icon';
import { Theme, getColor } from '@rtm-ui/theme';

const MerchantBox = styled(Box)`
  height: 86px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0 auto;
  padding: 10px;
`;

const Merchant = ({ logo, fullName }) => (
  <MerchantBox>{logo && <Img src={logo} alt={fullName} />}</MerchantBox>
);

const PlanRateBox = styled(Box)`
  height: 90px;
  display: flex;
  justify-content: center;
`;

const StyledPlanRate = styled(Paragraph)`
  p {
    position: relative;
    font-size: 50px;
    margin-left: -12px;
    font-weight: 500;
    sup {
      font-size: 40px;
      font-weight: 100;
    }
    span {
      position: absolute;
      bottom: -15px;
      right: -15px;
      font-size: 28px;
      font-weight: 300;
    }
  }

  span {
    &.no-rate {
      font-size: 28px;
      display: flex;
      margin-top: 25px;
    }
  }
`;

const PlanRate = ({ planRate }) => (
  <PlanRateBox variant="c">
    {planRate && <StyledPlanRate dangerousHTML={planRate} />}
  </PlanRateBox>
);

const PlanBriefBox = styled(Box)`
  height: 92px;
  align-items: center;
  overflow: hidden;
`;

const PlanBrief = ({ planBrief }) => (
  <PlanBriefBox>
    {planBrief && <Paragraph dangerousHTML={planBrief} />}
  </PlanBriefBox>
);

const StyledButton = styled(Paragraph)`
  align-self: flex-end;
  text-decoration: underline;
  margin-bottom: 5px;
  font-weight: bold;
  color: ${props => getColor('link', props.theme)};
`;

const Button = ({ text, icon }) => (
  <StyledButton>
    {text}
    {icon && (
      <Span
        align="left"
        weight="normal"
        style={{ marginBottom: '5px', marginLeft: '-10px', display: 'inline' }}
      >
        <Icon fill="link" inline glyph="view-forward" size={40} />
      </Span>
    )}
  </StyledButton>
);

const StyledCard = styled(Card)`
  display: inherit;
  width: 250px;
  display: flex;
  flex-direction: column;

  @media (max-width: 479px) {
    width: 100%;
  }
`;

const StyledPlanName = styled(Paragraph)`
  align-self: center;
  padding: 10px 10px 5px 10px;
  font-size: 19px;
  font-weight: 100;
  max-height: 105px;
`;

const EnergyPlan = ({ plan, merchant, button, data, ...rest }) => {
  console.log(plan);
  console.log(merchant);
  console.log(button);
  console.log(data);
  return (
    <A {...data}>
      <StyledCard {...rest}>
        <Merchant {...merchant} />
        <PlanRate planRate={plan.planRate} />
        {plan.displayName && (
          <StyledPlanName dangerousHTML={plan.displayName} />
        )}
        <PlanBrief planBrief={plan.planBrief} />
        <Button {...button} />
      </StyledCard>
    </A>
  );
};

EnergyPlan.propTypes = {};

export { EnergyPlan };
