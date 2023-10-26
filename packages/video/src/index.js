import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const VideoForeground = styled('div')`
  position: relative;
  top: 0;
  left: 0;
  display: block;
  height: 100% !important;
`;

const VideoBackground = styled('div')`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  width: 100%;
  height: 500px;

  @media (min-width: ${props => props.theme.width[2] + 1}px) {
    height: 100%;
    position: unset;
    display: flow-root;
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    height: 330px;
  }
`;

const StyledVideo = styled('video')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ContentWrapper = styled('div')`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const Video = ({ videoSource, videoSourceMulti, children }) => {
  return (
    <VideoBackground data-testid="video-container">
      <VideoForeground>
        <StyledVideo
          loop="loop"
          autoPlay="autoplay"
          muted
          playsInline
          preload="auto"
        >
          {videoSource && <source src={videoSource.src} type={videoSource.type} />}

          {videoSourceMulti && videoSourceMulti.map((item, _index) => (
            <source src={item.src} type={item.type} />
          ))}
        </StyledVideo>
        <ContentWrapper>{children}</ContentWrapper>
      </VideoForeground>
    </VideoBackground>
  );
};

Video.propTypes = {
  children: PropTypes.node,
};

export { Video };
