import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
import { Box } from '@rtm-ui/layout';

import HeaderLogo from './HeaderLogo';
import OfferHeroImage from './OfferHeroImage';
import HowItWork from './HowItWork';
import FooterLogo from './FooterLogo';
import LoginForm from './LoginForm';
import Disclaimer from './Disclaimer';

const BodyWrapper = styled(Box)`
  background: #f1f1f1;
`;
const CenterWrapper = styled(Box)`
  background: inherit;
  max-width: 1080px;
`;

const ContentWrapper = styled(Box)`
  background: inherit;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const Column = styled(Box)`
  background: none;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MobileShow = styled(Box)`
  background: inherit;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileHide = styled(Box)`
  background: inherit;
  @media (max-width: 767px) {
    display: none;
  }
`;

const HowItWorkWrapper = styled(Box)`
  background: inherit;
`;

const LoginFormWrapper = styled(Box)`
  background: none;
`;

const LoginPanel = props => (
  <React.Fragment>
    <HeaderLogo />
    <BodyWrapper>
      <CenterWrapper m="auto">
        <OfferHeroImage />
        <ContentWrapper mt={-30}>
          <Column>
            <LoginFormWrapper px={10}>
              <LoginForm {...props} />
            </LoginFormWrapper>
            <MobileHide>
              <Disclaimer />
            </MobileHide>
          </Column>
          <Column>
            <HowItWorkWrapper mt={50}>
              <HowItWork />
            </HowItWorkWrapper>
          </Column>
          <MobileShow>
            <Disclaimer />
          </MobileShow>
        </ContentWrapper>
      </CenterWrapper>
    </BodyWrapper>
    <FooterLogo />
  </React.Fragment>
);

LoginPanel.propTypes = {
  authenticityToken: t.string,
};

export default LoginPanel;
