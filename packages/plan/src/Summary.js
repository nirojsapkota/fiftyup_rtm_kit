import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@rtm-ui/button';
import { Header, Paragraph, Small, Markdown } from '@rtm-ui/typography';
import { Block, Box } from '@rtm-ui/layout';
import { Img } from '@rtm-ui/img';
import { List } from '@rtm-ui/list';
import { A } from '@rtm-ui/a';
import { Theme as Variant } from '@rtm-ui/theme';
import { Accordion } from '@rtm-ui/accordion';
import { DynamicSvg } from '@rtm-ui/dynamic-svg';
import { Share } from './Action';
import PlanReferenceContext from './PlanReferenceContext';
import { PrimaryAction } from './PrimaryAction';
import * as S from './styles';

const MarkdownWrapper = ({ content, isEnabledMarkdown, ...rest }) => {
  const referenceObject = React.useContext(PlanReferenceContext);
  return (
    <>
      {isEnabledMarkdown === false ? (
        <Paragraph dangerousHTML={content} />
      ) : (
        <Markdown {...rest} referenceObject={referenceObject} raw={content} />
      )}
    </>
  );
};

const PlanImg = ({ src, alt }) => {
  const referenceObject = React.useContext(PlanReferenceContext);
  if (src.endsWith('.svg')) {
    return <DynamicSvg src={src} referenceObject={referenceObject} />;
  } else {
    return <Img src={src} alt={alt} />;
  }
};

const Main = props => {
  const refer = React.useContext(PlanReferenceContext);
  return (
    <React.Fragment>
      <Box width={1} py={20}>
        <List>
          {props.plan_features &&
            props.plan_features.map(({ icon, body }) => ({
              icon,
              fill: 'primary',
              body: <Markdown referenceObject={refer} raw={body} />,
            }))}
        </List>
      </Box>
    </React.Fragment>
  );
};

const Summary = props => {
  const backAction = props.actions.find(
    ({ actionType }) => actionType === 'back'
  );
  const refer = React.useContext(PlanReferenceContext);
  const imageDataArr = props.multi_image_data || [];

  return (
    <Box p={[0, 0, 0, 2]}>
      <Box px={[2, 2, 3, 0]} py={3}>
        <Header color="primary" tag="h1" pb={[2, 3]}>
          {props.main_header_text}
        </Header>
      </Box>
      <Block showAt="md">
      {imageDataArr.length ? (
       <S.ContentWrapper>
        {imageDataArr.map(data => 
          <S.ImageContentWrapper>
            <PrimaryAction
            {...props.primaryActionProps}
            renderTrigger={triggerProps => (
              <A {...triggerProps}>
                <PlanImg
                  src={data.desktop_img}
                  alt={props.main_header_text}
                />
              </A>
            )}
            />
            </S.ImageContentWrapper>
        )}
        </S.ContentWrapper>
      ) : (
        <PrimaryAction
        {...props.primaryActionProps}
        renderTrigger={triggerProps => (
          <A {...triggerProps}>
            <PlanImg
              src={props.main_image_file_url}
              alt={props.main_header_text}
            />
          </A>
        )}
        />
      )}
      </Block>
      <Block hideAt="md">
      {imageDataArr.length ? (
        imageDataArr.map(data => 
          <S.ImageContentWrapper>
              <PrimaryAction
              {...props.primaryActionProps}
              renderTrigger={triggerProps => (
                <A {...triggerProps}>
                  <PlanImg
                    src={data.mobile_img ? data.mobile_img : data.desktop_img}
                    alt={props.main_header_text}
                  />
                </A>
              )}
              />
          </S.ImageContentWrapper>
        )
      ) : (
            <PrimaryAction
            {...props.primaryActionProps}
            renderTrigger={triggerProps => (
              <A {...triggerProps}>
                <PlanImg
                  src={props.mobile_image_file_url}
                  alt={props.main_header_text}
                />
              </A>
            )}
          />
          )}
      </Block>
      <Box px={[2, 2, 3, 0]} py={[20]}>
        <Box width={1}>
          <Box width={1} py={3}>
            <Header weight="normal" tag="h3">
              {props.sub_header_text}
            </Header>
          </Box>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {backAction ? (
            <Button
              as="a"
              href={backAction.link}
              onClick={backAction.onClick}
              secondary
            >
              {backAction.cta}
            </Button>
          ) : (
            <div />
          )}
          <PrimaryAction {...props.primaryActionProps} />
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
                <Share message={props.tweet_text} />
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
                  <S.StyledAccordion p={[2, 2, 3]}>
                    <MarkdownWrapper
                      content={item.content}
                      isEnabledMarkdown={props.isEnabledMarkdown}
                    />
                  </S.StyledAccordion>
                </Variant>
              )}
              renderHeader={item => <Header tag="h5">{item.name}</Header>}
            />
          </Variant>
        </Box>
        <Box py={2}>
          {props.disclaimers &&
            props.disclaimers.map((disclaimer, i) => (
              // since fonts are em, this will result in the new
              // base being 12px and the <Small> tag will
              // handle applying base colors to text blocks
              <Small key={i}>
                <Markdown
                  pb={10}
                  scale={0.75}
                  referenceObject={refer}
                  raw={disclaimer.body}
                />
              </Small>
            ))}
          <Small dangerousHTML={props.disclaimer_html} />
        </Box>
      </Box>
    </Box>
  );
};

Summary.defaultProps = {
  isEnabledMarkdown: true,
};

export default Summary;

Main.propTypes = {
  plan_features: PropTypes.arrayOf(PropTypes.shape({ body: PropTypes.string })),
};

Summary.propTypes = {
  authenticityToken: PropTypes.string,
  campaignId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  main_header_text: PropTypes.string,
  main_image_file_url: PropTypes.string,
  mobile_image_file_url: PropTypes.string,
  multi_image_data: PropTypes.arrayOf(
    PropTypes.shape({
      desktop_img: PropTypes.string,
      mobile_img: PropTypes.string,
    })
  ),
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
