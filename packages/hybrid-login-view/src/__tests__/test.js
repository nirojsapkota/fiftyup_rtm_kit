import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import View from '../index';

import { mockData } from '../__mocks__/data';

describe('<View />', () => {
  it('matches expected output', () => {
    const { getByText, container } = render(<View {...mockData} />);

    expect(
      getByText(mockData.disclaimerProps.disclaimerText)
    ).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
