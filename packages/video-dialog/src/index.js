import React from 'react';
import PropTypes from 'prop-types';
import { A } from '@rtm-ui/a';
import { Icon } from '@rtm-ui/icon';
import { Dialog } from '@rtm-ui/dialog';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';

const VideoWrapper = styled(Box)`
  display: flex;
  background: 'white';
  justify-content: 'flex-end';
  flex-flow: column;
`;

const IFrameContainer = styled.iframe`
  max-width: 100%;
  width: 700px;
  height: 400px;

  @media (max-width: ${props => props.theme.grid.sm}em) {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
  }
`;

export const VideoDialog = ({ width, height, embedCode, description }) => {
  return (
    <VideoWrapper>
      <Dialog
        renderContainer={({ CloseDialog }) => {
          return (
            <IFrameContainer
              width={width}
              height={height}
              src={`https://www.youtube.com/embed/${embedCode}?controls=0`}
            />
          );
        }}
        renderTrigger={open => {
          return (
            <A onClick={open}>
              <Icon size={60} glyph="play" />
              {description}
            </A>
          );
        }}
      />
    </VideoWrapper>
  );
};

VideoDialog.propTypes = {
  embedCode: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};
