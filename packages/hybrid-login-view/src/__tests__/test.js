import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HybridLoginView from '../index';

import { mockData } from '../__mocks__/data';

describe('<HybridLoginView />', () => {
  it('matches expected output', () => {
    const { getByText, container } = render(<HybridLoginView {...mockData} />);

    expect(
      getByText(mockData.disclaimerProps.disclaimerText)
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('matches expected output', () => {
    const disclaimerProps = { ...mockData.disclaimerProps, disclaimerText: '' };
    const updateMockData = { ...mockData, disclaimerProps };
    const { queryByText } = render(<HybridLoginView {...updateMockData} />);

    expect(
      queryByText(mockData.disclaimerProps.disclaimerText)
    ).not.toBeInTheDocument();
  });
});
