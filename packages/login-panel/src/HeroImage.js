import React from 'react';
import t from 'prop-types';
// import styled from 'styled-components';
// import { Box } from '@rtm-ui/layout';
import Img from '@rtm-ui/img';

const HeroImage = ({ imgUrl, imgWidth, imgHeight }) => {
  return (
    <Img src={imgUrl} width={imgWidth} height={imgHeight} alt="Hero image" />
  );
};

HeroImage.propTypes = {
  imgUrl: t.string,
  imgWidth: t.number,
  imgHeight: t.number,
};

HeroImage.defaultProps = {
  imgUrl: 'https://placehold.it/1080x454',
  imgWidth: 1080,
  imgHeight: 454,
};

export default HeroImage;
