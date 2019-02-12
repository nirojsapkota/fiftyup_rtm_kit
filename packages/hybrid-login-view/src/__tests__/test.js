import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HybridLoginView from '../index';

import hybridLoginViewProps from '../__fixtures__/hybridLoginView';

describe('<HybridLoginView />', () => {
  const props = hybridLoginViewProps;
  it('matches expected output', () => {
    const { getByText } = render(<HybridLoginView {...props} />);

    expect(getByText(props.disclaimerProps.disclaimerText)).toBeInTheDocument();
  });

  it('disclaimerText not exist', () => {
    const disclaimerProps = { ...props.disclaimerProps, disclaimerText: '' };
    const updateMockData = { ...props, disclaimerProps };
    const { queryByText } = render(<HybridLoginView {...updateMockData} />);

    expect(
      queryByText(props.disclaimerProps.disclaimerText)
    ).not.toBeInTheDocument();
  });

  it('entity brand ninesaver button icon will not rendered', () => {
    const entity = { ...props.entity, brand: 'ninesaver' };
    const updateMockData = { ...props, entity };
    render(<HybridLoginView {...updateMockData} />);
    // TODO - write a real assertion here due to removing snapshot
  });
});
