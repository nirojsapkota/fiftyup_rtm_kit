import React from 'react';
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import FeatureTile, { FeatureTileGroup } from '../index';
import { dummyData } from '../../dummyData'

describe('<FeatureTile />', () => {
  Object.defineProperty(window.location, 'assign', {
    configurable: true,
  });
  window.location.assign = jest.fn();

  it('matches expected output', async() => {
    const { getByText, container } = await render(
      <FeatureTileGroup width={[1, 1, 1/3]}>
        <FeatureTile {...dummyData[0]} />
        <FeatureTile {...dummyData[1]} />
        <FeatureTile {...dummyData[2]} />
      </FeatureTileGroup>
    );

    dummyData.forEach(data => {
      const img = container.querySelector(`img[src="${data.image}"]`)
      expect(img).toBeInTheDocument();
      expect(getByText(data.flagText)).toBeInTheDocument();
      expect(getByText(data.headerText)).toBeInTheDocument();
      expect(getByText(data.descriptionText)).toBeInTheDocument();
      expect(getByText(data.focalText)).toBeInTheDocument();
      expect(getByText(data.ctaText)).toBeInTheDocument();
      fireEvent.click(getByText(data.ctaText));
      expect(window.location.assign).toHaveBeenCalled();
    })
  });
})
