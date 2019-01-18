import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Variant, { backgroundStyle, getColor } from '@rtm-ui/theme';
import LoginPanel from '@rtm-ui/login-panel';
import Bootstrap from '@rtm-ui/bootstrap';
import { Paragraph } from '@rtm-ui/typography';
import Img from '@rtm-ui/img';
import HowItWork from '@rtm-ui/how-it-work';

import Footer from './Footer';

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const ContentWrapper = styled(Box)`
  max-width: 1080px;
  background: none;
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

const FooterWrapper = styled(Box)`
  ${backgroundStyle};
`;

const HeroImageWrapper = styled(Box)`
  max-width: 1080px;
`;

const View = ({
  howItWorkProps,
  disclaimerProps,
  footerProps,
  headerProps,
  ...props
}) => (
  <Bootstrap>
    <Img src={headerProps.logoUrl} py={3} alt="Header logo" />
    <BodyWrapper>
      <HeroImageWrapper m="auto">
        <Img src={headerProps.heroImageUrl} alt="Hero image" />
      </HeroImageWrapper>
      <ContentWrapper mt={-30} m="auto">
        <LoginPanelWrapper px={[10, 10, 15, 20]}>
          <LoginPanel {...props} />
        </LoginPanelWrapper>
        <HowItWorkWrapper px={10} mt={[20, 20, 40, 50]}>
          <HowItWork {...howItWorkProps} />
        </HowItWorkWrapper>
        <DisclaimerWrapper>
          <Paragraph p={30}>{disclaimerProps.disclaimerText || ''}</Paragraph>
        </DisclaimerWrapper>
      </ContentWrapper>
    </BodyWrapper>
    <Variant variant="c">
      <FooterWrapper>
        <Footer {...footerProps} boxWidth="1080px" />
      </FooterWrapper>
    </Variant>
  </Bootstrap>
);

View.propTypes = {
  authenticityToken: t.string,
  howItWorkProps: t.shape({}),
  disclaimerProps: t.shape({
    disclaimerText: t.string,
  }),
  footerProps: t.shape({
    logoUrl: t.string,
    copyRightText: t.string,
  }),
  headerProps: t.shape({
    logoUrl: t.string,
    heroImageUrl: t.string,
  }),
};

View.defaultProps = {
  disclaimerProps: {
    disclaimerText:
      '* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.  ',
  },
  howItWorkProps: {
    header:
      'One Big Switch takes the stress out of getting value on your household bills by doing the neogtiating for you!',
    stepOffers: [
      {
        imgUrl:
          'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/tick-81a6885ed08fa480d0a3edd9eb3daed0386aeff48e4fd6696bf9d3fd546474e2.png',
        title: 'You join the movement for free',
      },
      {
        imgUrl:
          'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/quote-e31e7443a59255068905462c61ea2fc8c0baf111b4cbd09e7dc0697fa73b605b.png',
        title: 'We negotiate Group Discounts',
      },
      {
        imgUrl:
          'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/dollar-c46a72a93eb371e6000fe5a034cdcd04bddb7c2746bc71ca8220d4e733baecba.png',
        title: 'You decide what’s right for you',
      },
    ],
  },
};

export default View;
