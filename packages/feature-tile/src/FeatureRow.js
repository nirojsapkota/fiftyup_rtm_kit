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
  padding-right: 10px;

  > * {
    margin-bottom: 5px;
    margin-top: 5px;
  }
`;

export const FeatureRowWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto;
  max-width: 1280px;
  padding: 30px 10px;
  width: 100%;
`;

const ImgContainer = styled(Box)`
  display: flex
  justify-content: flex-end;
  align-items: baseline;
`;

const StyledImg = styled(Img)`
  justify-content: flex-end;
  align-items: baseline;
`

const StyledCardHeader = styled(Box)`
  background: ${({ theme }) => getColor('secondary', theme)};
  margin-top: 0;
  h6 {
    line-height: 1.5;
  }
`;

const Feature = styled(Flex)`
  width: 100%;
`;

const FeatureWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const FeatureContent = styled(Box)`
  width: 350px;
  z-index: 9999;
`;

export const FeatureRow = ({
  flagText,
  image,
  headerText,
  descriptionText,
  titleText,
  ctaLink,
  ctaText,
}) => (
  <FeatureWrapper>
    <Feature flexDirection={['column', 'column', 'row']}>
      <ImgContainer width={[1, 1, '80%']}>
        <StyledImg src={image} alt="" />
      </ImgContainer>
      <FeatureContent ml={[0, 0, '-30px']}>
        <StyledCardHeader pl={[0, 0, '20%']}>
          <Header align="left" weight="bold" color="inverseText" tag="h6">
            {headerText}
          </Header>
        </StyledCardHeader>
        <StyledInnerFlex pl={[0, 0, '20%']}>
          <Header color="primary" weight="bold" tag="h6">
            {flagText}
          </Header>
          <Header color="text" align="left" tag="h6">
            {titleText}
          </Header>
          <Paragraph color="tertiary" align="left" mb="10px" dangerousHTML={descriptionText} />
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
  titleText: t.string,
  ctaLink: t.string.isRequired,
  ctaText: t.string.isRequired,
};

FeatureRow.propTypes = featureTileShape;
