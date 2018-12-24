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

const HeaderWrapper = styled(Box)``;
const FooterWrapper = styled(Box)``;

const LoginPanel = props => (
  <React.Fragment>
    <HeaderWrapper>
      <HeaderLogo />
      <OfferHeroImage />
    </HeaderWrapper>
    <LoginForm {...props} />
    <FooterWrapper>
      <HowItWork />
      <FooterLogo />
    </FooterWrapper>
  </React.Fragment>
);

LoginPanel.propTypes = {
  authenticityToken: t.string,
};

export default LoginPanel;
