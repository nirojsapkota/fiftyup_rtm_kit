import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  position: sticky;
  top: 0;
  align-self: flex-start;
`;

const Sidebar = props => {
  const { children, ...rest } = props;
  return (
    <StyledBox mb={[2, 3]} {...rest}>
      {props.children}
    </StyledBox>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
