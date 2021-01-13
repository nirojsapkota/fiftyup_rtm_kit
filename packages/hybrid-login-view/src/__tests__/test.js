import React from 'react';
import { fireEvent, render } from '../../../bootstrap/setup/testSetup';
import { HybridLoginView } from '../index';
import hybridLoginViewProps from '../__fixtures__/hybridLoginView';

describe('<HybridLoginView />', () => {
  const props = hybridLoginViewProps;

  it('Test the Offer Content section to have header and content', () => {
    const { queryByText, getByText, container } = render(
      <HybridLoginView {...props} />
    );
    expect(getByText('Free Text Heading')).toBeInTheDocument();
    expect(
      queryByText(
        'Lorem ipsum dolor sit amet, consectetur /n/n adipiscing elit.'
      )
    ).toBeInTheDocument();
    expect(container.querySelector(`iframe`)).toBeInTheDocument();
    expect(queryByText('I am main content')).toBeInTheDocument();
  });

  it('renders the accordion if given', () => {
    let accordionHeaderText = 'Accordion Header 1';
    let accordionContentText = 'Accordion content 1';

    const { queryByText } = render(<HybridLoginView {...props} />);

    expect(queryByText(accordionHeaderText)).toBeInTheDocument();
    fireEvent.click(queryByText(accordionHeaderText));
    expect(queryByText(accordionContentText)).toBeInTheDocument();
  });

  it('does not render as seen on image if not given', () => {
    const { container, queryByText } = render(
      <HybridLoginView {...props} asSeenOnImage="" mainHeading="" />
    );
    const imageTag = container.querySelector(`[alt="As Seen On"]`);
    expect(imageTag).not.toBeInTheDocument();
    expect(queryByText('I am a main heading')).not.toBeInTheDocument();
  });

  it('renders workflow if workflow.items length is greater than 1 and header is null', async () => {
    const testworkflow = {
      workflow: {
        header: '',
        items: [
          {
            type: 'image',
            src: 'https://placehold.it/1080x250',
            content: 'https://placehold.it/1080x250',
          },
        ],
      },
    };
    const newprops = { ...props, ...testworkflow };
    const { getByTestId } = render(<HybridLoginView {...newprops} />);
    expect(getByTestId('mediaContent')).toBeInTheDocument();
  });

  it('does not render main content if not given', () => {
    const { queryByText } = render(
      <HybridLoginView {...props} mainContent="" />
    );
    expect(queryByText('I am main content')).not.toBeInTheDocument();
  });

  it('does not render video if not given', () => {
    render(<HybridLoginView {...props} videoSrc="" />);
    const iframe = document.querySelector(
      'iframe[src="https://www.youtube.com/embed/_NDxJucqwiQ1"]'
    );
    expect(iframe).not.toBeInTheDocument();
  });

  it('does not render video, main Content, and hero image if not given', () => {
    const { container, queryByText } = render(
      <HybridLoginView
        {...props}
        heroImageUrlMobileUrl=""
        heroImageUrlDesktopUrl=""
        mainContent=""
        videoSrc=""
      />
    );
    expect(queryByText('I am main content')).not.toBeInTheDocument();

    const iframe = document.querySelector(
      'iframe[src="https://www.youtube.com/embed/_NDxJucqwiQ1"]'
    );
    expect(iframe).not.toBeInTheDocument();

    const HeroImageTag = container.querySelector(`[alt="Hero image"]`);
    expect(HeroImageTag).not.toBeInTheDocument();
  });

  it.skip('scrolls the window to login box upon clicking the floating button', async () => {
    window.scrollTo = jest.fn();
    /**
     * Apparently couldn't add the the test case for displaying the floating button for smaller device
     * as JsDom doesn't do any rendering, and getBoundingClientRect() always returns 0,0,0,0 for the helper method to identify the element within the viewport
     * https://github.com/jsdom/jsdom/issues/1590#issuecomment-243228840
     */
    const spy = jest.spyOn(window, 'scrollTo');
    const { getByTestId } = render(
      <HybridLoginView {...props} heroImageUrl="" mainContent="" videoSrc="" />
    );
    const floatingButton = getByTestId('floating-signup-btn');
    fireEvent.click(floatingButton);
    expect(spy).toHaveBeenCalled();
  });

  it(`scrolls to login panel when content image is clicked`, async () => {
    window.scrollTo = jest.fn();
    const spy = jest.spyOn(window, 'scrollTo');
    const { getByTestId } = render(
      <HybridLoginView {...props} heroImageUrl="" mainContent="" videoSrc="" />
    );
    const contentImg = getByTestId('main-content');
    fireEvent.click(contentImg);
    expect(spy).toHaveBeenCalled();
  })

});
