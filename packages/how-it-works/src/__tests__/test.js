import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { HowItWorks } from '../index';
import { WorkFlow } from '../WorkFlow';
import sampleWorkFlow from '../__fixtures__/sampleWorkFlow.js';
import howItWorksResp from '../__fixtures__/howItWorksResp.js';

describe('<HowItWork />', () => {
  it('matches expected snapshot', () => {
    const howItWorks = howItWorksResp;
    const { queryByText } = render(<HowItWorks {...howItWorks} />);

    expect(queryByText(howItWorks.items[0].title)).toBeInTheDocument();
    expect(queryByText(howItWorks.items[1].title)).toBeInTheDocument();
    expect(queryByText(howItWorks.items[2].title)).toBeInTheDocument();
  });

  it('matches expected output when providing the props', () => {
    const { container, queryByText } = render(
      <HowItWorks
        orientation="vertical"
        header="### How it works"
        subHeader=""
        items={[
          {
            glyph: 'user-help',
            title: 'You join the movement for free',
          },
          {
            glyph: 'balance',
            title: 'We negotiate Group Discounts',
          },
          {
            glyph: 'hands-shake-2',
            title: 'You decide what’s right for you',
          },
        ]}
      />
    );
    expect(container).toContainElement(document.querySelector('h3'));
    expect(queryByText('You join the movement for free')).toBeInTheDocument();
    expect(queryByText('You decide what’s right for you')).toBeInTheDocument();
  });

  it('checks the workFlow matches the expected outcome', () => {
    const workFlow = sampleWorkFlow;
    const { queryByText } = render(<WorkFlow {...workFlow} />);
    expect(queryByText(workFlow.items[0].body)).toBeInTheDocument();
  });
});
