import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import energyPlanProps from '../__fixtures__/energyPlans';
import { Plan } from '../index';

describe('<EnergyPlan />', () => {
  describe('with markdown as the feature renderer', () => {
    it('gets parsed in to valid html', () => {
      const { getByText } = render(<Plan {...energyPlanProps} />);
    });
  });
});
