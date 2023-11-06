import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import ResponsiveImage from '../src/responsiveImg';

const Wrapper = styled(Box)`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const borderRadius = props => ({
  circle: '50%',
  rounded: props.theme.borderRadius,
});

const ImgWrapper = styled(Box)`
  display: inline-flex;
  align-items: center;
  border-radius: ${props => borderRadius(props)[props.shape] || '0'};
  overflow: hidden;
  width: ${props => (props.expandedWidth ? '100%' : '')};
`;

const BaseImg = styled.img`
  min-width: 1px;
`;

const Img = ({ src, alt, title, shape, height, width, ...boxProps }) => {
  return (
    <Wrapper>
      <ImgWrapper data-testid="testImageWrapper" {...boxProps} shape={shape}>
        <BaseImg
          height={height}
          title={title}
          width={width}
          src={src}
          alt={alt}
        />
      </ImgWrapper>
    </Wrapper>
  );
};

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  shape: PropTypes.oneOf(['circle', 'rounded']),
  width: PropTypes.number,
  height: PropTypes.number,
};

export { Img, ResponsiveImage };
