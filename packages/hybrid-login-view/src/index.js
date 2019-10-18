import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Accordion } from '@rtm-ui/accordion';
import { Box } from '@rtm-ui/layout';
import { getColor, Theme as Variant } from '@rtm-ui/theme';
import { LoginPanel } from '@rtm-ui/login-panel';
import { Img } from '@rtm-ui/img';
import { HowItWorks } from '@rtm-ui/how-it-works';
import { track } from '@rtm-ui/tracker';
import BasicHeader from './header';
import { List, ListItem } from '@rtm-ui/list';
import { Markdown, Header } from '@rtm-ui/typography';

const HybridLoginReferenceContext = React.createContext();

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
  min-height: 400px;
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
  padding-top: 8px;
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

const HeroImageWrapper = styled(Box)`
  max-width: 1080px;
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
  howItWorksProps,
  children,
  whyJoinheader,
  heroImageUrl,
  component,
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
          <MobileHide>
            <Column width={1 / 2}>
              <LoginPanelWrapper mt={-30} px={[10, 10, 15, 20]}>
                <LoginPanel {...props} />
              </LoginPanelWrapper>
            </Column>
            <Column width={1 / 2}>
              <HowItWorksWrapper px={10} mt={[20, 20, 40, 40]}>
                {component === 'how' ? (
                  <HowItWorks orientation="vertical" {...howItWorksProps} />
                ) : (
                  <Box px={10}>
                    <ListItem>
                      <Markdown raw={whyJoinheader} />
                    </ListItem>
                    <List>{children}</List>
                  </Box>
                )}
              </HowItWorksWrapper>
            </Column>
          </MobileHide>
          <MobileShow>
            <LoginPanelWrapper mt={-30} px={[10, 10, 15, 20]}>
              <LoginPanel {...props} />
            </LoginPanelWrapper>
            <HowItWorksWrapper px={10} mt={[20, 20, 40, 50]}>
              {component === 'how' ? (
                <HowItWorks orientation="vertical" {...howItWorksProps} />
              ) : (
                <Box px={10}>
                  <ListItem>
                    <Markdown raw={whyJoinheader} />
                  </ListItem>
                  <List>{children}</List>
                </Box>
              )}
            </HowItWorksWrapper>
          </MobileShow>

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
        </ContentWrapper>
      </BodyWrapper>
    </React.Fragment>
  );
};

HybridLoginView.propTypes = {
  howItWorksProps: t.shape({}),
  heroImageUrl: t.string,
  component: t.oneOf(['why', 'how']),
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
