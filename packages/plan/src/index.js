import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Block } from '@rtm-ui/layout';
import Img from '@rtm-ui/img';
import { Blurb } from '@rtm-ui/typography';
import Sidebar from './Sidebar';
import Cta from './Cta';
import Summary from './Summary';
import Action, { ClickToCall } from './Action';

// FIXME: Add CallbackFormDialog and add more unit test later
// import CallbackFormDialog from './CallbackFormDialog';
const CallbackFormDialog = () => <div>Callback form dialog</div>;

const SidebarWrapper = styled.div`
  min-width: 340px;
`;

const PlanSidebar = ({ children, ...props }) => (
  <Block showAt="lg" width={[1, 1, 1, 0.35]}>
    <Sidebar flex={0} px={[0, 0, 0, 3]} {...props}>
      <SidebarWrapper>{children}</SidebarWrapper>
    </Sidebar>
  </Block>
);

const MerchantBox = styled.div`
  max-width: 250px;
  margin: 10px auto;
`;
const Merchant = ({ logoUrl, full_name }) =>
  logoUrl && (
    <MerchantBox>
      <Img src={logoUrl} alt={full_name} />
    </MerchantBox>
  );

const PlanWrapper = ({ children }) => (
  <Box flex={1} px={[0, 0, 0, 3]} width={[1, 1, 1, 0.65]}>
    {children}
  </Box>
);

const StyledWrapper = styled(Box)`
  position: relative;
  justify-content: center;
  display: flex;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    right: 0;
    background-color: ${props => props.theme.colors.grayscale.lightest};
    height: 320px;

    @media (min-width: ${props => props.theme.grid.md}) {
      height: 400px;
    }
  }
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  max-width: 1400px;
  width: 100%;
`;

const Plan = ({
  authenticityToken,
  entity,
  plan,
  productTips,
  switchFacts,
  actions,
}) => {
  const callAction = actions.find(({ track }) => track === 'click_to_call');
  const callbackAction = actions.find(
    ({ track }) => track === 'request_call_back'
  );
  const clickAction = actions.find(({ track }) => track === 'get_started');
  const planCta = (
    <Cta actions={actions} tips={productTips} switchFacts={switchFacts}>
      {clickAction && (
        <Blurb right variant="b" serif header={clickAction.header} />
      )}
      <Merchant {...plan.merchant} />
      {callAction && <ClickToCall {...callAction} />}
      {!callbackAction && clickAction && <Action {...clickAction} />}
      {callbackAction && (
        <Box p={[2, 3]} width={1}>
          <CallbackFormDialog
            {...plan.callbackFormProps}
            {...callbackAction}
            block
            entity={entity}
            campaignId={plan.campaign_id}
            authenticityToken={authenticityToken}
          />
        </Box>
      )}
    </Cta>
  );

  return (
    <StyledWrapper>
      <ContentWrapper pt={[2, 2, 3]} px={[0, 0, 0, 48]}>
        <PlanWrapper>
          <Summary
            {...plan}
            campaignId={plan.campaign_id}
            entity={entity}
            actions={actions}
            authenticityToken={authenticityToken}
          >
            <Block hideAt="lg">{planCta}</Block>
          </Summary>
        </PlanWrapper>
        <PlanSidebar>
          <Block showAt="lg">{planCta}</Block>
        </PlanSidebar>
      </ContentWrapper>
    </StyledWrapper>
  );
};

export default Plan;

PlanWrapper.propTypes = {
  children: PropTypes.node,
};

Plan.propTypes = {
  authenticityToken: PropTypes.string,
  entity: PropTypes.shape({
    name: PropTypes.string,
  }),
  plan: PropTypes.shape({
    main_header_text: PropTypes.string,
    main_image_file_url: PropTypes.string,
    sub_header_text: PropTypes.string,
    disclaimer_html: PropTypes.string,
    plan_features: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string,
        body: PropTypes.string,
      })
    ),
  }),
  productTips: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      body: PropTypes.string,
    })
  ),
  switchFacts: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string,
      body: PropTypes.string,
    })
  ),
  user: PropTypes.shape({}),
  actions: PropTypes.arrayOf(PropTypes.shape({ action: PropTypes.string })),
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({ selfie: PropTypes.string })
  ),
};

PlanSidebar.propTypes = {
  children: PropTypes.node,
};

Merchant.propTypes = {
  logoUrl: PropTypes.string,
  name: PropTypes.string,
};
