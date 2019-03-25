import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Entity from '../index';

describe('<Entity />', () => {
  it('matches expected output', () => {
    const text = 'Hello, World!';

    const { getByText } = render(<Entity>{text}</Entity>);

    expect(getByText(text)).toBeInTheDocument();
  });
});
