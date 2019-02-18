import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Card } from '@rtm-ui/layout';
import { Header } from '@rtm-ui/typography';
import Icon from '@rtm-ui/icon';

const Flex = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  flex-wrap: wrap;

  > * {
    flex: 1;
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  position: relative;
  justify-content: center;
`;

const BackgroundIconWrapper = styled(Box)`
  background: none;
  position: absolute;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.5;
`;

const IconContainer = ({ backgroundIcon, children, ...boxProps }) => {
  return (
    <IconWrapper {...boxProps}>
      <React.Fragment>
        <Box w={[200, 400]} style={{ zIndex: 100 }}>
          {children}
        </Box>
        <BackgroundIconWrapper>{backgroundIcon}</BackgroundIconWrapper>
      </React.Fragment>
    </IconWrapper>
  );
};

const Hero = props => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#efefef',
        overflow: 'hidden',
      }}
    >
      <Flex py={30}>
        <Box style={{ position: 'relative', zIndex: 100 }}>
          <Header align="center" font="serif">
            {props.title}
          </Header>
        </Box>
        <IconContainer
          px={10}
          backgroundIcon={<Icon fill="inverseText" glyph="gear-2" size={600} />}
        >
          <Icon glyph={props.icon} size={150} />
        </IconContainer>
      </Flex>
      <Card p={[20, 30]} mx={2} mb={4} style={{ zIndex: 10 }}>
        {props.children}
      </Card>
    </Box>
  );
};

IconContainer.propTypes = {
  backgroundIcon: PropTypes.node,
  children: PropTypes.node,
};

Hero.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default Hero;
