import React from 'react';
import t from 'prop-types';
// import styled from 'styled-components';
// import { Box } from '@rtm-ui/layout';
import Img from '@rtm-ui/img';

const Header = ({ logoUrl, imgWidth, imgHeight }) => {
  return (
    <Img
      src={logoUrl}
      width={imgWidth}
      height={imgHeight}
      py={3}
      alt="Header logo"
    />
  );
};

Header.propTypes = {
  logoUrl: t.string,
  imgWidth: t.number,
  imgHeight: t.number,
};

Header.defaultProps = {
  logoUrl: 'https://placehold.it/150x150',
};

export default Header;
