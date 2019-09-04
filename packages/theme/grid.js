import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Card } from '../layout/src';
import { Header, Paragraph, Small } from '../typography/src';
import { Button, ButtonGroup } from '../button/src';

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
      {variants.map((variant, index) => {
        return (
          <Card p={10} key={index} variant={variant}>
            <Header tag="h3">Hello, World</Header>
            <Paragraph>This is a test</Paragraph>
            <Small>Here is some disclaimer text</Small>
            <ButtonGroup>
              <Button primary>Click Me!</Button>
              <Button secondary>Click Me!</Button>
              <Button tertiary>Click Me!</Button>
            </ButtonGroup>
          </Card>
        );
      })}
    </Container>
  );
};

export { Grid };
