import React from 'react';
import { fireEvent, render } from '../../../bootstrap/setup/testSetup';
import { HybridLoginView } from '../index';
import hybridLoginViewProps from '../__fixtures__/hybridLoginView';

describe('<HybridLoginView />', () => {

  const props = hybridLoginViewProps;

  it('Test the Right side Markdown Content to have header and content', () => {

    const { queryByText, getByText } = render(<HybridLoginView {...props} />);
    expect(getByText('Free Text Heading')).toBeInTheDocument();
    expect(queryByText('Lorem ipsum dolor sit amet, consectetur /n/n adipiscing elit.')).toBeInTheDocument();

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
});
