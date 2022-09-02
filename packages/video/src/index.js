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
  background: rgba(0,0,0,.5);
  z-index: 1;
  width: 100%;
  height: 500px;
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
  //transform: translateY(50%);
`;

const Video = ({ videoSource, children }) => {
  return (
    <VideoBackground>
      <VideoForeground>
        <StyledVideo
          loop='loop'
          autoPlay="autoplay"
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSource.src} type={videoSource.type}/>
        </StyledVideo>
        <ContentWrapper>{children}</ContentWrapper>
      </VideoForeground>
    </VideoBackground>
  )
}

Video.propTypes = {
  children: PropTypes.node
};


export { Video };