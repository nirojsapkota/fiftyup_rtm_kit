import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { HybridLoginView } from '../index';

import hybridLoginViewProps from '../__fixtures__/hybridLoginView';

describe('<HybridLoginView />', () => {
  const props = hybridLoginViewProps;
  it('matches expected output', () => {
    const { queryByText } = render(<HybridLoginView {...props} />);

    expect(
      queryByText(/One Big Switch takes the stress out of getting value on your household bills/i)
    ).toBeInTheDocument();
  });

  it('entity brand ninesaver button icon will not rendered', () => {
    const entity = { ...props.entity, brand: 'ninesaver' };
    const updateMockData = { ...props, entity };
    render(<HybridLoginView {...updateMockData} />);
    // TODO - write a real assertion here due to removing snapshot
  });
});
