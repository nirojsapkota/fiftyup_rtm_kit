import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../box';

const StyledBlock = styled(Box)`
  ${props => (props.showAt ? `display: none` : null)};

  @media (min-width: ${props => props.theme.grid[props.hideAt]}em) {
    display: none;
  }
  @media (min-width: ${props => props.theme.grid[props.showAt]}em) {
    display: inherit;
  }
`;

const Block = ({ hideAt, showAt, children, ...rest }) => (
  <StyledBlock hideAt={hideAt} showAt={showAt} {...rest}>
    {children}
  </StyledBlock>
);

Block.propTypes = {
  hideAt: PropTypes.oneOf(['sm', 'md', 'lg']),
  showAt: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
};

export default Block;