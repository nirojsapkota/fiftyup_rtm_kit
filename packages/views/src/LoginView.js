import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { getColor } from '@rtm-ui/theme';
import LoginPanel from '@rtm-ui/login-panel';
import Bootstrap from '@rtm-ui/bootstrap';
import HowItWork from '@rtm-ui/how-it-work';
import { Paragraph } from '@rtm-ui/typography';

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

const LoginPanelWrapper = styled(Box)`
  background: none;
`;

const DisclaimerWrapper = styled(Box)`
  background: inherit;

  * {
    background: inherit;
  }
`;

const LoginView = ({ howItWorkProps, disclaimerProps, ...props }) => (
  <Bootstrap>
    <BodyWrapper>
      <ContentWrapper mt={-30} m="auto">
        <LoginPanelWrapper px={[10, 10, 15, 20]}>
          <LoginPanel {...props} />
        </LoginPanelWrapper>
        <HowItWorkWrapper px={10} mt={[20, 20, 40, 50]}>
          <HowItWork {...howItWorkProps} />
        </HowItWorkWrapper>
        <DisclaimerWrapper>
          <Paragraph p={30}>{disclaimerProps.disclaimerText}</Paragraph>
        </DisclaimerWrapper>
      </ContentWrapper>
    </BodyWrapper>
  </Bootstrap>
);

LoginView.propTypes = {
  authenticityToken: t.string,
  // eslint-disable-next-line react/forbid-prop-types
  howItWorkProps: t.object,
  // eslint-disable-next-line react/forbid-prop-types
  disclaimerProps: t.shape({
    disclaimerText: t.string,
  }),
};

export default LoginView;
