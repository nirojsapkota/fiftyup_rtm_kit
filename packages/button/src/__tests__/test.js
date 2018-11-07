import React from "react";
import Button, { ButtonGroup } from "../index";
import { render, fireEvent } from "test-utils";

const mockTrackEvent = jest.fn();
jest.mock("@rtm-test/tracker", () => {
  const original = require.requireActual("@rtm-test/tracker");
  return {
    ...original,
    Tracker: props => props.render(mockTrackEvent),
  };
});

describe(`<Button />`, () => {
  it(`renders welcome message`, () => {
    const { getByText, container } = render(<Button>Welcome to React</Button>);

    expect(getByText(`Welcome to React`)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(`renders welcome a secondary color`, () => {
    const { getByText, container } = render(
      <Button secondary>Welcome to React</Button>
    );

    expect(getByText(`Welcome to React`)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it(`renders welcome as a block`, () => {
    const { getByText } = render(<Button block>Welcome to React</Button>);

    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`passes the track prop to the tracking context module`, () => {
    const { getByText } = render(
      <Button track="test">Welcome to React</Button>
    );

    fireEvent.click(getByText("Welcome to React"));

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    // TODO: jest cleanup should take care of this
    mockTrackEvent.mockReset();
  });

  it(`does not pass the track prop to the tracking context module`, () => {
    const { getByText } = render(<Button>Welcome to React</Button>);

    fireEvent.click(getByText("Welcome to React"));

    expect(mockTrackEvent).not.toHaveBeenCalled();
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
