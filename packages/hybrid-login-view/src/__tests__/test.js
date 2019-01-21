import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HybridLoginView from '../index';

import hybridLoginViewProps from '../__fixtures__/hybridLoginView';

describe('<HybridLoginView />', () => {
  const props = hybridLoginViewProps;
  it('matches expected output', () => {
    const { getByText, container } = render(<HybridLoginView {...props} />);

    expect(getByText(props.disclaimerProps.disclaimerText)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('matches expected output', () => {
    const disclaimerProps = { ...props.disclaimerProps, disclaimerText: '' };
    const updateMockData = { ...props, disclaimerProps };
    const { queryByText } = render(<HybridLoginView {...updateMockData} />);

    expect(
      queryByText(props.disclaimerProps.disclaimerText)
    ).not.toBeInTheDocument();
  });
});
