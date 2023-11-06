import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Video } from '../index';
import videoProps from '../__fixtures__/props.js';

describe('< Video /> ', () => {
  it('renders the video', () => {
    const props = videoProps;
    const { getByTestId } = render(<Video {...props} />);
    expect(getByTestId('video-container')).toBeInTheDocument();
  });

  it('matches expected output', () => {
    const text = 'Hello, World!';
    const props = videoProps;

    const { queryByText } = render(<Video {...props}>Hello, World!</Video>);
    expect(queryByText(text)).toBeInTheDocument();

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();

    const source = document.querySelector('source[type="video/mp4"]');
    expect(source).toBeInTheDocument();
    expect(source.src).toBe(props.videoSource.src);

    const source2 = document.querySelector('source[type="video/webm"]');
    expect(source2).toBeInTheDocument();
    expect(source2.src).toBe(props.videoSourceMulti[1].src);
  });
});
