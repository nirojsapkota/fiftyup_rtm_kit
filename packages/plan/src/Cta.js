import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import Merchant from './Merchant';
import ClickToCall from './Action/ClickToCall';
import GetQuote from './Action/GetQuote';
import * as S from './styles';
import { PrimaryAction } from './PrimaryAction';

const Cta = ({
  actions,
  primaryActionProps,
  merchant,
  userApiAuthToken,
  calculatorProps,
}) => {
  const callAction = actions.find(({ track }) => track === 'click_to_call');
  const additionalGetStarted = actions.find(
    ({ track }) => track === 'click_to_get_started_cta'
  );
  const getQuoteAction = actions.find(({ track }) => track === 'quote_tool');

  return (
    <S.Cta my={2} pt={'6px'}>
      <Merchant {...merchant} />
      <div scroll-target="ctaSection">
        {callAction && <ClickToCall {...callAction} />}
        {getQuoteAction && (
          <GetQuote
            userApiAuthToken={userApiAuthToken}
            calculatorProps={calculatorProps}
            campaignId={primaryActionProps.campaignId}
            {...getQuoteAction}
          />
        )}
        {!getQuoteAction && additionalGetStarted && (
          <Box p={[2, 3]} py={[0, 0]} width={1}>
            <PrimaryAction {...additionalGetStarted} />
          </Box>
        )}
        {!getQuoteAction && (
          <Box p={[2, 3]} width={1}>
            <PrimaryAction {...primaryActionProps} />
          </Box>
        )}
      </div>
    </S.Cta>
  );
};

export default Cta;

Cta.propTypes = {
  children: PropTypes.node,
};
