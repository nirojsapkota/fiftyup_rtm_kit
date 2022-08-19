import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const VideoContainer = styled('div')`
  height: 0;
  width: 0;
`;

const CanvasVideo = props => {
  const { src, videoProps } = props;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    const fps = 60;

    const drawImage = () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const canvasInterval = window.setInterval(() => {
      drawImage(video);
    }, 1000 / fps);

    if (video) {
      video.onplay = () => {
        clearInterval(canvasInterval);
      };

      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;

      console.log('video width: ', video.offsetHeight)

      // var c = canvasElement, v=videoElement;
      // fill vertically
      var vRatio = (canvas.height / video.videoHeight) * video.videoWidth;
      context.drawImage(video, 0, 0, vRatio, canvas.height);
    }

  })

  return (
    <div className="CanvasVideo">
      <VideoContainer>
        <video
          style={{visibility: 'hidden'}}
          ref={videoRef}
          loop='loop'
          autoPlay
          playsInline
        >
          {src && src.map(video => (
            <source src={video.src} type={video.type} codecs="avc1.42E01E, mp4a.40.2"/>
          ))}
        </video>
      </VideoContainer>
      <canvas ref={canvasRef}></canvas>
    </div>

  )
}

CanvasVideo.propTypes = {
  children: PropTypes.node
};


export default CanvasVideo;