import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Variant, { backgroundStyle, getColor } from '@rtm-ui/theme';
import LoginPanel from '@rtm-ui/login-panel';
import Bootstrap from '@rtm-ui/bootstrap';
import { EntityProvider, EntityConsumer } from '@rtm-ui/entity';
import { Small } from '@rtm-ui/typography';
import Img from '@rtm-ui/img';
import HowItWorks from '@rtm-ui/how-it-works';
import { BasicHeader } from '@rtm-ui/header';
import { track } from '@rtm-ui/tracker';

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

const StyledDisclaimer = styled(Small)`
  background: inherit;
  text-align: justify;
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
  heroImageUrl,
  ...props
}) => {
  return (
    <React.Fragment>
      <BodyWrapper>
        <HeroImageWrapper m="auto">
          <Img src={heroImageUrl} alt="Hero image" />
        </HeroImageWrapper>
        <ContentWrapper mt={-30} m="auto">
          <MobileHide>
            <Column width={1 / 2}>
              <LoginPanelWrapper px={[10, 10, 15, 20]}>
                <LoginPanel {...props} />
              </LoginPanelWrapper>
              <StyledDisclaimer
                p={50}
                dangerousHTML={disclaimerProps.disclaimerText || ''}
              />
            </Column>
            <Column width={1 / 2}>
              <HowItWorksWrapper px={10} mt={[20, 20, 40, 50]}>
                <HowItWorks orientation="vertical" {...howItWorksProps} />
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
    </React.Fragment>
  );
};

HybridLoginView.propTypes = {
  howItWorksProps: t.shape({}),
  disclaimerProps: t.shape({
    disclaimerText: t.string,
  }),
  heroImageUrl: t.string,
};

class WrappedHybridLoginView extends React.Component {
  componentDidMount() {
    track('presignup', this.props.trackingData);
  }

  render() {
    const { trackingData, entity, ...rest } = this.props;

    return (
      <Bootstrap trackingData={trackingData}>
        <EntityProvider entity={entity}>
          <EntityConsumer>
            {({ brand, footer_items: footer, header_items: header }) => {
              return (
                <React.Fragment>
                  <BasicHeader
                    logoUrl={header.logo}
                    entityBrand={brand}
                    py={2}
                  />
                  <HybridLoginView {...rest} />
                </React.Fragment>
              );
            }}
          </EntityConsumer>
        </EntityProvider>
      </Bootstrap>
    );
  }
}

WrappedHybridLoginView.propTypes = {
  trackingData: t.shape({}),
  entity: t.shape({
    brand: t.string,
    footer_items: t.shape({
      logo: t.string,
    }),
    header_items: t.shape({
      logo: t.string,
    }),
  }),
};

export default WrappedHybridLoginView;
