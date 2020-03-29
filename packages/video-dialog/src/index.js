import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';

const IFrameContainer = styled.iframe`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const VideoDialog = ({ width, height, videoSrc, description }) => {
  return (
    <Box data-testid="if-container" width={width} height={height} m="0 auto">
      <IFrameContainer
        src={videoSrc}
        title={description}
        name={description}
      />
    </Box>
  );
};

VideoDialog.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};
