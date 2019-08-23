import React from 'react';
import PropTypes from 'prop-types';
import { A } from '@rtm-ui/a';
import { Icon } from '@rtm-ui/icon';
import { Dialog } from '@rtm-ui/dialog';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';
import { Header } from '@rtm-ui/typography';

const IFrameContainer = styled.iframe`
  max-width: 100%;
  width: 700px;
  height: 400px;
`;

const Link = styled(A)`
  display: inline-flex;
`;

const Title = styled(Header)`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 40px;
  margin-right: 20px;
`;

export const VideoDialog = ({ width, height, embedCode, description }) => {
  return (
    <Box>
      <Dialog
        renderContainer={({ CloseDialog }) => {
          return (
            <IFrameContainer
              width={width}
              height={height}
              src={`https://www.youtube.com/embed/${embedCode}`}
            />
          );
        }}
        renderTrigger={open => {
          return (
            <Link onClick={open}>
              <Icon size={40} fill="primary" glyph="play" />
              <Title tag="h6">{description}</Title>
            </Link>
          );
        }}
      />
    </Box>
  );
};

VideoDialog.propTypes = {
  embedCode: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};
