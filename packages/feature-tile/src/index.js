import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box, Card } from '@rtm-ui/layout';
import { Header, Paragraph } from '@rtm-ui/typography';
import Button from '@rtm-ui/button';
import Img from '@rtm-ui/img';
import { getColor } from '@rtm-ui/theme';
import Pendant, { PendantPositioner } from './Pendant';
import { FeatureRow } from './FeatureRow';

export const ContentWrapper = styled(Box)`
  max-width: 1280px;
  width: 100%;
  margin: auto;
  padding: 30px 10px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid;

  @media (max-width: 664px) {
    justify-content: center
  }
`;

const ImgContainer = styled.div`
  display: block
  overflow: hidden;
  max-height: 185px;
`;

const StyledCardHeader = styled(Box)`
  background: ${({ theme }) => getColor('secondary', theme)};
  h6 {
    line-height: 1.5;
  }
`;

const StyledPendant = styled(Pendant)`
  min-width: 200px;
  width: 80%;
  display: block;
  position: relative;
  p {
    display: block;
  }
`;

const StyledCard = styled(Card)`
  max-width: 316px;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FeatureTile = ({
  flagText,
  image,
  headerText,
  descriptionText,
  titleText,
  ctaLink,
  ctaText,
}) => (
  <StyledCard>
    <Box>
      <StyledCardHeader>
        <Header tag="h6" pt="4px" align="center" weight="bold" color="inverseText">
          {headerText}
        </Header>
      </StyledCardHeader>

      <PendantPositioner>
        <ImgContainer>
          <Img src={image} alt="" />
        </ImgContainer>
        {flagText.length > 0 && (
          <StyledPendant color="secondary">{flagText}</StyledPendant>
        )}
      </PendantPositioner>
    </Box>

    <Box p="20px">
      <Header color="text" align="left" tag="h6">
        {titleText}
      </Header>
      <Paragraph color="tertiary" align="left" py={[2, 3]} dangerousHTML={descriptionText} />
    </Box>
    <Box p="20px">
      <Button
        width="100%"
        color="accent"
        weight="bold"
        align="center"
        as="a"
        href={ctaLink}
      >
      {ctaText}
      </Button>
    </Box>
  </StyledCard>
);

const featureTileShape = {
  flagText: t.string,
  image: t.string.isRequired,
  headerText: t.string.isRequired,
  descriptionText: t.string.isRequired,
  titleText: t.string,
  ctaLink: t.string.isRequired,
  ctaText: t.string.isRequired,
};

FeatureTile.propTypes = featureTileShape;

export { FeatureRow };
export default FeatureTile;
