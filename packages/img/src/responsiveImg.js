/*
Responsive Image component to be used inside the Home Page
*/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { Img } from './index';
import styled, { ThemeContext } from 'styled-components';

const Wrapper = styled(Box)`
  background: inherit;
  display: flex-root;
  @media (max-width: 990px) {
    background-position: center center;
  }
`;
const useResponsiveWidth = () => {
  const [desktopWidth, setDesktopWidth] = useState(window.innerWidth);

  const handleImgResize = () => {
    setDesktopWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleImgResize);

  useEffect(() => {
    window.addEventListener('resize', handleImgResize);
    return () => window.removeEventListener('resize', handleImgResize);
  }, []);

  return window.innerWidth;
};

const ResponsiveImage = ({
  desktopImgView,
  tabletImgView,
  mobileImgView,
  expandedWidth,
  title,
}) => {
  const theme = React.useContext(ThemeContext);

  const minWidth = theme.width[0];
  const midWidth = theme.width[1];
  let imageUrl = '';

  let currentWidth = useResponsiveWidth();
  if (currentWidth <= minWidth) imageUrl = mobileImgView;
  else if (currentWidth > minWidth && currentWidth <= midWidth)
    imageUrl = tabletImgView ? tabletImgView : desktopImgView;
  else imageUrl = desktopImgView;

  return (
    <Wrapper>
      <Img
        expandedWidth={expandedWidth}
        src={imageUrl}
        alt={title || imageUrl}
        title={title || imageUrl}
      />
    </Wrapper>
  );
};

export default ResponsiveImage;

ResponsiveImage.propTypes = {
  desktopImgView: PropTypes.string.isRequired,
  tabletImgView: PropTypes.string.isRequired,
  mobileImgView: PropTypes.string.isRequired,
};
