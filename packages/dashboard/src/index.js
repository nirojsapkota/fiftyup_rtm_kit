import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FeatureRow, GroupedFeatureTiles } from '@rtm-ui/feature-tile';
import { Block, Box, Flex } from '@rtm-ui/layout';
import { Paragraph } from '@rtm-ui/typography';
import { Theme as Variant, getColor } from '@rtm-ui/theme';

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

export const Dashboard = ({ campaigns, dashboardBanner }) => {
  const featuredCampaign = campaigns.filter(
    campaign => campaign.isFeatured === true
  )[0];
  const unfeaturedCampaigns = featuredCampaign
    ? campaigns.filter(campaign => campaign.id !== featuredCampaign.id)
    : campaigns;
  return (
    <MainWrapper>
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
      id: PropTypes.string,
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
};
