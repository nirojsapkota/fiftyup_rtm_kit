import React from 'react';
// eslint-disable-next-line import/named
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Button, ButtonGroup } from '../index';

afterEach(cleanup);

describe(`<Button />`, () => {
  const welcomeMessage = 'Welcome to React';
  it(`renders welcome message`, () => {
    const { getByText } = render(<Button>{welcomeMessage}</Button>, {
      themeOverrides: { 'colors.variants.a.accent': 'orange' },
    });

    const divNode = getByText(welcomeMessage);
    const buttonNode = divNode.closest('button');

    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'orange');
  });

  it(`renders welcome a secondary color`, () => {
    const { getByText } = render(<Button secondary>{welcomeMessage}</Button>, {
      themeOverrides: { 'colors.grayscale.slightlyDarker': 'gray' },
    });

    const divNode = getByText(welcomeMessage);
    const buttonNode = divNode.closest('button');

    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'gray');
  });

  it(`renders welcome a tertiary color`, () => {
    const { getByText } = render(<Button tertiary>{welcomeMessage}</Button>, {
      themeOverrides: { 'colors.variants.a.tertiary': 'green' },
    });

    const divNode = getByText(welcomeMessage);
    const buttonNode = divNode.closest('button');

    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'green');
  });

  it(`renders welcome as a block`, () => {
    const { getByText } = render(<Button block>Welcome to React</Button>);

    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`renders without styling when specified as wrapper`, () => {
    const { getByText } = render(<Button asWrapper>Welcome to React</Button>);

    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`renders a collection of buttons `, () => {
    const { getByText } = render(
      <ButtonGroup>
        <Button>Welcome to React</Button>
        <Button>Welcome to React</Button>
      </ButtonGroup>
    );

    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });
});
