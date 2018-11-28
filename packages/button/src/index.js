import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
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

export const ButtonGroup = ({ children, ...flexProps }) => {
  return <GroupWrapper {...flexProps}>{children}</GroupWrapper>;
};

const Button = props => <Base {...props} />;

export default Button;

ButtonGroup.propTypes = {
  children: t.node.isRequired,
};

Button.propTypes = {
  track: t.string,
  children: t.node.isRequired,
  type: t.oneOf(['submit', 'reset', 'button']),
  onClick: t.func,
  asWrapper: t.bool,
  block: t.bool,
  secondary: t.bool,
};
