import React from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import { Box } from '@rtm-ui/layout';

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
`;

const BaseImg = styled.img`
  min-width: 1px;
`;

const Img = ({ src, alt, title, shape, height, width, ...boxProps }) => {
  return (
    <Wrapper>
      <ImgWrapper {...boxProps} shape={shape}>
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
  src: t.string.isRequired,
  alt: t.string.isRequired,
  shape: t.oneOf(['circle', 'rounded']),
  width: t.number,
  height: t.number,
};

export default Img;
