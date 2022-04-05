import React from 'react';
import PropTypes from 'prop-types';
import { Box, Block } from '@rtm-ui/layout';
import Sidebar from './Sidebar';
import Cta from './Cta';
import Summary from './Summary';
import PlanReferenceContext from './PlanReferenceContext';
import * as S from './styles';

const PlanSidebar = ({ children, calculatorProps, ...props }) => (
  <Block showAt="lg" width={[1, 1, 1, 0.40]}>
    <Sidebar flex={0} px={[0, 0, 0, 3]} {...props}>
      {calculatorProps && (
        <S.QuoteSidebarWrapper>{children}</S.QuoteSidebarWrapper>
      )}
      {!calculatorProps && (
        <S.SidebarWrapper>{children}</S.SidebarWrapper>
      )}
    </Sidebar>
  </Block>
);

export const Plan = ({
  authenticityToken,
  plan,
  actions,
  reference,
  phonebackProps,
  isEnabledMarkdown,
  calculatorProps,
  ...rest
}) => {
  const [isPhonebackSubmitted, setPhonebackSubmitted] = React.useState(plan.has_phoneback);
  const clickAction = actions.find(({ track }) => track === 'get_started');
  const callbackAction = actions.find(
    ({ track }) => track === 'request_call_back'
  );
  const getQuoteAction = actions.find(({ track }) => track === 'get_quote');

  const primaryAction = callbackAction || getQuoteAction || clickAction;
  const primaryActionWithPhonebackProps = {
    ...primaryAction,
    ...phonebackProps,
    authenticityToken,
    campaignId: plan.campaign_id,
    isPhonebackSubmitted,
    setPhonebackSubmitted,
  };

  return (
    <PlanReferenceContext.Provider value={reference}>
      <S.StyledWrapper>
        <S.ContentWrapper pt={[2, 2, 3]} px={[0, 0, 0, 48]}>
          <Box flex={1} px={[0, 0, 0, 3]} width={[1, 1, 1, 0.60]}>
            <Summary
              {...plan}
              campaignId={plan.campaign_id}
              actions={actions}
              primaryActionProps={primaryActionWithPhonebackProps}
              authenticityToken={authenticityToken}
              isEnabledMarkdown={isEnabledMarkdown}
            >
              <Block hideAt="lg">
                <Cta
                  actions={actions}
                  primaryActionProps={primaryActionWithPhonebackProps}
                  merchant={plan.merchant}
                  calculatorProps={calculatorProps}
                  userApiAuthToken={rest.userApiAuthToken}
                />
              </Block>
            </Summary>
          </Box>
          <PlanSidebar calculatorProps={calculatorProps}>
            <Block showAt="lg">
              <Cta
                actions={actions}
                primaryActionProps={primaryActionWithPhonebackProps}
                merchant={plan.merchant}
                calculatorProps={calculatorProps}
                userApiAuthToken={rest.userApiAuthToken}
              />
            </Block>
          </PlanSidebar>
        </S.ContentWrapper>
      </S.StyledWrapper>
    </PlanReferenceContext.Provider>
  );
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
    multi_image_file_urls: PropTypes.arrayOf(PropTypes.string),
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
  isEnabledMarkdown: PropTypes.bool,
  user: PropTypes.shape({}),
  actions: PropTypes.arrayOf(PropTypes.shape({ action: PropTypes.string })),
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({ selfie: PropTypes.string })
  ),
};

PlanSidebar.propTypes = {
  children: PropTypes.node,
};
