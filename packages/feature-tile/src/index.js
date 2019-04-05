import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box, Card, Flex } from '@rtm-ui/layout';
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
    justify-content: center;
  }
`;

const ImgContainer = styled.div`
  display: block
  overflow: hidden;
  max-height: 185px;
`;

const StyledCardHeader = styled(Box)`
  background: ${({ theme }) => getColor('secondary', theme)};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  h6 {
    line-height: 1.5;
  }
`;

const StyledPendantPositioner = styled(PendantPositioner)`
  position: absolute;
  top: 0;
  left: 0;
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
  flex-wrap: wrap-reverse;
  justify-content: space-between;
`;

const TileContentWrapper = styled(Box)`
  padding: 20px;
  flex: 1;
  flex-basis: auto;
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
    <Box style={{ position: 'relative' }}>
      <StyledCardHeader>
        <Header tag="h6" align="center" weight="bold" color="inverseText">
          {headerText}
        </Header>
      </StyledCardHeader>

      <StyledPendantPositioner>
        <ImgContainer>
          <Img src={image} alt="" />
        </ImgContainer>
        {flagText.length > 0 && (
          <StyledPendant color="secondary">{flagText}</StyledPendant>
        )}
      </StyledPendantPositioner>
    </Box>

    <TileContentWrapper>
      <Header color="text" align="left" tag="h6">
        {titleText}
      </Header>
      <Paragraph
        color="tertiary"
        align="left"
        py={[2, 3]}
        dangerousHTML={descriptionText}
      />
    </TileContentWrapper>
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

const GroupedTilesWrapper = styled(Flex)`
  max-width: 1400px;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
`;

const GroupedFeatureTiles = ({ featureTiles, ...props }) => (
  <GroupedTilesWrapper
    justifyContent={['center', 'center', 'unset']}
    {...props}
  >
    {featureTiles &&
      featureTiles.map(featureTile => (
        <Box
          width={['auto', 'auto', 1 / 3, 1 / 4]}
          style={{ flexDirection: 'column', flexWrap: 'wrap-reverse' }}
          p={10}
        >
          <FeatureTile {...featureTile} />
        </Box>
      ))}
  </GroupedTilesWrapper>
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

export { FeatureRow, GroupedFeatureTiles };
export default FeatureTile;
