import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { List } from '../index';
import dataProps from '../__fixtures__/sampleApi.js';

describe('<List />', () => {
  const items = [
    {
      icon: 'build',
      size: 70,
      strokePrimary: 'primary',
      strokeSecondary: 'accent',
      fill: 'none',
      body: '1.06 miilion Australians have joined the movement since 2011',
    },
  ];

  it('custom render Item', () => {
    const { getByText } = render(<List {...dataProps}>{items}</List>);
    items.forEach(data => {
      const el = getByText(data.body);
      expect(el).toBeInTheDocument();
      expect(el.tagName).toEqual('DIV');
    });
  });

  it('default render Item', () => {
    const { getByText } = render(<List {...dataProps}>{items}</List>);

    items.forEach(data => {
      expect(getByText(data.body)).toBeInTheDocument();
    });
  });
});
