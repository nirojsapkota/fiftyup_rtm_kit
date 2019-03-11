import React from 'react';
import { render, cleanup, fireEvent } from '../../../bootstrap/setup/testSetup';
import A from '../index';

afterEach(cleanup);

const mockTrackEvent = jest.fn();
jest.mock('@rtm-ui/tracker', () => {
  const original = require.requireActual('@rtm-ui/tracker');
  return {
    ...original,
    Tracker: props => props.render(mockTrackEvent),
  };
});

describe('<A />', () => {
  const text = 'Hello, World!';

  it('matches expected output', () => {
    const clickFn = jest.fn();
    const { getByText } = render(
      <A onClick={clickFn} weight="normal" color="primary">
        {text}
      </A>
    );

    expect(getByText(text)).toBeInTheDocument();
    expect(getByText(text)).toHaveStyleRule('font-weight', '400');
    expect(getByText(text)).toHaveStyleRule('color', '#1566ad');

    fireEvent.click(getByText(text));
    expect(clickFn).toHaveBeenCalled();
  });

  it('passes the track prop to the tracking context module', () => {
    const { getByText } = render(<A track="test">{text}</A>);

    fireEvent.click(getByText(text));

    expect(mockTrackEvent).toHaveBeenCalledTimes(1);

    mockTrackEvent.mockReset();
  });

  it('defaults to link color when color prop is not set', () => {
    const { getByText } = render(<A>{text}</A>);
    expect(getByText(text)).toHaveStyleRule('color', '#1566ad');
  });
});
