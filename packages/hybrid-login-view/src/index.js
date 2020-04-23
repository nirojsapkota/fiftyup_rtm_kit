import { Accordion } from '@rtm-ui/accordion';
import { Img, ResponsiveImage } from '@rtm-ui/img';
import { Box, Block, scrollToElement } from '@rtm-ui/layout';
import { LoginPanel } from '@rtm-ui/login-panel';
import { getColor, Theme as Variant } from '@rtm-ui/theme';
import { track } from '@rtm-ui/tracker';
import { Header, Markdown } from '@rtm-ui/typography';
import { VideoDialog } from '@rtm-ui/video-dialog';
import { WorkFlow } from '@rtm-ui/how-it-works';
import { Button } from '@rtm-ui/button';
import t from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import BasicHeader from './header';
const HybridLoginReferenceContext = React.createContext();

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const ContainerWrapper = styled(Box)`
  background: none;
  padding-top: 1rem;
  background: linear-gradient(to bottom, rgba(240,240,240,1) 0%, rgba(250,250,250,1) 10%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%);
  border-top: 1px solid #e0e0e0;
  padding-bottom: 4px;
`;

const ContentWrapper = styled(Box)`
  max-width: 1080px;
  margin: auto;
`

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
`

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
    left: 58%;
    top: -125px;
    position: absolute;
  }
`;

const LoginPanelContentBox = styled(ContentBox)`
  position: sticky;
  padding-top: 100px;
  top: 0%
  align-self: flex-start;
`

const ImageWrapper = styled(Box)`
  max-width: 1080px;
`;

const VideoWrapper = styled(ImageWrapper)`
  min-height: 200px;
`;

const defaultProps = {
  width: [1, 1, 3 / 5],
  px: [10, 10],
  maxWidth: ["100%", "100%", "648px"]
}

const expandedProps = {
  ...defaultProps,
  maxWidth: "100%"
}

const LoginDefaultProps = {
  width: [1, 1, 2 / 5, 2 / 5],
  px: [10, 10, 15, 10],
  maxWidth: ["100%", "100%", "388px"]
}

const TitleMarkdown = styled(Markdown)`
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
`;

const ContentMarkdown = styled(Markdown)`
  margin-bottom: 1rem;
`;

const WorkFlowContainer = styled(Box)`
  margin-top: 0.7rem;
  margin-bottom: 2rem;
`

const MarkdownWrapper = ({ content, isEnabledMarkdown, ...rest }) => {
  const referenceObject = React.useContext(HybridLoginReferenceContext);
  return (
    <Markdown {...rest} referenceObject={referenceObject} raw={content} />
  );
};

const StyledButton = styled(Button)`
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const FloatingCta = () => {
  return (
    <StyledButton data-testid="floating-signup-btn" primary onClick={(e) => {
      scrollToElement(e, 'login-panel');
    }}
    >
      See The Offers</StyledButton >
  )
}


const FloatingCtaWrapper = styled(Box)`
position: fixed;
z-index: 999;
text-align: center;
left: 0;
bottom: 0;
width: 100 %;
background: ${ props => getColor('white', props.theme)};
`;

const MainContent = ({ mainHeading, asSeenOnImage, videoSrc, mainContent }) => {
  return (
    <>
      <div scroll-target="mainHeading">
        {(mainHeading || asSeenOnImage) &&
          <ContainerWrapper className="content-wrapper">
            <ContentWrapper>
              <Box className="hero" {...defaultProps}>
                {
                  videoSrc &&
                  <VideoWrapper m="auto" py={10}>
                    <VideoDialog
                      containerStyle={{ position: 'relative', paddingTop: '50%' }}
                      iframeStyle={{ position: 'absolute', top: 0, left: 0 }}
                      videoSrc={videoSrc}
                      description={mainHeading || ''}
                    />
                  </VideoWrapper>
                }
                {mainContent &&
                  <ContentBox>
                    <Markdown raw={mainContent} />
                  </ContentBox>}
              </Box>
            </ContentWrapper>
          </ContainerWrapper>}
      </div>
    </>
  )
}

const HeadingSection = ({ mainHeading, asSeenOnImage }) => {
  return (
    <div scroll-target="mainHeading">
      {(mainHeading || asSeenOnImage) && <ContainerWrapper className="content-wrapper main-section">
        <Box className="as-seen-on" {...expandedProps} width={1}>
          {mainHeading && <Header py={2} align="center" tag="h1">{mainHeading}</Header>}
          {asSeenOnImage && <ImageWrapper m="auto">
            <Img src={asSeenOnImage} alt="As Seen On" />
          </ImageWrapper>}
        </Box>
      </ContainerWrapper>}
    </div>
  )
}

const MainGraphic = ({ heroImageUrlDesktopUrl, heroImageUrlMobileUrl }) => {
  return (
    <>
      {(heroImageUrlDesktopUrl || heroImageUrlMobileUrl) &&
        <div scroll-target="mainContent">
          <ContainerWrapper className="content-wrapper" style={{ paddingTop: "4px" }}>
            <Box className="hero" {...expandedProps} width={1}>
              <Box m="auto" width={1}>
                <ResponsiveImage
                  desktopImgView={heroImageUrlDesktopUrl}
                  tabletImgView={heroImageUrlMobileUrl}
                  alt="Hero image" />
              </Box>
            </Box>
          </ContainerWrapper>
        </div>}
    </>
  )
}

const HybridLoginView = ({
  rightSideMarkDownContent,
  accordion,
  workflow,
  ...props
}) => {
  return (
    <React.Fragment>
      <BodyWrapper className="body-wrapper" pt={[50, 50, 50, 72]}>
        <HeadingSection {...props} />
        <MainGraphic {...props} />

        <ContentSection>
          <MainContent {...props} />

          <LoginPanelWrapper {...LoginDefaultProps}>
            <LoginPanelContentBox>
              <div scroll-target="login-panel" >
                <LoginPanel
                  {...props}
                />
              </div>
            </LoginPanelContentBox>
          </LoginPanelWrapper>

          <div scroll-target="offerContent">
            {(rightSideMarkDownContent.header || rightSideMarkDownContent.body || accordion.length > 0) &&
              <ContainerWrapper className="content-wrapper">
                <ContentWrapper>
                  <Box className="as-seen-on" {...defaultProps}>
                    <ContentBox>
                      <TitleMarkdown raw={rightSideMarkDownContent.header} />
                      <ContentMarkdown raw={rightSideMarkDownContent.body} />
                    </ContentBox>

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
                        renderHeader={item => <Header tag="h5">{item.name}</Header>}
                      />
                    </Column>
                  </Box>
                </ContentWrapper>
              </ContainerWrapper>}
          </div>

          {(workflow.header || workflow.items.length > 0) &&
            <ContainerWrapper data-testid="mediaContent" className="content-wrapper">
              <ContentWrapper>
                <Box {...defaultProps}>
                  <Variant variant="a">
                    <WorkFlowContainer >
                      <div scroll-target="mediaContent">
                        <WorkFlow
                          multiContent
                          header={workflow.header}
                          items={workflow.items} />
                      </div>
                    </WorkFlowContainer>
                  </Variant>
                </Box>
              </ContentWrapper>
            </ContainerWrapper>}

          <Block hideAt="md">
            <Variant variant="a">
              <FloatingCtaWrapper {...defaultProps} py={4} px={4} className="floating-cta" >
                <FloatingCta />
              </FloatingCtaWrapper>
            </Variant>
          </Block>
        </ContentSection>

      </BodyWrapper>
    </React.Fragment>
  );
};

HybridLoginView.propTypes = {
  rightSideMarkDownContent: t.shape({
    header: t.string,
    body: t.string,
  }),
  accordion: t.arrayOf(t.shape({})),
  workflow: t.shape({}),
};

HybridLoginView.defaultProps = {
  accordion: [],
  mainContent: '',
  workflow: { header: '', items: [] },
};

const WrappedHybridLoginView = (props) => {
  const { trackingData, entity, navLinks, ...rest } = props;

  useEffect(() => {
    track('presignup', trackingData);
  });

  return (
    <React.Fragment>
      <BasicHeader
        py={2}
        entity={entity}
        items={navLinks}
        signInPath=''
        signOutPath=''
        subHeader='' />
      <HybridLoginView {...rest} />
    </React.Fragment>
  );
}

WrappedHybridLoginView.propTypes = {
  trackingData: t.shape({}),
  entity: t.shape({
    brand: t.string,
    footer_items: t.shape({
      logo: t.string,
    }),
    navigation_items: t.shape({}),
    header_items: t.shape({
      logo: t.string,
    }),
  }),
};

export { WrappedHybridLoginView as HybridLoginView };
