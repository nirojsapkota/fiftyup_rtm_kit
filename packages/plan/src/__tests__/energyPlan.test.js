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

    it('renders the multiple header images when multi_image_file_urls is passed', () => {
      const { getAllByAltText } = render(<Plan {...energyPlanProps} />);
      const planImages = getAllByAltText('Main Header Text')
      expect(planImages).toHaveLength(4)
    });

    it('renders the single header image when multi_image_file_urls is not passed', () => {
      energyPlanProps.plan.multi_image_file_urls = []
      const { getAllByAltText } = render(<Plan {...energyPlanProps} />);
      const planImages = getAllByAltText('Main Header Text')
      expect(planImages).toHaveLength(2)
    });
  });
});
