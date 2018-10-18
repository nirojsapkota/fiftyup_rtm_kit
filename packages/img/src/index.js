import React from "react";
import styled from "styled-components";
import t from "prop-types";

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const borderRadius = props => ({
  circle: "50%",
  rounded: props.theme.borderRadius,
});

const ImgWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: ${props => borderRadius(props)[props.shape] || "0"};
  overflow: hidden;
`;

const Img = ({ src, title, alt, shape, height, width, ...boxProps }) => {
  return (
    <Wrapper>
      <ImgWrapper {...boxProps} shape={shape}>
        <img height={height} width={width} title={title} src={src} alt={alt} />
      </ImgWrapper>
    </Wrapper>
  );
};

Img.propTypes = {
  src: t.string.isRequired,
  alt: t.string.isRequired,
  title: t.string,
  shape: t.oneOf(["circle", "rounded"]),
  width: t.number,
  height: t.number,
};

export default Img;
