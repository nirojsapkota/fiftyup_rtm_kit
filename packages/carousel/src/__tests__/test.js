import React from 'react';
// eslint-disable-next-line import/named
import { render, shallow } from '../../../bootstrap/setup/testSetup';
import { Carousel } from '../index';

describe('<Carousel />', () => {
  const props = {
    duration: 4,
    slides: [
      {
        image:
          'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
        altText: 'image1',
        controlColor: '#fff',
      },
      {
        image:
          'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        altText: 'image2',
        controlColor: '#fff',
      },
      {
        image:
          'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80',
        altText: 'image3',
        controlColor: '#fff',
      },
    ],
  };
  it('renders expected images', async () => {
    console.log('>>>>>>>>>>1', typeof Carousel);
    const { getByAltText } = await render(
      <Carousel slides={props.slides} duration={props.duration} />
    );
    const image = getByAltText(props.slides[0].altText);
    expect(image.src).toContain(props.slides[0].image);
    setTimeout(() => {
      const image = getByAltText(props.slides[1].altText);
      expect(image.src).toContain(props.slides[1].image);
    }, props.duration * 1000 + 100);
    setTimeout(() => {
      const image = getByAltText(props.slides[2].altText);
      expect(image.src).toContain(props.slides[2].image);
    }, props.duration * 1000 * 2 + 100);
  });
});
