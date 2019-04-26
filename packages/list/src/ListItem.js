import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ListItem = ({ icon, fill, children }) => {
  return (
    <Box my={[2]}>
      <Wrapper>
        {icon && (
          <Box pr={[1, 2, 3]}>
            <Icon glyph={icon} size={48} fill={fill} />
          </Box>
        )}
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    </Box>
  );
};

export default ListItem;

ListItem.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  fill: PropTypes.string,
};
