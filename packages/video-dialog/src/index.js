import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';

const IFrameContainer = styled.iframe`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const VideoDialog = ({
  width,
  height,
  videoSrc,
  description,
  containerStyle,
  iframeStyle
}) => {
  return (
    <Box style={containerStyle} data-testid="if-container" width={width} height={height} m="0 auto">
      <IFrameContainer
        src={videoSrc}
        title={description}
        name={description}
        style={iframeStyle}
      />
    </Box>
  );
};

VideoDialog.defaultProps = {
  description: '',
}

VideoDialog.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iframeStyle: PropTypes.shape({}),
  containerStyle: PropTypes.shape({}),
  width: PropTypes.string,
  height: PropTypes.string,
};
