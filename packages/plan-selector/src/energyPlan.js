import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paragraph, Span } from '@rtm-ui/typography';
import { Box, Card, Block } from '@rtm-ui/layout';
import { Img } from '@rtm-ui/img';
import { A } from '@rtm-ui/a';
import { Icon } from '@rtm-ui/icon';
import { getColor } from '@rtm-ui/theme';

const MerchantBox = styled(Box)`
  height: 86px;
  display: flex;
  align-items: center;
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
  align-items: flex-end;
  flex-direction: column;
  min-width: 140px;
  @media (max-width: ${props => props.theme.grid.sm}em) {
    height: auto;
    align-items: center;
    width: 140px;
  }
  >div p {
    font-size: 28px;
    font-weight: 300;
  }

  >p {
    font-size: 47px;
    font-weight: 500;
    align-self: flex-start;
    line-height: 0.7;
    @media (max-width: ${props => props.theme.grid.sm}em) {
      font-size: 40px;
    }

    sup {
      font-size: 40px;
      font-weight: 100;

      @media (max-width: ${props => props.theme.grid.sm}em) {
        font-size: 30px;
      }
  }
`;

const PlanRate = ({ planRate }) => (
  <PlanRateBox variant="c">
    {planRate && (
      <React.Fragment>
        <Paragraph color="text" ml={2} mt={2} dangerousHTML={planRate.discount} />
        <Box mr={2} mb={2}>
          <Paragraph color="text" dangerousHTML={planRate.text} />
        </Box>
      </React.Fragment>
    )}
  </PlanRateBox>
);

const PlanBriefBox = styled(Box)`
  height: 92px;
  align-items: center;
  padding: 0 10px;
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

const ViewButton = ({ text, icon }) => (
  <StyledButton>
    {text}
    {icon && (
      <Paragraph
        align="left"
        weight="normal"
        style={{
          marginBottom: '5px',
          marginLeft: '-10px',
          display: 'inline',
        }}
      >
        <Icon fill="link" inline glyph="view-forward" size={40} />
      </Paragraph>
    )}
  </StyledButton>
);

const StyledPlanName = styled(Paragraph)`
  padding: 10px 10px 5px 10px;
  font-size: 19px;
  font-weight: 100;
  max-height: 105px;
`;

const StyledCard = styled(Card)`
  width: 250px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    width: 100%;
    flex-direction: row;
  }
`;
const StytledA = styled(A)`
  &:hover {
    color: ${props => getColor('link', props.theme)};
  }
`;

const MobileWrapper = styled(Box)`
  display: flex;
  flex-direction: column;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    width: 100%;
  }
`;

const EnergyPlan = ({
  merchant,
  planRate,
  displayName,
  planBrief,
  button,
  onClick,
  data,
}) => {
  return (
    <StytledA onClick={onClick} {...data} className={`plan-select`}>
      <StyledCard className={`plan`} pb={2}>
        <Block showAt="sm">
          <Merchant {...merchant} />
        </Block>
        <PlanRate planRate={planRate} />
        <MobileWrapper>
          <Block hideAt="sm">
            <Merchant {...merchant} />
          </Block>
          {displayName && <StyledPlanName dangerousHTML={displayName} />}
          <PlanBrief planBrief={planBrief} />
          <ViewButton {...button} />
        </MobileWrapper>
      </StyledCard>
    </StytledA>
  );
};

EnergyPlan.propTypes = {
  onClick: PropTypes.func,
  data: PropTypes.shape({}),
  merchant: PropTypes.shape({
    logo: PropTypes.string,
    fullName: PropTypes.string,
  }),
  planRate: PropTypes.shape({}),
  displayName: PropTypes.string,
  planBrief: PropTypes.string,
  button: PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.string,
  }),
};

export { EnergyPlan };
