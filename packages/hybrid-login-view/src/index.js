import { Accordion } from '@rtm-ui/accordion';
import { Img } from '@rtm-ui/img';
import { Box } from '@rtm-ui/layout';
import { LoginPanel } from '@rtm-ui/login-panel';
import { getColor, Theme as Variant } from '@rtm-ui/theme';
import { track } from '@rtm-ui/tracker';
import { Header, Markdown } from '@rtm-ui/typography';
import { VideoDialog } from '@rtm-ui/video-dialog';
import { WorkFlow } from '@rtm-ui/how-it-works';
import t from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import BasicHeader from './header';
const HybridLoginReferenceContext = React.createContext();

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const ContentWrapper = styled(Box)`
  background: none;
  padding-top: 1rem;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, rgba(240,240,240,1) 0%, rgba(250,250,250,1) 10%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%);
  border-top: 1px solid #e0e0e0;
  padding-bottom: 4px;
`;

const Column = styled(Box)`
  background: inherit;
  margin: 0 auto;
  max-width: 1080px;
  @media (max-width: ${props => props.theme.grid.md}em) {
    flex-flow: column;
  }
`;

const LoginPanelWrapper = styled(Box)`
  align-self: flex-end;
  @media (min-width: ${props => props.theme.grid.md}em) {
    right: 0;
    position: fixed;
    top: 20%;
  }
`;

const ImageWrapper = styled(Box)`
  max-width: 1080px;
`;

const VideoWrapper = styled(ImageWrapper)`
  min-height: 200px;
`;

const LeftContainerWrapper = styled(Box)`
`;

const defaultProps = {
  width: [1, 1, 3 / 5, 3 / 5],
  px: [1, 1, 5, 6],
}

const LoginDefaultProps = {
  width: [1, 1, 2 / 5, 2 / 5],
  px: [10, 10, 15, 20]
}

const ContentBox = styled(Box)`
  margin: 0 auto;
  max-width: 1080px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

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

const MainContent = ({ mainHeading, asSeenOnImage, heroImageUrl, videoSrc, mainContent, refs, ...props }) => {
  return (
    <>
      <div scroll-target="mainHeading">
        {( mainHeading || asSeenOnImage) && <ContentWrapper className="content-wrapper main-section">
          <LeftContainerWrapper className="as-seen-on" {...defaultProps} width={1}>
            {mainHeading && <Header py={2} align="center" tag="h1">{mainHeading}</Header>}
            {asSeenOnImage && <ImageWrapper m="auto">
              <Img src={asSeenOnImage} alt="As Seen On" />
            </ImageWrapper>}
          </LeftContainerWrapper>
        </ContentWrapper>}
      </div>

      <div scroll-target="mainContent">
        {(heroImageUrl || videoSrc || mainContent) &&
          <ContentWrapper className="content-wrapper">
            <LeftContainerWrapper className="hero-" {...defaultProps}>
              <ImageWrapper m="auto">
                <Img src={heroImageUrl} alt="Hero image" />
              </ImageWrapper>
              {
                videoSrc &&
                <VideoWrapper m="auto" py={10}>
                  <VideoDialog
                    containerStyle={{position: 'relative', paddingTop: '50%'}}
                    iframeStyle={{position: 'absolute', top: 0, left: 0}}
                    videoSrc={videoSrc}
                    description={mainHeading || ''}
                  />
                </VideoWrapper>
              }
              {mainContent &&
                <ContentBox>
                  <Markdown raw={mainContent} />
                </ContentBox>}
            </LeftContainerWrapper>
          </ContentWrapper>}
      </div>
    </>
  )
}

const HybridLoginView = ({
  rightSideMarkDownContent,
  accordion,
  workflow,
  ...props
}) => {
  console.log(props);
  return (
    <React.Fragment>
      <BodyWrapper className="body-wrapper" pt={[50,50,50,72]}>
        <MainContent {...props} />

        <LoginPanelWrapper {...LoginDefaultProps}>
          <ContentBox>
            <LoginPanel
              {...props}
            />
          </ContentBox>
        </LoginPanelWrapper>

        <div scroll-target="offerContent">
          {(rightSideMarkDownContent.header || rightSideMarkDownContent.body || accordion.length >0) &&
            <ContentWrapper  className="content-wrapper">
              <LeftContainerWrapper className="as-seen-on" {...defaultProps}>
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
              </LeftContainerWrapper>
            </ContentWrapper>}
        </div>

        {(workflow.header || workflow.items.length > 0) &&
          <ContentWrapper className="content-wrapper">
            <LeftContainerWrapper {...defaultProps}>
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
            </LeftContainerWrapper>
        </ContentWrapper>}
      </BodyWrapper>
    </React.Fragment >
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
  workflow: {header: '', items: []},
};

const WrappedHybridLoginView = (props) => {
  const { trackingData, entity, navLinks, ...rest } = props;

  useEffect(() => {
    track('presignup', trackingData);
  });

  console.log("entity: ", entity);
  return (
    <React.Fragment>
      <BasicHeader
        py={2}
        entity={entity}
        items={navLinks}
        signInPath=''
        signOutPath=''
        subHeader='' />
      <HybridLoginView {...rest}/>
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
