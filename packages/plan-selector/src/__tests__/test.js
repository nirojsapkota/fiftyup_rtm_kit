import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import PlanSelector from '../index';

describe('<PlanSelector />', () => {
  it('has unit tests specified', () => {
    expect(true).toEqual(false)
  })

  it('matches expected output', () => {
    const text = 'Hello, World!'

    const { getByText } = render(<PlanSelector>{text}</PlanSelector>);

    expect(getByText(text)).toBeInTheDocument();
  });
})
