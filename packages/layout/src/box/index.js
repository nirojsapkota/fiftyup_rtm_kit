import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box as GridBox } from '@rebass/grid';
import { Theme as Variant, getColor, backgroundStyle } from '@rtm-ui/theme';

const Wrapper = styled(GridBox)`
  ${props => props.showBackground && backgroundStyle};
  ${props =>
    props.backgroundColor &&
    `background: ${getColor(props.backgroundColor, props.theme)}`};
  color: ${props => getColor(props.backgroundColor, props.theme)};
`;

const Box = ({ children, variant, ...gridProps }) => {
  return variant ? (
    <Variant variant={variant}>
      <Wrapper showBackground {...gridProps}>
        {children}
      </Wrapper>
    </Variant>
  ) : (
    <Wrapper {...gridProps}>{children}</Wrapper>
  );
};

Box.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default Box;
