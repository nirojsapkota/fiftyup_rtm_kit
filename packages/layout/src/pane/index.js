import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../box';

const Wrapper = styled(Box)`
  border-radius: ${({ rounded, theme }) =>
    rounded ? theme.borderRadius : '0'};
  box-shadow: ${({ elevation, theme }) =>
    elevation ? theme.elevation[elevation] : 'none'};
`;

const Pane = props => <Wrapper {...props} />;

Pane.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Pane;
