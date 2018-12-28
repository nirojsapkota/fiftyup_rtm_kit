import React from 'react';
import t from 'prop-types';
import styled, { css } from 'styled-components';
// import { Header, Paragraph } from '@rtm-ui/typography'
import { Box } from '@rtm-ui/layout';

import HeaderLogo from './HeaderLogo';
import OfferHeroImage from './OfferHeroImage';
import HowItWork from './HowItWork';
import FooterLogo from './FooterLogo';
import LoginForm from './LoginForm';

const base = css`
  background: #f1f1f1;
`;

const BodyWrapper = styled(Box)`
  ${base};
  max-width: 1216px;
`;

const StyledHowItWork = styled(HowItWork)``;

const MainWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LoginFormWrapper = styled(Box)``;

const LoginPanel = props => (
  <React.Fragment>
    <HeaderLogo />
    <BodyWrapper width={[1, 1, 1]}>
      <OfferHeroImage />
      <MainWrapper>
        <LoginFormWrapper p={10}>
          <LoginForm {...props} />
        </LoginFormWrapper>
        <StyledHowItWork />
      </MainWrapper>
    </BodyWrapper>
    <FooterLogo />
  </React.Fragment>
);

LoginPanel.propTypes = {
  authenticityToken: t.string,
};

export default LoginPanel;
