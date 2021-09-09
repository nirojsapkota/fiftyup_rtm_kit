import React from 'react';
import { render, cleanup } from '../../../bootstrap/setup/testSetup';
import { Img, ResponsiveImage } from '../index';
import sampleResp from '../__fixtures__/sampleImgResp';

afterEach(cleanup);

const setup = () => {
  const { container } = render(
    <Img
      title="Title for the image"
      src="test_image.jpg"
      alt="Alt text for the image"
    />
  );

  return container;
};

describe(`<Img />`, () => {
  it(`should have correct src, title and alt attributes`, () => {
    const imageTag = setup().querySelector(`img`);
    expect(imageTag.getAttribute(`src`)).toEqual(`test_image.jpg`);
    expect(imageTag.getAttribute(`title`)).toEqual(`Title for the image`);
    expect(imageTag.getAttribute(`alt`)).toEqual(`Alt text for the image`);
  });
});

describe(`<ResponsiveImage />`, () => {
  const imageProps = sampleResp;
  it('should resize the image with various breakpoints', () => {
    const { container } = render(<ResponsiveImage {...imageProps} />);
    const props = container.querySelector(`img`);
    const resizeWindow = x => {
      window.innerWidth = x;
      window.dispatchEvent(new Event('resize'));
    };
    resizeWindow(500);
    expect(props.getAttribute(`src`)).toEqual(imageProps.mobileImgView);

    resizeWindow(800);
    expect(props.getAttribute(`src`)).toEqual(imageProps.tabletImgView);

    resizeWindow(2880);
    expect(props.getAttribute(`src`)).toEqual(imageProps.desktopImgView);
  });
});
