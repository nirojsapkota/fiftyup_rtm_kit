import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Card } from '../../layout/src';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 10px;
  grid-gap: 10px;
`;

const Grid = ({ children }) => {
  const theme = React.useContext(ThemeContext);
  const variants = Object.keys(theme.colors.variants);
  return (
    <Container>
      {variants.map(variant => {
        return (
          <Card p={10} key={variant} variant={variant}>
            {children}
          </Card>
        );
      })}
    </Container>
  );
};

export { Grid };
