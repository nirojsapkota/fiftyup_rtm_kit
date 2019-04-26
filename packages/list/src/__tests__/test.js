import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { List } from '../index';

describe('<List />', () => {
  const dataList = [
    {
      icon: 'double-check',
      body:
        '28% discount off Origin’s Electricity usage charges for 12 months if you pay your bills on time.*',
    },
    {
      icon: 'double-check',
      body:
        '32% discount off Origin’s Natural gas usage charges for 12 months if you pay your bills on time.*',
    },
    {
      icon: 'double-check',
      body:
        'A Solar Feed-in Tariff of 9c per kWh exported (on top of any Govt Feed-in you receive).',
    },
  ];

  it('custom render Item', () => {
    const { getByText } = render(
      <List renderItem={body => <a>{body}</a>}>{dataList}</List>
    );

    dataList.forEach(data => {
      const el = getByText(data.body);
      expect(el).toBeInTheDocument();
      expect(el.tagName).toEqual('A');
    });
  });

  it('default render Item', () => {
    const { getByText } = render(<List>{dataList}</List>);

    dataList.forEach(data => {
      expect(getByText(data.body)).toBeInTheDocument();
    });
  });
});
