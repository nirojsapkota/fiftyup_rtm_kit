import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Variant, { backgroundStyle, getColor } from '@rtm-ui/theme';
import LoginPanel from '@rtm-ui/login-panel';
import Bootstrap from '@rtm-ui/bootstrap';
import { EntityProvider, EntityConsumer } from '@rtm-ui/entity';
import { Paragraph } from '@rtm-ui/typography';
import Img from '@rtm-ui/img';
import HowItWorks from '@rtm-ui/how-it-works';

import Footer from './Footer';

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const ContentWrapper = styled(Box)`
  max-width: 1080px;
  background: none;
`;

const MobileHide = styled(Box)`
  background: inherit;
  display: flex;
  flex-flow: row;
  @media (max-width: ${props => props.theme.grid.md}em) {
    display: none;
  }
`;

const Column = styled(Box)`
  background: inherit;
  display: flex;
  flex-flow: column;
`;

const MobileShow = styled(Box)`
  background: inherit;
  display: flex;
  flex-flow: column;
  @media (min-width: ${props => props.theme.grid.md}em) {
    display: none;
  }
`;

const HowItWorksWrapper = styled(Box)`
  background: inherit;
`;

const LoginPanelWrapper = styled(Box)`
  background: inherit;
`;

const StyledDisclaimer = styled(Paragraph)`
  background: inherit;
`;

const FooterWrapper = styled(Box)`
  ${backgroundStyle};
`;

const HeroImageWrapper = styled(Box)`
  max-width: 1080px;
`;

const HybridLoginView = ({
  howItWorksProps,
  disclaimerProps,
  footerProps,
  headerProps,
  entityBrand,
  ...props
}) => {
  return (
    <React.Fragment>
      <Img src={headerProps.logoUrl} py={3} alt="Header logo" />
      <BodyWrapper>
        <HeroImageWrapper m="auto">
          <Img src={headerProps.heroImageUrl} alt="Hero image" />
        </HeroImageWrapper>
        <ContentWrapper mt={-30} m="auto">
          <MobileHide>
            <Column width={1 / 2}>
              <LoginPanelWrapper px={[10, 10, 15, 20]}>
                <LoginPanel {...props} />
              </LoginPanelWrapper>
              <StyledDisclaimer p={50}>
                {disclaimerProps.disclaimerText || ''}
              </StyledDisclaimer>
            </Column>
            <Column width={1 / 2}>
              <HowItWorksWrapper px={10} mt={[20, 20, 40, 50]}>
                <HowItWorks {...howItWorksProps} entity={entityBrand} />
              </HowItWorksWrapper>
            </Column>
          </MobileHide>
          <MobileShow>
            <LoginPanelWrapper px={[10, 10, 15, 20]}>
              <LoginPanel {...props} />
            </LoginPanelWrapper>
            <HowItWorksWrapper px={10} mt={[20, 20, 40, 50]}>
              <HowItWorks {...howItWorksProps} />
            </HowItWorksWrapper>
            <StyledDisclaimer p={30}>
              {disclaimerProps.disclaimerText || ''}
            </StyledDisclaimer>
          </MobileShow>
        </ContentWrapper>
      </BodyWrapper>
      <Variant variant="c">
        <FooterWrapper py={3}>
          <Footer {...footerProps} boxWidth="1080px" />
        </FooterWrapper>
      </Variant>
    </React.Fragment>
  );
};

HybridLoginView.propTypes = {
  authenticityToken: t.string,
  howItWorksProps: t.shape({}),
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
  entityBrand: t.string,
};

HybridLoginView.defaultProps = {
  disclaimerProps: {
    disclaimerText:
      '* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.  ',
  },
  howItWorksProps: {
    header:
      'One Big Switch takes the stress out of getting value on your household bills by doing the neogtiating for you!',
    stepOffers: [
      {
        imgUrl: 'https://placehold.it/100x100',
        title: 'You join the movement for free',
      },
      {
        imgUrl: 'https://placehold.it/100x100',
        title: 'We negotiate Group Discounts',
      },
      {
        imgUrl: 'https://placehold.it/100x100',
        title: 'You decide what’s right for you',
      },
    ],
  },
};

const WrappedHybridLoginView = ({ trackingData, entity, ...rest }) => (
  <Bootstrap trackingData={trackingData}>
    <EntityProvider entity={entity}>
      <EntityConsumer>
        {({ brand }) => <HybridLoginView {...rest} entityBrand={brand} />}
      </EntityConsumer>
    </EntityProvider>
  </Bootstrap>
);

WrappedHybridLoginView.propTypes = {
  trackingData: t.shape({}),
  entity: t.shape({}),
};

export default WrappedHybridLoginView;
