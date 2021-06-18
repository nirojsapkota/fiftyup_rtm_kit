import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Base } from './base';

const GroupWrapper = styled.div`
  display: flex;
  flex-wrap: ${props => props.flexWrap || 'wrap'};

  > * {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  > *:last-child {
    margin-right: 0px;
  }
`;

export const ButtonGrid = styled(Box)`
  display: grid;
  grid-gap: 10px 10px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: auto;
`;

export const ButtonGroup = ({ children, ...flexProps }) => {
  return <GroupWrapper {...flexProps}>{children}</GroupWrapper>;
};

const Button = props => <Base {...props} />;

export default Button;

ButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

Button.propTypes = {
  track: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
  onClick: PropTypes.func,
  asWrapper: PropTypes.bool,
  block: PropTypes.bool,
  secondary: PropTypes.bool,
  appearDisabled: PropTypes.bool,
};
