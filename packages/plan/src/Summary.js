import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@rtm-ui/button';
import { Header, Paragraph, Small, Markdown } from '@rtm-ui/typography';
import { Block, Box } from '@rtm-ui/layout';
import { Img } from '@rtm-ui/img';
import { List } from '@rtm-ui/list';
import { A } from '@rtm-ui/a';
import { Theme as Variant } from '@rtm-ui/theme';
import { Accordion } from '@rtm-ui/accordion';
import { Share } from './Action';
import PlanReferenceContext from './PlanReferenceContext';

const MarkdownWrapper = ({ content, isEnabledMarkdown, ...rest }) => {
  const refer = React.useContext(PlanReferenceContext);
  return (
    <>
      {isEnabledMarkdown === false ? (
        <Paragraph dangerousHTML={content} />
      ) : (
        <Markdown {...rest} referenceObject={refer} raw={content} />
      )}
    </>
  );
};

const StyledAccordion = styled(Box)`
  background: ${props => props.theme.colors.grayscale.lightest};
`;

const SubHeader = props => (
  <React.Fragment>
    <Box width={1} py={3}>
      <Header weight="normal" tag="h3">
        {props.sub_header_text}
      </Header>
    </Box>
  </React.Fragment>
);

const Main = props => {
  return (
    <React.Fragment>
      <Box width={1} py={20}>
        <List>
          {props.plan_features &&
            props.plan_features.map(({ icon, body }) => ({
              icon,
              fill: 'primary',
              body: (
                <MarkdownWrapper	
                  content={body}	
                  isEnabledMarkdown={props.isEnabledMarkdown}	
                />
              ),
            }))}
        </List>
      </Box>
    </React.Fragment>
  );
};

const ActionButton = ({
  callAction,
  authenticityToken,
  campaignId,
  entity,
  ...rest
}) => (
  <Box
    style={{
      marginLeft: 'auto',
    }}
  >
    {callAction && (
      <Button
        as="a"
        track={callAction.track}
        href={callAction.link}
        target={callAction.target}
      >
        {callAction.cta}
      </Button>
    )}
    {rest.phoneBackDialog()}
  </Box>
);

const ActionImage = ({
  callAction,
  authenticityToken,
  campaignId,
  entity,
  src,
  main_header_text,
  ...rest
}) => (
  <React.Fragment>
    {callAction && (
      <A track={callAction.track} href={callAction.link}>
        <Img src={src} alt={main_header_text} />
      </A>
    )}
    {rest.phoneBackDialog(open => (
      <Img src={src} alt={main_header_text} onClick={open} />
    ))}
  </React.Fragment>
);

const Summary = props => {
  const callAction = props.actions.find(({ track }) => track === 'get_started');
  const backAction = props.actions.find(
    ({ actionType }) => actionType === 'back'
  );

  return (
    <Box p={[0, 0, 0, 2]}>
      <Box px={[2, 2, 3, 0]} py={3}>
        <Header color="primary" tag="h1" pb={[2, 3]}>
          {props.main_header_text}
        </Header>
      </Box>
      <Block showAt="md">
        {props.main_image_file_url && (
          <ActionImage
            callAction={callAction}
            {...props}
            src={props.main_image_file_url}
          />
        )}
      </Block>
      <Block hideAt="md">
        {props.mobile_image_file_url && (
          <ActionImage
            callAction={callAction}
            {...props}
            src={props.mobile_image_file_url}
          />
        )}
      </Block>
      <Box px={[2, 2, 3, 0]} py={[20]}>
        <Box width={1}>
          <SubHeader {...props} />
        </Box>
        <Box
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {backAction && (
            <Button
              as="a"
              href={backAction.link}
              onClick={backAction.onClick}
              secondary
            >
              {backAction.cta}
            </Button>
          )}
          <ActionButton callAction={callAction} {...props} />
        </Box>
        <Box
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Box width={[1, 1, 0.6, 1]} pr={[0, 2, 2]}>
            <Main {...props} />
            {props.tweet_text && (
              <Box pb={2}>
                <Share
                  message={props.tweet_text ? props.tweet_text : undefined}
                />
              </Box>
            )}
          </Box>
          <Box width={[1, 1, 0.4, 1]}>{props.children}</Box>
        </Box>
        <Box py={20}>
          <Variant variant="b">
            <Accordion
              items={props.accordion}
              renderItem={item => (
                <Variant variant="a">
                  <StyledAccordion p={[2, 2, 3]}>
                    <MarkdownWrapper
                      content={item.content}
                      isEnabledMarkdown={props.isEnabledMarkdown}
                    />
                  </StyledAccordion>
                </Variant>
              )}
              renderHeader={item => <Header tag="h5">{item.name}</Header>}
            />
          </Variant>
        </Box>
        <Box py={2}>
          {props.disclaimers &&
            props.disclaimers.map(disclaimer => (
              // since fonts are em, this will result in the new
              // base being 12px and the <Small> tag will
              // handle applying base colors to text blocks
              <Small>
                <MarkdownWrapper
                  pb={10}
                  scale={0.75}
                  content={disclaimer.body}
                  isEnabledMarkdown={props.isEnabledMarkdown}
                />
              </Small>
            ))}
          <Small dangerousHTML={props.disclaimer_html} />
        </Box>
      </Box>
    </Box>
  );
};

export default Summary;

Main.propTypes = {
  plan_features: PropTypes.arrayOf(PropTypes.shape({ body: PropTypes.string })),
};

Summary.propTypes = {
  authenticityToken: PropTypes.string,
  campaignId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  entity: PropTypes.shape({
    name: PropTypes.string,
  }),
  main_header_text: PropTypes.string,
  main_image_file_url: PropTypes.string,
  mobile_image_file_url: PropTypes.string,
  sub_header_text: PropTypes.string,
  merchant: PropTypes.shape({
    name: PropTypes.string,
    logo_url: PropTypes.string,
  }),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.shape({
        track: PropTypes.string,
        link: PropTypes.string,
        cta: PropTypes.string,
      }),
    })
  ),
  isEnabledMarkdown: PropTypes.bool,
  children: PropTypes.node,
  disclaimer_html: PropTypes.string,
  accordion: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  tweet_text: PropTypes.string,
};

SubHeader.propTypes = {
  sub_header_text: PropTypes.string,
};
