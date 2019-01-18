import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HowItWork from '../index';
import { mockData } from '../__mocks__/data';

describe('<HowItWork />', () => {
  it('matches expected output for entities', () => {
    const entities = ['obs', 'ninesaver', 'fuc'];
    entities.forEach(entity => {
      const content = mockData[entity];
      const { getByText, container } = render(<HowItWork entity={entity} />);

      expect(getByText(content.header)).toBeInTheDocument();
      expect(getByText(content.icons[0].title)).toBeInTheDocument();
      expect(getByText(content.icons[1].title)).toBeInTheDocument();
      expect(getByText(content.icons[2].title)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });
});
