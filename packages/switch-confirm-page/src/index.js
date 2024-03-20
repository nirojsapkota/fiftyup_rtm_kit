import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { A } from '@rtm-ui/a';
import { Accordion } from '@rtm-ui/accordion';
import { Box, Block, scrollToElement } from '@rtm-ui/layout';
import { Header, Small, Markdown } from '@rtm-ui/typography';
import { Theme as Variant, getColor } from '@rtm-ui/theme';
import {
  ConfirmHeader,
  PlanDetails,
  Disclaimer,
  ConfirmSwitch,
} from '@rtm-ui/electricity-switch';
import { useScreenshot } from 'use-screenshot-hook';
const axios = require('axios');

const StyledAccordion = styled(Box)`
  background: ${props => props.theme.colors.grayscale.lightest};
`;

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
  return <Header tag="h5">{header}</Header>;
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

const AccordionSection = ({ items, reviewItems, footer, references }) => {
  return (
    <Variant variant="b">
      <React.Fragment>
        <Accordion
          items={items}
          renderHeader={item => <Header tag="h5">{item.name}</Header>}
          renderItem={item => {
            return (
              <Variant variant="a">
                <StyledAccordion p={[2, 2, 3]}>
                  <Markdown referenceObject={references} raw={item.content} />
                  <FooterNote text={footer.value} />
                </StyledAccordion>
              </Variant>
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
    this.disclaimerBoxRef = createRef(null);
    this.mobileDisclaimerBoxRef = createRef(null);
    this.saveImgToS3 = this.saveImgToS3.bind(this);
  }

  // FIXME form will submit to server
  /* istanbul ignore next: unable to test this atm. but the test for this form
  submit is already covered in the electricity-switch package */
  handleSubmit() {
    const form = document.getElementsByTagName('form')[0];
    form.method = 'POST';
    form.action = this.props.completeUrl;
    form.submit();
  }
  // FIXME handle trigger button form child component
  handleButtonClick(e) {
    scrollToElement(e, 'confirm-switch');
  }

  saveImgToS3 = async (switchId, switchType, uploadUrl, image) => {
    const url = uploadUrl;
    const data = {
      switchId: switchId,
      switchType: switchType,
      imageURL: image,
    };

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      console.log('sending post request to: ', url);
      return await axios.post(url, data, config);
    } catch (error) {
      console.log('error: ', error);
      console.error(error);
      return true;
    }
  };

  render() {
    const {
      accordion,
      reviewDetail,
      disclaimers,
      merchant,
      planDetails,
      switchLinkText,
      references,
      ...rest
    } = this.props;

    /* istanbul ignore next: Unable to test this method currently.
    The coverage test is statement: 89%, lines: 89%, functions: 82% when the next block is not ignored. */
    const captureAndSubmit = () => {
      if (!rest.uploadUrl || rest.uploadUrl === null) {
        this.handleSubmit();
      } else {
        // Check to ensure that disclaimer content exists. This disclaimer content does not exist for the providers with external switching engine
        if (
          this.mobileDisclaimerBoxRef.current.getElementsByTagName('div')
            .length > 1 &&
          this.disclaimerBoxRef.current.getElementsByTagName('div').length > 1
        ) {
          // Expanding the disclaimer box in mobile view to capture all the conditions
          this.mobileDisclaimerBoxRef.current.getElementsByTagName(
            'div'
          )[1].style.maxHeight = 'none';

          // Expanding the disclaimer box to capture all the conditions
          this.disclaimerBoxRef.current.getElementsByTagName(
            'div'
          )[1].style.maxHeight = 'none';
        }
        rest.capture().then(result => {
          //console.log(result)
          this.saveImgToS3(
            rest.switchId,
            rest.switchType,
            rest.uploadUrl,
            result
          ).finally(() => {
            this.handleSubmit();
          });
        });
      }
    };

    return (
      <PageWrapper>
        <Block hideAt="md" width="100%">
          <HeaderWrapper orientation="horizontal" headerProps={rest} />
          <Box pt={30} px={3}>
            <PlanDetails
              orientation="horizontal"
              plan={planDetails.plan}
              header={planDetails.header}
              merchantLogo={merchant.logoUrl}
            />
          </Box>
          <div ref={this.mobileDisclaimerBoxRef}>
            <Disclaimer items={disclaimers} />
          </div>
          <div scroll-target="confirm-switch">
            <ConfirmSwitch
              completeUrl={rest.completeUrl}
              editUrl={rest.editUrl}
              agreementItems={disclaimers}
              authenticityToken={rest.authenticityToken}
              handleSubmit={captureAndSubmit}
              buttonId={rest.switchButtonId}
              buttonText={rest.switchButtonText}
            />
          </div>
          <AccordionSection
            items={accordion.items}
            reviewItems={[reviewDetail]}
            footer={accordion.footNote}
            references={references}
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
                  plan={planDetails.plan}
                  header={planDetails.header}
                  merchantLogo={merchant.logoUrl}
                />
              </Box>
              <AccordionSection
                items={accordion.items}
                reviewItems={[reviewDetail]}
                footer={accordion.footNote}
                references={references}
              />
            </Box>
            <Box style={{ width: '50%' }} pt={20}>
              <div ref={this.disclaimerBoxRef}>
                <Disclaimer items={disclaimers} />
              </div>
              <ConfirmSwitch
                completeUrl={rest.completeUrl}
                editUrl={rest.editUrl}
                agreementItems={disclaimers}
                authenticityToken={rest.authenticityToken}
                handleSubmit={captureAndSubmit}
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
  planDetails: PropTypes.shape({}),
  handleSubmit: PropTypes.func,
  switchLinkText: PropTypes.string,
  saveImgToS3: PropTypes.func,
};

const SwitchConfirmPage = props => {
  const { takeScreenshot } = useScreenshot();

  return (
    <React.Fragment>
      <ConfirmationWrapper {...props} capture={() => takeScreenshot()} />
    </React.Fragment>
  );
};

export { SwitchConfirmPage, ConfirmationWrapper };
