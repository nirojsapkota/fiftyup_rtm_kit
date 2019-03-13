import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Animate from '@rtm-ui/animate';
import { Box } from '@rtm-ui/layout';
import { backgroundStyle } from '@rtm-ui/theme';
import Img from '@rtm-ui/img';
import { Header, Paragraph } from '@rtm-ui/typography';

const Wrapper = styled(Box)`
  ${backgroundStyle};
`;

const Flex = styled(Box)`
  display: flex;
`;

const ImgStyle = styled(Img)`
  img {
    max-width: 50px;
  }
`;

const Item = ({ item, align }) => (
  <Box key={item.author} py="10px">
    <Paragraph pb={[2, 3]} align={align}>
      {item.body}
    </Paragraph>
    <Flex alignItems="center">
      {item.selfie && (
        <ImgStyle shape="circle" mr={2} src={item.selfie} alt={item.author} />
      )}
      <Box>
        <Header tag="h5">{item.author}</Header>
        <Paragraph color="primary">{item.bio}</Paragraph>
      </Box>
    </Flex>
  </Box>
);

const Testimonial = ({ items, align, animate }) => {
  const itemsList = items.map(item => (
    <Item item={item} align={align} key={item.id} />
  ));
  return (
    <Wrapper px={[2, 3]} py={[2]}>
      {animate ? <Animate>{itemsList}</Animate> : itemsList}
    </Wrapper>
  );
};

Testimonial.defaultProps = {
  align: 'left',
};

Testimonial.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      selfie: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
    })
  ),
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

export default Testimonial;
