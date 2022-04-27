/* istanbul ignore file */

import { Accordion } from '@rtm-ui/accordion';
import { Carousel } from '@rtm-ui/carousel';
import { Img, ResponsiveImage } from '@rtm-ui/img';
import {
  Box,
  Block,
  scrollToElement,
  useElementVisible,
  Card,
} from '@rtm-ui/layout';
import { getColor, Theme as Variant } from '@rtm-ui/theme';
import { Modal } from '@rtm-ui/dialog';
import { Icon } from '@rtm-ui/icon';
import { track } from '@rtm-ui/tracker';
import { Header, Markdown, Paragraph } from '@rtm-ui/typography';
import { VideoDialog } from '@rtm-ui/video-dialog';
import { WorkFlow } from '@rtm-ui/how-it-works';
import { Button } from '@rtm-ui/button';
import { LoginCalculatorPanel } from '@rtm-ui/login-calculator-panel';
import { LoginPanel } from '@rtm-ui/login-panel';

import t from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicHeader from './header';

import exitIntent from './exitIntentUtil';

const HybridLoginReferenceContext = React.createContext();

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const ContainerWrapper = styled(Box)`
  background: none;
  padding-top: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(240, 240, 240, 1) 0%,
    rgba(250, 250, 250, 1) 10%,
    rgba(255, 255, 255, 1) 40%,
    rgba(255, 255, 255, 1) 100%
  );
  border-top: 1px solid #e0e0e0;
  padding-bottom: 4px;
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  padding: 15px;
  @media (min-width: ${props => props.theme.grid.sm}em) {
    max-width: 550px;
    padding: 25px;
    justify-content: space-between;
  }
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
`;

const CloseDialogWrapper = styled(Box)`
  display: flex;
  background: 'white';
  justify-content: 'flex-end';
  flex-flow: column;
`;

const ExtraPadding = styled('div')`
  background-color: white;
  height: 450px;
  @media (max-width: ${props => props.theme.grid.md}em) {
    height: 0px;
  }
`;

const CloseButton = styled(Button)`
  outline: none;
`;

const ContentWrapper = styled(Box)`
  max-width: 1080px;
  margin: auto;
`;

const Column = styled(Box)`
  background: inherit;
  margin: 0 auto;
  max-width: 1080px;
  @media (max-width: ${props => props.theme.grid.md}em) {
    flex-flow: column;
  }
`;

const ContentSection = styled(Box)`
  position: relative;
  min-height: 500px;
`;

const ContentBox = styled(Box)`
  margin: 0 auto;
  text-align: center;
  max-width: 1080px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const LoginPanelWrapper = styled(Box)`
  height: 100%;
  overflow: unset;
  @media (min-width: ${props => props.theme.grid.md}em) {
    left: 58%; /* Fallback if needed */
    left: calc(50% + 90px);
    top: -75px;
    position: absolute;
  }
  @media (min-width: ${props => props.theme.grid.lg}em) {
    left: 58%; /* Fallback if needed */
    left: calc(50% + 120px);
  }
`;

const LoginPanelContentBox = styled(ContentBox)`
  position: sticky;
  @media (min-width: ${props => props.theme.grid.md}em) {
    padding-top: 100px;
  }
  top: 0%
  align-self: flex-start;
`;

const ImageWrapper = styled(Box)`
  max-width: 1080px;
`;

const VideoWrapper = styled(ImageWrapper)`
  min-height: 200px;
`;

const defaultProps = {
  width: [1, 1, 3 / 5],
  px: [10, 10],
  maxWidth: ['100%', '100%', '648px'],
};

const expandedProps = {
  ...defaultProps,
  maxWidth: '100%',
};

const LoginDefaultProps = {
  width: [1, 1, 2 / 5, 2 / 5],
  px: [10, 10, 15, 10],
  maxWidth: ['100%', '100%', '388px', '460px'],
};

const WorkFlowContainer = styled(Box)`
  margin-top: 0.7rem;
  margin-bottom: 2rem;
`;

const MarkdownWrapper = ({ content, isEnabledMarkdown, ...rest }) => {
  const referenceObject = React.useContext(HybridLoginReferenceContext);
  return <Markdown {...rest} referenceObject={referenceObject} raw={content} />;
};

const StyledButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const FloatingCta = () => {
  return (
    <StyledButton
      data-testid="floating-signup-btn"
      primary
      onClick={e => {
        scrollToElement(e, 'login-panel');
      }}
    >
      See The Offers
    </StyledButton>
  );
};

const FloatingCtaWrapper = styled(Box)`
  position: fixed;
  z-index: 999;
  text-align: center;
  left: 0;
  bottom: 0;
  width: 100 %;
  background: ${props => getColor('white', props.theme)};
`;

const MainContent = ({ mainHeading, videoSrc, mainContent }) => {
  return (
    <>
      <div scroll-target="mainHeading">
        {mainHeading && (
          <ContainerWrapper className="content-wrapper">
            <ContentWrapper>
              <Box className="hero" {...defaultProps}>
                {videoSrc && (
                  <VideoWrapper m="auto" py={10} px={[2, 2, 3]}>
                    <VideoDialog
                      containerStyle={{
                        position: 'relative',
                        paddingTop: '56.25%',
                      }}
                      iframeStyle={{ position: 'absolute', top: 0, left: 0 }}
                      videoSrc={videoSrc}
                      description={mainHeading || ''}
                    />
                  </VideoWrapper>
                )}
                {mainContent && (
                  <ContentBox px={[3, 3, 4]}>
                    <Markdown raw={mainContent} />
                  </ContentBox>
                )}
              </Box>
            </ContentWrapper>
          </ContainerWrapper>
        )}
      </div>
    </>
  );
};

const HeadingSection = ({ mainHeading, asSeenOnImage }) => {
  return (
    <div scroll-target="mainHeading">
      {(mainHeading || asSeenOnImage) && (
        <ContainerWrapper className="content-wrapper main-section">
          <Box className="as-seen-on" {...expandedProps} width={1}>
            {mainHeading && (
              <Header py={2} px={[3, 3, 4]} align="center" tag="h1">
                {mainHeading}
              </Header>
            )}
            {asSeenOnImage && (
              <ImageWrapper m="auto">
                <Img
                  src={asSeenOnImage}
                  alt="As Seen On"
                  data-testid="asSeenOnImage"
                  onClick={e => {
                    scrollToElement(e, 'login-panel');
                  }}
                />
              </ImageWrapper>
            )}
          </Box>
        </ContainerWrapper>
      )}
    </div>
  );
};

const MainGraphic = ({
  heroImageUrlDesktopUrl,
  heroImageUrlTabletUrl,
  heroImageUrlMobileUrl,
  mainHeading,
}) => {
  return (
    <>
      {(heroImageUrlDesktopUrl || heroImageUrlMobileUrl) && (
        <div
          scroll-target="mainContent"
          data-testid="main-content"
          onClick={e => {
            scrollToElement(e, 'login-panel');
          }}
        >
          <ContainerWrapper
            className="content-wrapper"
            style={{ paddingTop: mainHeading ? '4px' : '24px' }}
          >
            <Box className="hero" {...expandedProps} width={1}>
              <Box m="auto" width={1}>
                <ResponsiveImage
                  desktopImgView={heroImageUrlDesktopUrl}
                  tabletImgView={heroImageUrlTabletUrl}
                  mobileImgView={heroImageUrlMobileUrl}
                  alt="Hero image"
                />
              </Box>
            </Box>
          </ContainerWrapper>
        </div>
      )}
    </>
  );
};

const HybridLoginView = ({
  rightSideMarkDownContent,
  accordion,
  subOfferContent,
  exitIntentProps,
  primaryCarousel,
  workflow,
  workflowOffer,
  calculatorProps,
  ...props
}) => {
  const defaultButtonVisible = useElementVisible(
    '[scroll-target="login-panel"]'
  );

  const [quote, setQuote] = useState(null);
  const [displayCounter, setDisplayCounter] = useState(0);

  const [showExitIntent, setShowExitIntent] = useState(false);

  const closeExitIntent = () => setShowExitIntent(false);

  useEffect(() => {
    if (exitIntentProps && exitIntentProps.enable && !showExitIntent) {
      const removeExitIntent = exitIntent({
        displayCounter: displayCounter,
        delay: exitIntentProps.delay || 5,
        topOnly: exitIntentProps.topOnly,
        displayTimes: exitIntentProps.displayTimes || 1,
        onExitIntent: () => {
          setShowExitIntent(true);
          setDisplayCounter(displayCounter + 1);
        },
      });
      return () => {
        removeExitIntent();
      };
    }
  }, [null, showExitIntent]);

  /**
   * Helper function that takes the submit event and passed the data to the
   * component where users specify when to be called back.
   *
   * @param {string} value
   * @returns
   */
  const onFormSubmit = value => {
    setQuote(value);
  };

  return (
    <React.Fragment>
      <BodyWrapper className="body-wrapper">
        <HeadingSection {...props} />
        <MainGraphic {...props} />
        <ContentSection>
          <MainContent {...props} />
          {calculatorProps.showQuoteCalculator ? (
            <LoginCalculatorPanel
              {...props}
              calculatorProps={calculatorProps}
              onSubmit={onFormSubmit}
              quote={quote}
              pane={true}
            />
          ) : (
            <LoginPanelWrapper {...LoginDefaultProps}>
              <LoginPanelContentBox>
                <div scroll-target="login-panel">
                  <LoginPanel {...props} />
                </div>
              </LoginPanelContentBox>
            </LoginPanelWrapper>
          )}

          <div scroll-target="offerContent">
            {(workflowOffer.header || workflowOffer.items.length > 0) && (
              <ContainerWrapper className="content-wrapper">
                <ContentWrapper>
                  <Box {...defaultProps}>
                    <Variant variant="a">
                      <WorkFlowContainer>
                        <WorkFlow
                          multiContent
                          scrollTo="login-panel"
                          header={workflowOffer.header}
                          items={workflowOffer.items}
                        />
                      </WorkFlowContainer>
                    </Variant>
                  </Box>
                </ContentWrapper>
              </ContainerWrapper>
            )}
            {((primaryCarousel &&
              primaryCarousel.slides &&
              primaryCarousel.slides.length > 0) ||
              subOfferContent ||
              accordion.length > 0) && (
              <ContainerWrapper className="content-wrapper">
                <ContentWrapper>
                  <Box {...defaultProps}>
                    {primaryCarousel &&
                      primaryCarousel.slides &&
                      primaryCarousel.slides.length > 0 && (
                        <Column variant="b" pb="20px">
                          <Carousel
                            slides={primaryCarousel.slides}
                            duration={primaryCarousel.duration}
                          />
                        </Column>
                      )}

                    {subOfferContent && (
                      <ContentBox px={[3, 3, 4]}>
                        <Markdown raw={subOfferContent} />
                      </ContentBox>
                    )}

                    {accordion.length > 0 && (
                      <Column variant="b" pb="20px">
                        <Accordion
                          items={accordion}
                          renderItem={item => (
                            <Variant variant="a">
                              <Box p={[2, 2, 3]}>
                                <MarkdownWrapper content={item.content} />
                              </Box>
                            </Variant>
                          )}
                          renderHeader={item => (
                            <Header tag="h5">{item.name}</Header>
                          )}
                        />
                      </Column>
                    )}
                  </Box>
                </ContentWrapper>
              </ContainerWrapper>
            )}
          </div>
          {(workflow.header || workflow.items.length > 0) && (
            <ContainerWrapper
              data-testid="mediaContent"
              className="content-wrapper"
            >
              <ContentWrapper>
                <Box {...defaultProps}>
                  <Variant variant="a">
                    <WorkFlowContainer>
                      <div scroll-target="mediaContent">
                        <WorkFlow
                          multiContent
                          scrollTo="login-panel"
                          header={workflow.header}
                          items={workflow.items}
                        />
                      </div>
                    </WorkFlowContainer>
                  </Variant>
                </Box>
              </ContentWrapper>
            </ContainerWrapper>
          )}
          {/* For Life Insurance Quote Calculator we hide the floating CTA for mobile */}
          {calculatorProps.showQuoteCalculator === false &&
            !defaultButtonVisible && (
              <Block hideAt="md">
                <Variant variant="a">
                  <FloatingCtaWrapper
                    {...defaultProps}
                    py={4}
                    px={4}
                    className="floating-cta"
                  >
                    <FloatingCta />
                  </FloatingCtaWrapper>
                </Variant>
              </Block>
            )}
          {props.showFullNameField && <ExtraPadding />}
        </ContentSection>
      </BodyWrapper>
      {exitIntentProps && exitIntentProps.enable && showExitIntent && (
        <Modal onClose={() => 0} data-testid="test-exit-intent">
          <StyledCard>
            <CloseDialogWrapper>
              <CloseButton
                data-testid="close-modal"
                asWrapper
                onClick={closeExitIntent}
              >
                <Header weight="normal" color="text" tag="h6" align="right">
                  <Icon center glyph="view-close" />
                </Header>
              </CloseButton>
            </CloseDialogWrapper>
            <LoginPanel
              isExitIntent={true}
              {...props}
              title={exitIntentProps.title || props.title}
              buttonText={exitIntentProps.buttonText || props.buttonText}
              buttonIcon={exitIntentProps.icon || props.buttonIcon}
              buttonTrack="signin/exit-intent"
            />
          </StyledCard>
        </Modal>
      )}
    </React.Fragment>
  );
};

HybridLoginView.propTypes = {
  rightSideMarkDownContent: t.shape({
    header: t.string,
    body: t.string,
  }),
  accordion: t.arrayOf(t.shape({})),
  primaryCarousel: t.shape({
    slides: t.arrayOf(t.shape({})),
    duration: t.number,
  }),
  workflow: t.shape({}),
  workflowOffer: t.shape({}),
  buttons: t.array,
  calculatorProps: t.shape({
    showQuoteCalculator: t.bool,
    campaignId: t.number,
    quoteText: t.string,
    getQuoteDisclaimerTextHtml: t.string,
    percentDiscount: t.number,
    discountText: t.string,
    phoneNumber: t.string,
    quoteHeaderText: t.string,
    paymentCycleText: t.string,
    timeToCallBackText: t.string,
    callbackUrl: t.string,
    quoteUrl: t.string,
  }),
};

HybridLoginView.defaultProps = {
  accordion: [],
  primaryCarousel: {},
  mainContent: '',
  workflow: { header: '', items: [] },
  workflowOffer: { header: '', items: [] },
};

const WrappedHybridLoginView = props => {
  const {
    trackingData,
    entity,
    navLinks,
    lifeInsuranceCalcProps,
    withCookieBanner,
    ...rest
  } = props;

  useEffect(() => {
    track('presignup', trackingData);
  });

  return (
    <React.Fragment>
      <BasicHeader
        py={2}
        entity={entity}
        items={navLinks}
        signInPath=""
        signOutPath=""
        subHeader=""
        withCookieBanner={withCookieBanner}
      />
      <HybridLoginView
        {...rest}
        trackingData={trackingData}
        calculatorProps={lifeInsuranceCalcProps}
      />
    </React.Fragment>
  );
};

WrappedHybridLoginView.defaultProps = {
  buttons: [
    { text: 'Morning', value: '800' },
    { text: 'Afternoon', value: '1200' },
    { text: 'Evening', value: '1800' },
  ],
  lifeInsuranceCalcProps: {
    showQuoteCalculator: false,
    campaignId: 0,
    quoteText: '',
    getQuoteDisclaimerTextHtml: '',
    percentDiscount: 0,
    discountText: '',
    phoneNumber: '',
    quoteHeaderText: '',
    paymentCycleText: '',
    timeToCallBackText: '',
    callMeBackTrack: '',
    seeMoreOffersButtonTrack: '',
    formSubmitButtonTrack: '',
  },
};

WrappedHybridLoginView.propTypes = {
  trackingData: t.shape({}),
  entity: t.shape({
    brand: t.string,
    facebook_pixel_id: t.string,
    footer_items: t.shape({
      logo: t.string,
    }),
    navigation_items: t.shape({}),
    header_items: t.shape({
      logo: t.string,
    }),
  }),
  trackingData: t.shape({}),
  buttons: t.array,
  exitIntentProps: t.shape({
    enable: t.bool,
    title: t.string,
    buttonText: t.string,
    icon: t.string,
    displayTimes: t.number,
    topOnly: t.bool,
  }),
  subOfferContent: t.string,
  lifeInsuranceCalcProps: t.shape({
    showQuoteCalculator: t.bool,
    campaignId: t.number,
    quoteText: t.string,
    quoteTitle: t.string,
    getQuoteDisclaimerTextHtml: t.string,
    percentDiscount: t.number,
    discountText: t.string,
    phoneNumber: t.string,
    quoteHeaderText: t.string,
    paymentCycleText: t.string,
    timeToCallBackText: t.string,
    callbackUrl: t.string,
    quoteUrl: t.string,
    thankyouHeader: t.string,
    thankyouBody: t.string,
    seeMoreOffersButtonText: t.string,
    formSubmitButtonText: t.string,
    callMeBackTrack: t.string,
    seeMoreOffersButtonTrack: t.string,
    formSubmitButtonTrack: t.string,
  }),
};

export { WrappedHybridLoginView as HybridLoginView };
