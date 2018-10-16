import React from "react";
import Button, { ButtonGroup } from "../index";
import { render, fireEvent } from "../test-utils";

describe(`<Button />`, () => {
  it(`renders welcome message`, () => {
    const { getByText } = render(<Button>Welcome to React</Button>);
    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`renders welcome a secondary color`, () => {
    const { getByText } = render(<Button secondary>Welcome to React</Button>);
    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`renders welcome as a block`, () => {
    const { getByText } = render(<Button block>Welcome to React</Button>);
    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`renders without styling when specified as wrapper`, () => {
    const { getByText } = render(
      <Button track="get_started">Welcome to React</Button>
    );

    fireEvent.click(getByText("Welcome to React"));

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
