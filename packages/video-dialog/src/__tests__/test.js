import React from 'react';
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import { VideoDialog } from '../index';
import videoProps from '../__fixtures__/videoResponse.js';

describe('<VideoDialog />', () => {
  describe('with specified dimensions', () => {
    it('triggers iFrame with specified dimensions', async () => {
      const { getByText } = render(<VideoDialog {...videoProps} />);

      const dialogTrigger = getByText(
        /Christopher Zinn reveals how to avoid winter energy bill shock/
      );
      expect(dialogTrigger).toBeInTheDocument();
      fireEvent.click(dialogTrigger);

      const iframe = document.querySelector('iframe');

      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toBe(
        `https://www.youtube.com/embed/${videoProps.embedCode}`
      );
      expect(iframe.width).toBe(videoProps.width);
      expect(iframe.height).toBe(videoProps.height);
    });
  });

  describe('without specified dimensions', () => {
    it('renders the dialog component without specified dimension', async () => {
      const props = {
        embedCode: '_NDxJucqwiQ',
        description:
          ' Christopher Zinn reveals how to avoid winter energy bill shock',
      };

      const { getByText } = render(<VideoDialog {...props} />);
      const dialogTrigger = getByText(
        /Christopher Zinn reveals how to avoid winter energy bill shock/
      );

      expect(dialogTrigger).toBeInTheDocument();
      fireEvent.click(dialogTrigger);

      const iframe = document.querySelector('iframe');
      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toBe(
        `https://www.youtube.com/embed/${props.embedCode}`
      );
    });
  });
});
