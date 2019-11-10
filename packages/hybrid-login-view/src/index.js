import { Accordion } from '@rtm-ui/accordion';
import { Img } from '@rtm-ui/img';
import { Box } from '@rtm-ui/layout';
import { LoginPanel } from '@rtm-ui/login-panel';
import { getColor, Theme as Variant } from '@rtm-ui/theme';
import { track } from '@rtm-ui/tracker';
import { Header, Markdown } from '@rtm-ui/typography';
import t from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import BasicHeader from './header';
const HybridLoginReferenceContext = React.createContext();

const BodyWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const ContentWrapper = styled(Box)`
  max-width: 1080px;
  background: none;
  padding-top: 1rem;
  display: flex;
  flex-flow: row;
  min-height: 400px;
  @media (max-width: ${props => props.theme.grid.md}em) {
    flex-flow: column;
  }
`;

const BottomContentWrapper = styled(ContentWrapper)`
  min-height: auto;
  padding-top: 0;
`;

const Column = styled(Box)`
  background: inherit;
  display: flex;
  flex-flow: column;
`;

const LoginPanelWrapper = styled(Box)`
  background: inherit;
  margin-top: -55px;
  margin-bottom: 2px;
`;

const HeroImageWrapper = styled(Box)`
  max-width: 1080px;
`;

const ContentBox = styled(Box)`
  padding: 0 1rem 0.5rem 1rem;
`;

const TitleMarkdown = styled(Markdown)`
  margin-top: 0.7rem;
  margin-bottom: 0.7rem;
`;

const ContentMarkdown = styled(Markdown)`
  margin-bottom: 1rem;
`;

const MarkdownWrapper = ({ content, isEnabledMarkdown, ...rest }) => {
  const referenceObject = React.useContext(HybridLoginReferenceContext);
  return (
    <>
      <Markdown {...rest} referenceObject={referenceObject} raw={content} />
    </>
  );
};

const HybridLoginView = ({
  heroImageUrl,
  rightSideMarkDownContent,
  accordion,
  ...props
}) => {
  return (
    <React.Fragment>
      <BodyWrapper>
        <HeroImageWrapper m="auto">
          <Img src={heroImageUrl} alt="Hero image" />
        </HeroImageWrapper>
        <ContentWrapper m="auto">
          <Column width={1}>
            <LoginPanelWrapper mt={-30} px={[10, 10, 15, 20]}>
              <LoginPanel
                {...props}
                wrapperStyle={{
                  'border-top-left-radius': 0,
                  'border-top-right-radius': 0,
                }}
              />
            </LoginPanelWrapper>
          </Column>
          <Column width={1}>
            <ContentBox>
              <TitleMarkdown raw={rightSideMarkDownContent.header} />
              <ContentMarkdown raw={rightSideMarkDownContent.body} />
            </ContentBox>
          </Column>
        </ContentWrapper>
        <BottomContentWrapper m="auto">
          <Column width={1} pb={20} px={[10, 10, 0]} variant="b">
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
        </BottomContentWrapper>
      </BodyWrapper>
    </React.Fragment>
  );
};

HybridLoginView.propTypes = {
  rightSideMarkDownContent: t.shape({
    header: t.string,
    body: t.string,
  }),
  heroImageUrl: t.string,
  accordion: t.arrayOf(t.shape({})),
};

HybridLoginView.defaultProps = {
  accordion: [],
};

class WrappedHybridLoginView extends React.Component {
  componentDidMount() {
    track('presignup', this.props.trackingData);
  }

  render() {
    const { trackingData, entity, ...rest } = this.props;

    return (
      <React.Fragment>
        <BasicHeader py={2} />
        <HybridLoginView {...rest} />
      </React.Fragment>
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

export { WrappedHybridLoginView as HybridLoginView };
