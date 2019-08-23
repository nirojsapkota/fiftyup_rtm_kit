import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Markdown } from '@rtm-ui/typography';
import { Img } from '@rtm-ui/img';
import { VideoDialog } from '@rtm-ui/video-dialog';
import HomePageHero from '../src/home-page-hero';

const HeroWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-height: 470px;
`;

const TextWrapper = styled.div`
  flex-direction: column;
  min-width: 300px;
  max-width: 500px;
  position: relative;
  padding-top: 100px;
  z-index: 10;
  display: flex;
  align-items: center;

  @media (max-width: ${props => props.theme.width[1]}px) and (min-width: 0) {
    min-width: 120px;
    max-width: 200px;
    padding-top: 50px;
    font-size: 8px;
    display: flex;
  }
`;
const ImageContainer = styled.div`
  transform: translateX(-100px) scale(0.75);
  @media (max-width: ${props => props.theme.width[1]}px) and (min-width: 0) {
    transform: translateX(-0px) scale(0.95);
    min-width: 200px;
    max-width: 250px;
    padding-top: 50px;
  }
`;

const Hero = ({ ...props }) => {
  return (
    <HeroWrapper>
      <TextWrapper>
        <Markdown mb={40} raw={props.title} />
        {props.embedCode && props.description ? <VideoDialog {...props} /> : ''}
      </TextWrapper>
      <ImageContainer>
        <Img src={props.backgroundImage} alt="" />
      </ImageContainer>
    </HeroWrapper>
  );
};

Hero.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export { Hero, HomePageHero };
