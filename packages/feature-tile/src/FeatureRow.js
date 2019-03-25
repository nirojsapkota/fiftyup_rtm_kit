import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box, Flex } from '@rtm-ui/layout';
import { Header, Paragraph } from '@rtm-ui/typography';
import Button from '@rtm-ui/button';
import Img from '@rtm-ui/img';
import { getColor } from '@rtm-ui/theme';

const StyledInnerFlex = styled(Flex)`
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1 1 0%;
  min-height: 240px;
  padding-top: 10px;
`;

export const FeatureRowWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center
  margin: auto;
  max-width: 1280px;
  padding: 30px 10px;
  width: 100%;
`;

const ImgContainer = styled.div`
  display: block
  overflow: hidden;
`;

const StyledCardHeader = styled(Box)`
  background: ${({ theme }) => getColor('secondary', theme)};
  margin-top: 0;
  p {
    line-height: 1.5;
    padding: 2px 0 0;
  }
`;

const Feature = styled(Flex)`
  width: 100%;
`;

const FeatureWrapper = styled(Box)`
  display: flex;
  justify-content: center;
`;

const FeatureContent = styled(Box)`
  padding-bottom: 20px;
  padding-top: 20px;
  width: 350px;
`;

export const FeatureRow = ({
  flagText,
  image,
  headerText,
  descriptionText,
  focalText,
  moreInfoLink,
  ctaText,
}) => (
  <FeatureWrapper>
    <Feature flexDirection={['column', 'column', 'initial']}>
      <Box width={[1, 1, '80%']}>
        <ImgContainer>
          <Img src={image} alt="" />
        </ImgContainer>
      </Box>
      <FeatureContent ml={[0, 0, '-30px']}>
        <StyledCardHeader pl={[0, 0, '25%']}>
          <Paragraph align="left" weight="bold" color="inverseText">
            {headerText}
          </Paragraph>
        </StyledCardHeader>
        <StyledInnerFlex pl={[0, 0, '25%']}>
          <Paragraph color="primary" weight="bold">
            {flagText}
          </Paragraph>
          <Header color="text" align="left" tag="h6">
            {focalText}
          </Header>
          <Paragraph color="tertiary" align="left" mb="10px">
            {descriptionText}
          </Paragraph>
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
      </FeatureContent>
    </Feature>
  </FeatureWrapper>
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

FeatureRow.propTypes = featureTileShape;
