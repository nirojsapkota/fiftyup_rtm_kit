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
  ${props => props.scale && `font-size: ${props.theme.basePx * props.scale}px`};
  color: ${props => getColor(props.backgroundColor, props.theme)};
`;

const Box = ({ variant, ...gridProps }) => {
  return variant ? (
    <Variant variant={variant}>
      <Wrapper showBackground {...gridProps} />
    </Variant>
  ) : (
    <Wrapper {...gridProps} />
  );
};

Box.propTypes = {
  variant: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Box;
