import React from 'react';
// eslint-disable-next-line import/named
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Button, ButtonGroup } from '../index';

describe(`<Button />`, () => {
  const welcomeMessage = 'Welcome to React';
  it(`renders welcome message`, () => {
    const { getAllByText } = render(<Button>{welcomeMessage}</Button>, {
      themeOverrides: { 'colors.variants.a.accent': 'orange' },
    });

    const divNode = getAllByText(welcomeMessage)[0];
    const buttonNode = divNode.closest('button');

    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'orange');
  });

  it(`renders welcome a secondary color`, () => {
    const { getAllByText } = render(
      <Button secondary>{welcomeMessage}</Button>,
      {
        themeOverrides: { 'colors.grayscale.slightlyDarker': 'gray' },
      }
    );

    const divNode = getAllByText(welcomeMessage)[0];
    const buttonNode = divNode.closest('button');

    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'gray');
  });

  it(`renders welcome a tertiary color`, () => {
    const { getAllByText } = render(
      <Button tertiary>{welcomeMessage}</Button>,
      {
        themeOverrides: { 'colors.variants.a.tertiary': 'green' },
      }
    );

    const divNode = getAllByText(welcomeMessage)[0];
    const buttonNode = divNode.closest('button');

    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'green');
  });

  it(`renders welcome as a block`, () => {
    const { getAllByText } = render(<Button block>Welcome to React</Button>);

    expect(getAllByText(`Welcome to React`)[0]).toBeInTheDocument();
  });

  it(`renders without styling when specified as wrapper`, () => {
    const { getAllByText } = render(
      <Button asWrapper>Welcome to React</Button>
    );

    expect(getAllByText(`Welcome to React`)[0]).toBeInTheDocument();
  });

  it(`renders a collection of buttons `, () => {
    const { getAllByText } = render(
      <ButtonGroup>
        <Button>Welcome to React</Button>
        <Button>Welcome to React</Button>
      </ButtonGroup>
    );

    expect(getAllByText(`Welcome to React`)[0]).toBeInTheDocument();
  });

  it(`renders disabled buttons `, () => {
    const { getAllByText } = render(
      <ButtonGroup>
        <Button appearDisabled={true} disabled={true}>
          Welcome to React
        </Button>
        <Button appearDisabled={true} disabled={true}>
          Welcome to React
        </Button>
      </ButtonGroup>
    );

    expect(getAllByText(`Welcome to React`)[0]).toBeInTheDocument();
  });
});
