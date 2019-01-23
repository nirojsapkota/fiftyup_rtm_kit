import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HowItWorks from '../index';
import { howItWorkContent } from '../constants';

describe('<HowItWork />', () => {
  it('matches expected default content for obs', () => {
    const content = howItWorkContent.obs;
    const { getByText, container } = render(<HowItWorks />);
    expect(getByText(content.header)).toBeInTheDocument();
    expect(getByText(content.icons[0].title)).toBeInTheDocument();
    expect(getByText(content.icons[1].title)).toBeInTheDocument();
    expect(getByText(content.icons[2].title)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('matches expected output for entities', () => {
    const entities = ['obs', 'ninesaver', 'fiftyup'];
    entities.forEach(entity => {
      const content = howItWorkContent[entity];
      const { getByText } = render(<HowItWorks entity={entity} />);

      expect(getByText(content.header)).toBeInTheDocument();
      expect(getByText(content.icons[0].title)).toBeInTheDocument();
      expect(getByText(content.icons[1].title)).toBeInTheDocument();
      expect(getByText(content.icons[2].title)).toBeInTheDocument();
    });
  });
});
