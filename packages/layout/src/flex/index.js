import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex as GridFlex } from '@rebass/grid';
import { Theme as Variant, getColor, backgroundStyle } from '@rtm-ui/theme';

const Wrapper = styled(GridFlex)`
  ${props => props.showBackground && backgroundStyle};
  ${props =>
    props.backgroundColor &&
    `background: ${getColor(props.backgroundColor, props.theme)}`};
`;

const Flex = ({ children, variant, ...gridProps }) => {
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

Flex.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
};

export default Flex;
