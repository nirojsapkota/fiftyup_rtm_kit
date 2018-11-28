import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import Pane from '../pane';

const Wrapper = styled(Pane)`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const Card = ({ children, ...boxProps }) => (
  <Wrapper rounded elevation="2" {...boxProps}>
    {children}
  </Wrapper>
);

Card.propTypes = {
  children: t.node.isRequired,
};

export default Card;
