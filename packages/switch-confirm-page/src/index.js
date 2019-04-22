import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import A from '@rtm-ui/a';
import Accordion from '@rtm-ui/accordion';
import { Box } from '@rtm-ui/layout';
import { Header, Small } from '@rtm-ui/typography';
import Variant, { backgroundStyle, getColor } from '@rtm-ui/theme';
import {
  ConfirmHeader,
  PlanDetails,
  Disclaimer,
  ConfirmSwitch,
} from '@rtm-ui/electricity-switch';

const PageWrapper = styled(Box)`
  background: ${props => getColor('light', props.theme)};
`;

const MobileView = styled(Box)`
  @media (min-width: ${props => props.theme.grid.md}em) {
    display: none;
  }
`;

const DesktopView = styled(Box)`
  @media (max-width: ${props => props.theme.grid.md}em) {
    display: none;
  }
`;

const HorizontalWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  max-width: 1080px;
`;

const FooterWrapper = styled(Box)`
  ${backgroundStyle};
`;

const ReviewItem = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #e5e5e5;
  align-items: center;
  span:nth-child(2n) {
    text-align: right;
  }
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
            <Small color="dark">{item.value}</Small>
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
        <Accordion
          items={reviewItems}
          renderHeader={item => <AccordionHeader header={item.header} />}
          renderItem={item => <ReviewContent items={item.body} />}
        />
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
      ...res
    } = this.props;

    return (
      <PageWrapper>
        <MobileView>
          <HeaderWrapper orientation="horizontal" headerProps={res} />
          <Box pt={30}>
            <PlanDetails
              orientation="horizontal"
              plan={plan}
              merchantLogo={merchant.logoUrl}
            />
          </Box>
          <Disclaimer items={disclaimers} />
          <ConfirmSwitch
            completeUrl={res.completeUrl}
            editUrl={res.editUrl}
            agreementItems={disclaimers}
            authenticityToken={res.authenticityToken}
            handleSubmit={this.handleSubmit}
            buttonId={res.switchButtonId}
            buttonText={res.switchButtonText}
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
        </MobileView>
        <DesktopView>
          <HeaderWrapper orientation="vertical" headerProps={res} />
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
            <Box style={{ width: '50%' }}>
              <Disclaimer items={disclaimers} />
              <ConfirmSwitch
                completeUrl={res.completeUrl}
                editUrl={res.editUrl}
                agreementItems={disclaimers}
                authenticityToken={res.authenticityToken}
                handleSubmit={this.handleSubmit}
                buttonId={res.switchButtonId}
                buttonText={res.switchButtonText}
              />
            </Box>
          </HorizontalWrapper>
        </DesktopView>
      </PageWrapper>
    );
  }
}
ConfirmationWrapper.defaultProps = {
  switchLinkText: 'Click here to continue Your switch',
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

export default SwitchConfirmPage;
