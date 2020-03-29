import React from 'react';
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import { VideoDialog } from '../index';
import videoProps from '../__fixtures__/videoResponse.js';

describe('<VideoDialog />', () => {
  describe('with specified dimensions', () => {
    it('triggers iFrame with specified dimensions', async () => {
      const { getByTitle, getByTestId } = render(<VideoDialog {...videoProps} />);
      const title = getByTitle(
        /Christopher Zinn reveals how to avoid winter energy bill shock/
      );
      const container_div = getByTestId('if-container');
      expect(container_div).toBeInTheDocument();
      expect(container_div).toHaveAttribute('width', videoProps.width);
      expect(container_div).toHaveAttribute('height', videoProps.height);
      expect(title).toBeInTheDocument();
      const iframe = document.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toBe(videoProps.videoSrc);
    });
  });

  describe('without specified dimensions', () => {
    it('renders the dialog component without specified dimension', async () => {
      const titleText = "i am a title in the video";
      const props = {
        videoSrc: 'https://www.youtube.com/embed/_NDxJucqwiQ',
        description: titleText
      };

      const { getByTitle } = render(<VideoDialog {...props} />);
      const title = getByTitle(titleText);

      expect(title).toBeInTheDocument();
      const iframe = document.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toBe(props.videoSrc);
    });
  });
});
