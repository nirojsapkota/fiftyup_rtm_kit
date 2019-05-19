import React from 'react';
// eslint-disable-next-line import/named
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Button, ButtonGroup } from '../index';

afterEach(cleanup);

const mockTrackEvent = jest.fn();
jest.mock('@rtm-ui/tracker', () => {
  const original = require.requireActual('@rtm-ui/tracker');
  return {
    ...original,
    Tracker: props => props.render(mockTrackEvent),
  };
});

describe(`<Button />`, () => {
  const welcomeMessage = 'Welcome to React';
  it(`renders welcome message`, () => {
    const { getByText } = render(<Button>{welcomeMessage}</Button>, {
      themeOverrides: { 'colors.variants.a.accent': 'orange' },
    });

    const buttonNode = getByText(welcomeMessage);
    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'orange');
  });

  it(`renders welcome a secondary color`, () => {
    const { getByText } = render(<Button secondary>{welcomeMessage}</Button>, {
      themeOverrides: { 'colors.grayscale.slightlyDarker': 'gray' },
    });

    const buttonNode = getByText(welcomeMessage);
    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'gray');
  });

  it(`renders welcome a tertiary color`, () => {
    const { getByText } = render(<Button tertiary>{welcomeMessage}</Button>, {
      themeOverrides: { 'colors.variants.a.tertiary': 'green' },
    });

    const buttonNode = getByText(welcomeMessage);
    expect(buttonNode).toBeInTheDocument();
    expect(buttonNode).toHaveStyleRule('background', 'green');
  });

  it(`renders welcome as a block`, () => {
    const { getByText } = render(<Button block>Welcome to React</Button>);

    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`passes the track prop to the tracking context module`, () => {
    const { getByText } = render(
      <Button track="test">Welcome to React</Button>
    );

    fireEvent.click(getByText('Welcome to React'));

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    // TODO: jest cleanup should take care of this
    mockTrackEvent.mockReset();
  });

  it(`does not pass the track prop to the tracking context module`, () => {
    const { getByText } = render(<Button>Welcome to React</Button>);

    fireEvent.click(getByText('Welcome to React'));

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
