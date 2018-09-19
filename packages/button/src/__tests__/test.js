import React from "react";
import Button from "../index";
import { render } from "../test-utils";

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
    const { getByText } = render(<Button asWrapper>Welcome to React</Button>);
    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });
});
