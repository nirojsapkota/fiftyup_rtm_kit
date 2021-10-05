import React from 'react';
import { render, cleanup } from '../../../bootstrap/setup/testSetup';
import { MultiList } from '../index';
import sampleData from '../__fixtures__/sampleResponse.js';

afterEach(cleanup);

describe('<MultiList />', () => {
  it('matches expected output', () => {
    const props = sampleData;
    const { getByText } = render(<MultiList {...props} />);
    expect(getByText(props.items[0].body)).toBeInTheDocument();
  });
});
