import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
import { Box } from '@rtm-ui/layout';
import { getColor } from '@rtm-ui/theme';

import HowItWork from './HowItWork';
import LoginForm from './LoginForm';
import Disclaimer from './Disclaimer';

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const ContentWrapper = styled(Box)`
  max-width: 1080px;
  background: inherit;
  display: grid;
  grid-template-columns: 50% auto;
  grid-template-rows: auto auto;
  @media (max-width: ${props => props.theme.grid.md}em) {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`;

const HowItWorkWrapper = styled(Box)`
  background: inherit;
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  @media (max-width: ${props => props.theme.grid.md}em) {
    grid-column: auto;
    grid-row: auto;
  }
`;

const LoginFormWrapper = styled(Box)`
  background: none;
`;

const DisclaimerWrapper = styled(Box)`
  background: inherit;
`;

const LoginPanel = ({ howItWorkProps, disclaimerProps, ...props }) => (
  <React.Fragment>
    <BodyWrapper>
      <ContentWrapper mt={-30} m="auto">
        <LoginFormWrapper px={[10, 10, 15, 20]}>
          <LoginForm {...props} />
        </LoginFormWrapper>
        <HowItWorkWrapper px={10} mt={[20, 20, 40, 50]}>
          <HowItWork {...howItWorkProps} />
        </HowItWorkWrapper>
        <DisclaimerWrapper>
          <Disclaimer {...disclaimerProps} />
        </DisclaimerWrapper>
      </ContentWrapper>
    </BodyWrapper>
  </React.Fragment>
);

LoginPanel.propTypes = {
  authenticityToken: t.string,
  // eslint-disable-next-line react/forbid-prop-types
  howItWorkProps: t.object,
  // eslint-disable-next-line react/forbid-prop-types
  disclaimerProps: t.object,
};

export default LoginPanel;
