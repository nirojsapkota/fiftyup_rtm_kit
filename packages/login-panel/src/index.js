import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
import { Box } from '@rtm-ui/layout';
import Variant, { backgroundStyle, getColor } from '@rtm-ui/theme';

import Header from './Header';
import HeroImage from './HeroImage';
import HowItWork from './HowItWork';
import Footer from './Footer';
import LoginForm from './LoginForm';
import Disclaimer from './Disclaimer';

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const CenterWrapper = styled(Box)`
  background: inherit;
  max-width: 1080px;
`;

const ContentWrapper = styled(Box)`
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
  margin-top: 50px;
  @media (max-width: ${props => props.theme.grid.md}em) {
    grid-column: auto;
    grid-row: auto;
    margin-top: 20px;
  }
`;

const LoginFormWrapper = styled(Box)`
  background: none;
`;

const DisclaimerWrapper = styled(Box)`
  background: inherit;
`;

const FooterWrapper = styled(Box)`
  ${backgroundStyle};
`;

const LoginPanel = ({
  headerProps,
  footerProps,
  howItWorkProps,
  disclaimerProps,
  ...props
}) => (
  <React.Fragment>
    <Header {...headerProps} />
    <BodyWrapper>
      <CenterWrapper m="auto">
        <HeroImage />
        <ContentWrapper mt={-30}>
          <LoginFormWrapper px={10}>
            <LoginForm {...props} />
          </LoginFormWrapper>
          <HowItWorkWrapper px={10}>
            <HowItWork {...howItWorkProps} />
          </HowItWorkWrapper>
          <DisclaimerWrapper>
            <Disclaimer {...disclaimerProps} />
          </DisclaimerWrapper>
        </ContentWrapper>
      </CenterWrapper>
    </BodyWrapper>
    <Variant variant="c">
      <FooterWrapper>
        <Footer {...footerProps} boxWidth="1080px" />
      </FooterWrapper>
    </Variant>
  </React.Fragment>
);

LoginPanel.propTypes = {
  authenticityToken: t.string,
};

export default LoginPanel;
