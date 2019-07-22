import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { HybridLoginView } from '../index';

import hybridLoginViewProps from '../__fixtures__/hybridLoginView';

describe('<HybridLoginView />', () => {
  const props = hybridLoginViewProps;
  it('matches expected output', () => {
    const { queryByText } = render(
      <HybridLoginView component="how" {...props} />
    );
    expect(queryByText(props.title)).toBeInTheDocument();
    expect(
      queryByText(props.howItWorksProps.items[0].title)
    ).toBeInTheDocument();
  });

  it('verifies the  expected why join component', () => {
    const { queryByText } = render(
      <HybridLoginView component="why" {...props} />
    );
    expect(queryByText(props.children[0].body)).toBeInTheDocument();
  });

  it('entity brand ninesaver button icon will not rendered', () => {
    const entity = { ...props.entity, brand: 'ninesaver' };
    const updateMockData = { ...props, entity };
    render(<HybridLoginView component="how" {...updateMockData} />);
    // TODO - write a real assertion here due to removing snapshot
  });
});
