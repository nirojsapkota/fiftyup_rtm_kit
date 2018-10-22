import React from "react";
import Button, { ButtonGroup } from "../index";
import { render, fireEvent } from "test-utils";
import { Tracker } from "@rtm-test/tracker";

jest.mock("@rtm-test/tracker", () => {
  return {
    Tracker: jest.fn(),
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

  describe(`speaking to the tracking module`, () => {
    it(`with a track prop it calls the tracking event`, () => {
      const mockTrackEvent = jest.fn();
      Tracker.mockImplementation(props => props.render(mockTrackEvent));

      const { getByText } = render(
        <Button track="testit">Welcome to React</Button>
      );

      fireEvent.click(getByText("Welcome to React"));

      expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    });

    it(`without a track prop it does not call the tracking event`, () => {
      const mockTrackEvent = jest.fn();
      Tracker.mockImplementation(props => props.render(mockTrackEvent));

      const { getByText } = render(<Button>Welcome to React</Button>);

      fireEvent.click(getByText("Welcome to React"));

      expect(mockTrackEvent).not.toHaveBeenCalled();
    });
  });
});
