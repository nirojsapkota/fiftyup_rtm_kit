import React from 'react';
import { fireEvent, render } from '../../../bootstrap/setup/testSetup';
import { HybridLoginView } from '../index';
import hybridLoginViewProps from '../__fixtures__/hybridLoginView';

describe('<HybridLoginView />', () => {

  const props = hybridLoginViewProps;

  it('Test the Right side Markdown Content to have header and content', () => {

    const { queryByText, getByText, container } = render(<HybridLoginView {...props} />);
    expect(getByText('Free Text Heading')).toBeInTheDocument();
    expect(getByText('I am a main heading')).toBeInTheDocument();
    expect(queryByText('Lorem ipsum dolor sit amet, consectetur /n/n adipiscing elit.')).toBeInTheDocument();
    expect(container.querySelector(`iframe`)).toBeInTheDocument();
    expect(queryByText("I am main content")).toBeInTheDocument();

  });

  it('renders the accordion if given', () => {
    let accordionHeaderText = 'Accordion Header 1';
    let accordionContentText = 'Accordion content 1';

    const { queryByText } = render(
      <HybridLoginView {...props} />
    );

    expect(queryByText(accordionHeaderText)).toBeInTheDocument();
    fireEvent.click(queryByText(accordionHeaderText));
    expect(queryByText(accordionContentText)).toBeInTheDocument();
  });

  it('does not render as seen on image if not given', () => {
    const { container, queryByText } = render(
      <HybridLoginView {...props} asSeenOnImage="" mainHeading=""/>
    );
    const imageTag = container.querySelector(`[alt="As Seen On"]`);
    expect(imageTag).not.toBeInTheDocument();
    expect(queryByText("I am a main heading")).not.toBeInTheDocument();
  })

  it("does not render main content if not given", () => {
    const { queryByText } = render(
      <HybridLoginView {...props} mainContent=""/>
    );
    expect(queryByText("I am main content")).not.toBeInTheDocument();
  })

  it("does not render video if not given", () => {
    render(
      <HybridLoginView {...props} videoSrc=""/>
    );
    const iframe = document.querySelector('iframe[src="https://www.youtube.com/embed/_NDxJucqwiQ1"]');
    expect(iframe).not.toBeInTheDocument();
  })

  it("does not render video, main Content, and hero image if not given", () => {
    const { container, queryByText } = render(
      <HybridLoginView {...props} heroImageUrl="" mainContent="" videoSrc=""/>
    );
    expect(queryByText("I am main content")).not.toBeInTheDocument();

    const iframe = document.querySelector('iframe[src="https://www.youtube.com/embed/_NDxJucqwiQ1"]');
    expect(iframe).not.toBeInTheDocument();

    const HeroImageTag = container.querySelector(`[alt="Hero image"]`);
    expect(HeroImageTag).not.toBeInTheDocument();
  })
});
