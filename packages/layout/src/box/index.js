import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box as GridBox } from '@rebass/grid';
import Variant, { backgroundStyle } from '@rtm-ui/theme';

const Wrapper = styled(GridBox)`
  ${backgroundStyle};
`;

const Box = ({ children, variant, ...gridProps }) =>
  variant ? (
    <Variant variant={variant}>
      <Wrapper {...gridProps}>{children}</Wrapper>
    </Variant>
  ) : (
    <Wrapper {...gridProps}>{children}</Wrapper>
  );

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Box;
