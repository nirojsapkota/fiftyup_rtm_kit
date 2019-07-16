import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from '@rtm-ui/typography'
import { Box } from '@rtm-ui/layout'
import { Button } from '@rtm-ui/button';

const HeroWrapper = styled(Box)`
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  height: 454px;
`;

export const Hero = ({...props}) => {
  
  return (
    <React.Fragment>
    <HeroWrapper style={{"backgroundImage": `url(${props.backgroundImgUrl})`, "backgroundPosition": "center"}}>
      <Header align="center" mt={130}>{props.imgText}</Header>
      <Box mx="auto" mt={80}>
        <Button as="a" href={props.buttonLink}>{props.buttonText}</Button>
      </Box>
    </HeroWrapper>    
    </React.Fragment>
  );
}

Hero.propTypes = {
  children: PropTypes.node,
  backgroundImgUrl: PropTypes.string,
  imgText: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string
};