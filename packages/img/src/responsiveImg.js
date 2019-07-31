import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { Img } from '@rtm-ui/img';
import styled from 'styled-components';

const Wrapper = styled(Box)`
  background: inherit;
  display: inline-flex;
  @media (max-width: 990px) {
    background-position: center center;
  }
`;
const useResponsiveWidth = () => {
  const [desktopWidth, setDesktopWidth] = useState(window.innerWidth);

  const handleImgResize = () => {
    setDesktopWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleImgResize);
    return () => window.removeEventListener('resize', handleImgResize);
  }, []);

  return desktopWidth;
};

const ResponsiveImage = ({ desktopImgView, tabletImgView }) => {
  const imageUrl = useResponsiveWidth() >= 990 ? desktopImgView : tabletImgView;
  return (
    <Wrapper>
      <Img src={imageUrl} alt={imageUrl} />
    </Wrapper>
  );
};

export default ResponsiveImage;

ResponsiveImage.propTypes = {
  desktopImgView: PropTypes.string.isRequired,
  tabletImgView: PropTypes.string.isRequired,
};
