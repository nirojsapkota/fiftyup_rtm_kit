import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { FeatureTile, FeatureRow, GroupedFeatureTiles } from '../index';
import { dummyData } from '../fixtures/dummyData';

describe('<FeatureTile />', () => {
  it('matches expected output', async () => {
    const { getByText, container } = await render(
      <React.Fragment>
        <FeatureTile {...dummyData[0]} />
        <FeatureTile {...dummyData[1]} />
        <FeatureTile {...dummyData[2]} />
      </React.Fragment>
    );

    dummyData.forEach(data => {
      const img = container.querySelector(`img[src="${data.image}"]`);
      expect(img).toBeInTheDocument();
      expect(getByText(data.flagText)).toBeInTheDocument();
      expect(getByText(data.headerText)).toBeInTheDocument();
      expect(getByText(data.descriptionText)).toBeInTheDocument();
      expect(getByText(data.titleText)).toBeInTheDocument();
      expect(getByText(data.ctaText)).toBeInTheDocument();
    });
  });
});

describe('<FeatureRow />', () => {
  it('matches expected output', async () => {
    const data = dummyData[0];
    const { getByText, container } = await render(<FeatureRow {...data} />);
    const img = container.querySelector(`img[src="${data.image}"]`);

    await expect(img).toBeInTheDocument();
    await expect(getByText(data.flagText)).toBeInTheDocument();
    await expect(getByText(data.headerText)).toBeInTheDocument();
    await expect(getByText(data.descriptionText)).toBeInTheDocument();
    await expect(getByText(data.titleText)).toBeInTheDocument();
    await expect(getByText(data.ctaText)).toBeInTheDocument();
  });
});

describe('<GroupedFeatureTiles />', () => {
  it('matches expected output', async () => {
    const { getByText, container } = await render(
      <GroupedFeatureTiles featureTiles={dummyData} />
    );
    dummyData.forEach(data => {
      const img = container.querySelector(`img[src="${data.image}"]`);
      expect(img).toBeInTheDocument();
      expect(getByText(data.flagText)).toBeInTheDocument();
      expect(getByText(data.headerText)).toBeInTheDocument();
      expect(getByText(data.descriptionText)).toBeInTheDocument();
      expect(getByText(data.titleText)).toBeInTheDocument();
      expect(getByText(data.ctaText)).toBeInTheDocument();
    });
  });
});
