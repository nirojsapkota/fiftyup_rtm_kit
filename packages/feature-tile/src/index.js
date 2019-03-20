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

const TileGroupFlex = styled(Flex)`
  > * {
    transition: all 0.3s ease-in-out;
    flex: 0 0 24%;
    &:hover {
      transform: translateY(-10px);
    }
  }
`;

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

export const FeatureTileGroup = ({ children, ...props }) => (
  <TileGroupFlex flexDirection={['column', 'column', 'row', 'row']}>
    {children.map((tile, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <TileWrapper key={index} width={[1, 1, 1 / 3]} {...props}>
        {tile}
      </TileWrapper>
    ))}
  </TileGroupFlex>
);

const ImgContainer = styled.div`
  display: block
  overflow: hidden;
  max-height: 160px;
`;

const StyledCardHeader = styled(Box)`
  background: ${({ theme }) => getColor('secondary', theme)};
  p {
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
  min-width: 285px;
`;

const CardWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const FeatureTile = ({
  flagText,
  image,
  headerText,
  descriptionText,
  focalText,
  moreInfoLink,
  ctaText,
}) => (
  <CardWrapper>
    <StyledCard>
    <StyledCardHeader>
      <Paragraph pt="4px" align="center" weight="bold" color="inverseText">
        {headerText}
      </Paragraph>
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

    <Box p="10px">
      <Header color="text" align="left" tag="h6">
        {focalText}
      </Header>
      <Paragraph color="tertiary" align="left" py={[2, 3]}>
        {descriptionText}
      </Paragraph>
    </Box>
    <Box p="10px">
      <Button
        width="100%"
        color="accent"
        weight="bold"
        align="center"
        as="a"
        href={moreInfoLink}
      >
      {ctaText}
      </Button>
    </StyledInnerFlex>
  </StyledCard>
  </CardWrapper>
);

const featureTileShape = {
  /** Text used by pendant flag. */
  flagText: t.string,
  image: t.string.isRequired,
  headerText: t.string.isRequired,
  descriptionText: t.string.isRequired,
  /** Accented text area. */
  focalText: t.string,
  moreInfoLink: t.string.isRequired,
  ctaText: t.string.isRequired,
};

FeatureTile.propTypes = featureTileShape;

export { FeatureRow };
export default FeatureTile;
