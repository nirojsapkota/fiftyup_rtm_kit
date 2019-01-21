import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HowItWorks from '../index';
import howItWorksProps from '../__fixtures__/howItWorks';

describe('<HowItWork />', () => {
  it('matches expected output for entities', () => {
    const entities = ['obs', 'ninesaver', 'fuc'];
    entities.forEach(entity => {
      const content = howItWorksProps[entity];
      const { getByText, container } = render(<HowItWorks entity={entity} />);

      expect(getByText(content.header)).toBeInTheDocument();
      expect(getByText(content.icons[0].title)).toBeInTheDocument();
      expect(getByText(content.icons[1].title)).toBeInTheDocument();
      expect(getByText(content.icons[2].title)).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  it('render default content for obs when props is null', () => {
    const content = howItWorksProps.obs;
    const { getByText } = render(<HowItWorks />);
    expect(getByText(content.header)).toBeInTheDocument();
    expect(getByText(content.icons[0].title)).toBeInTheDocument();
    expect(getByText(content.icons[1].title)).toBeInTheDocument();
    expect(getByText(content.icons[2].title)).toBeInTheDocument();
  });
});
