import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { A } from '@rtm-ui/a';
import { Accordion } from '@rtm-ui/accordion';
import { Box, Block } from '@rtm-ui/layout';
import { Header, Small } from '@rtm-ui/typography';
import { Theme as Variant, getColor } from '@rtm-ui/theme';
import {
  ConfirmHeader,
  PlanDetails,
  Disclaimer,
  ConfirmSwitch,
} from '@rtm-ui/electricity-switch';

const PageWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const HorizontalWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  max-width: 1080px;
`;

const ReviewItem = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  > small {
    flex-basis: 50%;
  }
`;

const HeaderDetailWrapper = styled(Box)`
  background: ${props => getColor('background', props.theme)};
  color: ${props => getColor('text', props.theme)};
  padding: 15px;
  border-radius: 3px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BodyDetailsWrapper = styled(Box)`
  border: 1px solid ${props => getColor('background', props.theme)};
  border-radius: 3px;
  position: relative;
  top: -2px;
  padding: 8px;
`;

const SwitchLink = styled(A)`
  text-transform: uppercase;
  color: ${props => getColor('text', props.theme)};
`;

const HeaderWrapper = ({ headerProps, orientation }) => {
  return (
    <Variant variant="c">
      <ConfirmHeader
        orientation={orientation}
        confirmationHeader={headerProps.confirmationHeader}
        icon={headerProps.confirmationHeaderIcon}
      />
    </Variant>
  );
};

const AccordionHeader = ({ header }) => {
  return <Header tag="h6">{header}</Header>;
};

const AccordionContent = ({ items }) => {
  return (
    <Box py={2}>
      {items &&
        items.map((item, key) => {
          return (
            <React.Fragment key={key}>
              {item && (
                <React.Fragment>
                  <Header tag="h6" color="dark">
                    {item.title || ''}
                  </Header>
                  {item.body && (
                    <Small dangerousHTML={item.body.value} color="dark" />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
    </Box>
  );
};

const FooterNote = ({ text }) => {
  return <Small color="darker" dangerousHTML={text} />;
};

const ReviewContent = ({ items }) => {
  return (
    <React.Fragment>
      {items.map((item, key) => {
        return (
          <ReviewItem p={[10, 10]} key={key}>
            <Small color="dark">{item.title}</Small>
            <Small pl={3} color="dark" dangerousHTML={item.value} />
          </ReviewItem>
        );
      })}
    </React.Fragment>
  );
};

const AccordionSection = ({ items, reviewItems, footer }) => {
  return (
    <Variant variant="b">
      <React.Fragment>
        <Accordion
          items={items}
          renderHeader={item => <AccordionHeader header={item.header} />}
          renderItem={item => {
            return (
              <React.Fragment>
                <AccordionContent items={item.body} />
                <FooterNote text={footer.value} />
              </React.Fragment>
            );
          }}
        />
        <Box>
          <HeaderDetailWrapper>
            <AccordionHeader header={reviewItems[0].header} />
          </HeaderDetailWrapper>
          <BodyDetailsWrapper>
            <ReviewContent items={reviewItems[0].body} />
          </BodyDetailsWrapper>
        </Box>
      </React.Fragment>
    </Variant>
  );
};

class ConfirmationWrapper extends React.Component {
  constructor(props) {
    super(props);
    // Binding event
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  // FIXME form will submit to server
  handleSubmit() {
    const form = document.getElementsByTagName('form')[0];
    form.method = 'POST';
    form.action = this.props.completeUrl;
    form.submit();
  }
  // FIXME handle trigger button form child component
  handleButtonClick() {
    document.getElementById(this.props.switchButtonId).click();
  }

  render() {
    const {
      accordion,
      reviewDetail,
      disclaimers,
      merchant,
      plan,
      switchLinkText,
      ...rest
    } = this.props;

    return (
      <PageWrapper>
        <Block hideAt="md" width="100%">
          <HeaderWrapper orientation="horizontal" headerProps={rest} />
          <Box pt={30} px={3}>
            <PlanDetails
              orientation="horizontal"
              plan={plan}
              merchantLogo={merchant.logoUrl}
            />
          </Box>
          <Disclaimer items={disclaimers} />
          <ConfirmSwitch
            completeUrl={rest.completeUrl}
            editUrl={rest.editUrl}
            agreementItems={disclaimers}
            authenticityToken={rest.authenticityToken}
            handleSubmit={this.handleSubmit}
            buttonId={rest.switchButtonId}
            buttonText={rest.switchButtonText}
          />
          <AccordionSection
            items={accordion.items}
            reviewItems={[reviewDetail]}
            footer={accordion.footNote}
          />
          <Box py={2} style={{ textAlign: 'center' }}>
            <SwitchLink onClick={this.handleButtonClick}>
              {switchLinkText}
            </SwitchLink>
          </Box>
        </Block>
        <Block showAt="md" width="100%">
          <HeaderWrapper orientation="vertical" headerProps={rest} />
          <HorizontalWrapper m="auto" py={30}>
            <Box pr={3} style={{ width: '50%' }}>
              <Box pl={3}>
                <PlanDetails
                  orientation="vertical"
                  plan={plan}
                  merchantLogo={merchant.logoUrl}
                />
              </Box>
              <AccordionSection
                items={accordion.items}
                reviewItems={[reviewDetail]}
                footer={accordion.footNote}
              />
            </Box>
            <Box style={{ width: '50%' }} pt={20}>
              <Disclaimer items={disclaimers} />
              <ConfirmSwitch
                completeUrl={rest.completeUrl}
                editUrl={rest.editUrl}
                agreementItems={disclaimers}
                authenticityToken={rest.authenticityToken}
                handleSubmit={this.handleSubmit}
                buttonId={rest.switchButtonId}
                buttonText={rest.switchButtonText}
              />
            </Box>
          </HorizontalWrapper>
        </Block>
      </PageWrapper>
    );
  }
}
ConfirmationWrapper.defaultProps = {
  switchLinkText: 'Click here to continue Your switch',
  switchButtonId: 'btn-switches-submit',
};
ConfirmationWrapper.propTypes = {
  accordion: PropTypes.shape({}),
  reviewDetail: PropTypes.shape({}),
  disclaimers: PropTypes.array,
  merchant: PropTypes.shape({}),
  plan: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  switchLinkText: PropTypes.string,
};

const SwitchConfirmPage = props => {
  return (
    <React.Fragment>
      <ConfirmationWrapper {...props} />
    </React.Fragment>
  );
};

export { SwitchConfirmPage };
