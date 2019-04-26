import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Dashboard } from '../index';
import { dummyData } from '../fixtures/dummyData';

describe('<Dashboard />', () => {
  it('matches expected output', () => {
    const { getByText, container } = render(<Dashboard {...dummyData} />);

    // Dashboard banner
    expect(getByText(dummyData.dashboardBanner.content)).toBeInTheDocument();

    // Feature Tiles
    dummyData.campaigns.forEach(tile => {
      const img = container.querySelector(`img[src="${tile.image}"]`);
      expect(img).toBeInTheDocument();
      expect(getByText(tile.headerText)).toBeInTheDocument();
      expect(getByText(tile.descriptionText)).toBeInTheDocument();
      expect(getByText(tile.flagText)).toBeInTheDocument();
      expect(getByText(tile.ctaText)).toBeInTheDocument();
      expect(getByText(tile.titleText)).toBeInTheDocument();
    });
  });
});
