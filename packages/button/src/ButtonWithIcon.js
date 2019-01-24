import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Icon from '@rtm-ui/icon';

import Button from './Button';

const IconWrapper = styled(Box)`
  display: flex;
  flex-wrap: ${props => props.flexWrap || 'wrap'};

  > * {
    margin-right: 10px;
  }

  > *:last-child {
    margin-right: 0px;
  }
`;

export const ButtonWithIcon = ({
  children,
  icon,
  iconSize,
  iconFill,
  iconViewBox,
  ...props
}) => {
  return (
    <Button {...props}>
      {children}
      <IconWrapper>
        <Icon
          glyph={icon}
          size={iconSize}
          fill={iconFill}
          viewBox={iconViewBox}
        />
      </IconWrapper>
    </Button>
  );
};

export default ButtonWithIcon;

ButtonWithIcon.propTypes = {
  children: t.node.isRequired,
  icon: t.string,
  iconSize: t.oneOfType([t.string, t.number]),
  iconFill: t.string,
  iconViewBox: t.string,
};
