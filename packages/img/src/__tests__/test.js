import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Img from '../index';

const setup = () => {
  const { container } = render(
    <Img
      backgroundColor
      title="Title for the image"
      src="test_image.jpg"
      alt="Alt text for the image"
    />
  );

  return container;
};

describe(`<Img />`, () => {
  it(`should render the image size images`, () => {
    const component = setup();
    expect(component).toMatchSnapshot();
  });

  it(`should have correct src, title and alt attributes`, () => {
    const imageTag = setup().querySelector(`img`);
    expect(imageTag.getAttribute(`src`)).toEqual(`test_image.jpg`);
    expect(imageTag.getAttribute(`title`)).toEqual(`Title for the image`);
    expect(imageTag.getAttribute(`alt`)).toEqual(`Alt text for the image`);
  });
});
