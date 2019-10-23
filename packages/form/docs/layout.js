import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Box = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 300px;
`;

export const Layout = props => {
  return (
    <Container>
      <Box>{props.left}</Box>
      <Box>{props.right}</Box>
    </Container>
  );
};
