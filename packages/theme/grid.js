import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Box } from '../layout/src';
import { Header, Paragraph, Small } from '../typography/src';
import Button, { ButtonGroup } from '../button/src';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Grid = ({ children }) => {
  const theme = React.useContext(ThemeContext);
  const variants = Object.keys(theme.colors.variants);
  console.log(variants);
  return (
    <Container>
      {variants.map(variant => {
        return (
          <Box p={10} variant={variant}>
            <Header>Hello, World</Header>
            <Paragraph>This is a test</Paragraph>
            <Small>Here is some disclaimer text</Small>
            <ButtonGroup>
              <Button primary>Click Me!</Button>
              <Button secondary>Click Me!</Button>
            </ButtonGroup>
          </Box>
        );
      })}
    </Container>
  );
};

export default Grid;
