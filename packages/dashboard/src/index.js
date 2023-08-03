import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FeatureRow, GroupedFeatureTiles } from '@rtm-ui/feature-tile';
import { Block, Box, Flex, Card, Pane } from '@rtm-ui/layout';
import { Modal } from '@rtm-ui/dialog';
import { Theme as Variant, getColor } from '@rtm-ui/theme';
import { Button } from '@rtm-ui/button';
import { Icon } from '@rtm-ui/icon';
import { Form } from '@rtm-ui/form';
import { Header, Markdown, Paragraph } from '@rtm-ui/typography';
import { getSurvey, submitSurvey, callTracker } from './actions';

const MainWrapper = styled(Box)`
  background: #f1f1f1;
`;

const ContentWrapper = styled(Flex)`
  flex-wrap: wrap;
  margin: auto;
  max-width: 1400px;
  padding: 30px 10px;
  width: 100%;

  @media (min-width: 707px) and (max-width: 735px) {
    justify-content: unset;
  }
`;

const HeroWrapper = styled(Box)`
  background: ${props => getColor('background', props.theme)};
`;

const HeroContentWrapper = styled(ContentWrapper)`
  max-width: 750px;
  padding: 0 10px;
  @media (max-width: 664px) {
    justify-content: initial;
  }
`;

const HeroHeadingWrapper = styled(HeroContentWrapper)`
  padding: 30px 10px;
  max-width: 1400px;
  @media (max-width: 735px) {
    background: ${props => getColor('background', props.theme)};
  }
`;

const SkipSurveyWrapper = styled(Box)`
  display: flex;
  background: 'white';
  justify-content: center;
  flex-flow: column;
  padding-bottom: 10px;
`;

const StyledCard = styled(Card)`
  max-width: 400px;
  padding: 15px;
  border-radius: 5px 5px 0 0;
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

const QuestionsStyledCard = styled(Card)`
  max-width: 400px;
  padding: 15px;
  border-radius: 0 0 5px 5px;
  @media (min-width: ${props => props.theme.grid.sm}em) {
    max-width: 550px;
    padding: 25px 50px 25px 50px;
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

const CloseButton = styled(Button)`
  outline: none;
`;

export const Dashboard = ({ campaigns, dashboardBanner, survey }) => {
  const featuredCampaign = campaigns.filter(
    campaign => campaign.isFeatured === true
  )[0];
  const unfeaturedCampaigns = featuredCampaign
    ? campaigns.filter(campaign => campaign.id !== featuredCampaign.id)
    : campaigns;

  React.useEffect(() => {
    if (survey) {
      (async () => {
        const result = await getSurvey(survey.url, { email: survey.email });
        if (result && result.data && result.data.showSurvey) {
          // empty
          setModalOpen(true);
        } else if(result && result.data && result.data.data && result.data.data.yearOfBirth == null) {
          if (result.data.data.products) { setProducts(result.data.data.products) };
          setModalOpen(true);
        }
        // setModalOpen(true); // uncomment this line for enabling dashboard popup in rtmui docs, comment again before pushing
      })();
    }
  }, []);

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [yearOfBirth, setYearOfBirth] = React.useState(null);

  const sendSurvey = (action, data = null) => {
    const answeredProducts = data ? data.products : products;
    let answeredYearOfBirth = data ? data.yearOfBirth : yearOfBirth;

    // Because skip and close action does not trigger a year of birth validation,
    // let's force blank the field if it does not meet the year range criteria
    if (
      action != 'cta' &&
      answeredYearOfBirth != '' &&
      (survey.yearOfBirth.config.minYear > answeredYearOfBirth ||
        survey.yearOfBirth.config.maxYear < answeredYearOfBirth)
    ) {
      answeredYearOfBirth = '';
    }

    submitSurvey(
      survey.url,
      survey.email,
      answeredYearOfBirth,
      answeredProducts
    );
    callTracker(survey.productSelection.options, action, answeredProducts);
    setModalOpen(!isModalOpen);
  };

  return (
    <MainWrapper>
      {// istanbul ignore next
      isModalOpen && (
        <Modal onClose={() => sendSurvey('clickout')} data-testid="test-modal">
          <StyledCard backgroundColor="primary">
            <Pane variant="b">
              <CloseDialogWrapper>
                <CloseButton
                  data-testid="close-modal"
                  asWrapper
                  onClick={() => sendSurvey('close')}
                >
                  <Header weight="normal" color="text" tag="h6" align="right">
                    <Icon center glyph="view-close" />
                  </Header>
                </CloseButton>
              </CloseDialogWrapper>
              <Header tag="h5" align="center">
                <Markdown raw={survey.title} />
              </Header>
              <div style={{ textAlign: 'center' }}>
                <small align="center">
                  <Markdown raw={survey.description} />
                </small>
              </div>
            </Pane>
          </StyledCard>
          <QuestionsStyledCard>
            <Form
              centeredSubmit={true}
              getNewestFieldValue={async (field, value) => {
                if (field == 'products') {
                  setProducts(value);
                }
              }}
              onSubmit={async e => {
                setProducts(e[1].value);
                setYearOfBirth(e[0].value);
                sendSurvey('cta', {
                  yearOfBirth: e[0].value,
                  products: e[1].value,
                });
              }}
              fields={[
                {
                  label: survey.yearOfBirth.label,
                  name: survey.yearOfBirth.name,
                  type: survey.yearOfBirth.type,
                  hint: survey.yearOfBirth.hint,
                  value: '',
                  onBlur: e => {
                    // istanbul ignore next
                    setYearOfBirth(e.target.value);
                  },
                  onFocus: e => {
                    // istanbul ignore next
                    setYearOfBirth(e.target.value);
                  },
                  config: {
                    component: survey.yearOfBirth.name,
                    validator: 'yearRange',
                    validatorArgs: [
                      survey.yearOfBirth.minYear,
                      survey.yearOfBirth.maxYear,
                    ],
                  },
                },
                {
                  label: survey.productSelection.label,
                  description: '',
                  config: {
                    component: 'panelCheck',
                    justifyContent: 'center',
                    autoComplete: false,
                  },
                  name: survey.productSelection.name,
                  value: '',
                  type: survey.productSelection.type,
                  options: survey.productSelection.options,
                },
              ]}
              renderFooter={() => (
                <SkipSurveyWrapper>
                  <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box
                      mb={10}
                      style={{ display: 'flex', alignSelf: 'center' }}
                    >
                      <CloseButton type="submit" align="center">
                        {survey.cta_label}
                      </CloseButton>
                    </Box>
                  </Box>
                  <CloseButton
                    asWrapper
                    onClick={() => {
                      sendSurvey('skip');
                    }}
                  >
                    <Header weight="normal" color="text" tag="h5">
                      {survey.skip_label}
                    </Header>
                  </CloseButton>
                </SkipSurveyWrapper>
              )}
            />
          </QuestionsStyledCard>
        </Modal>
      )}

      {dashboardBanner.content && (
        <HeroHeadingWrapper>
          <Box width={['316px', 'auto', 1]} mx="auto">
            <Paragraph color="primary">{dashboardBanner.content}</Paragraph>
          </Box>
        </HeroHeadingWrapper>
      )}

      {featuredCampaign && (
        <Block showAt="md">
          <HeroWrapper>
            <HeroContentWrapper>
              <Variant variant="regular">
                <FeatureRow {...featuredCampaign} />
              </Variant>
            </HeroContentWrapper>
          </HeroWrapper>
        </Block>
      )}

      <ContentWrapper justifyContent={['center', 'center', 'unset']}>
        {campaigns && (
          <Block hideAt="md" width="100%">
            <Variant variant="regular">
              <GroupedFeatureTiles featureTiles={campaigns} />
            </Variant>
          </Block>
        )}

        {unfeaturedCampaigns && (
          <Block showAt="md" width="100%">
            <Variant variant="regular">
              <GroupedFeatureTiles featureTiles={unfeaturedCampaigns} />
            </Variant>
          </Block>
        )}
      </ContentWrapper>
    </MainWrapper>
  );
};

Dashboard.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      headerText: PropTypes.string,
      image: PropTypes.string,
      flagText: PropTypes.string,
      titleText: PropTypes.string,
      descriptionText: PropTypes.string,
      ctaText: PropTypes.string,
      ctaLink: PropTypes.string,
    })
  ),
  dashboardBanner: PropTypes.shape({
    content: PropTypes.string,
    link: PropTypes.string,
  }),
  survey: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
    skippable: PropTypes.bool,
  }),
};
