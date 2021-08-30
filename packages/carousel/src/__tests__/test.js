import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Carousel } from '../index';

describe('<Carousel /> with multiple images', () => {
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
  it('renders expected images and auto cycles with duration', async () => {
    const { container } = await render(
      <Carousel slides={props.slides} duration={props.duration} />
    );
    const firstImage = container.querySelector('img');
    expect(firstImage.src).toContain(props.slides[0].image);
    setTimeout(() => {
      const secondImage = container.querySelector('img');
      expect(secondImage.src).toContain(props.slides[1].image);
    }, props.duration * 1000 + 100);
    setTimeout(() => {
      const thirdImage = container.querySelector('img');
      expect(thirdImage.src).toContain(props.slides[2].image);
    }, props.duration * 1000 * 2 + 100);
  });

  it('switches to next image, on next arrow click', async () => {
    const { container } = await render(
      <Carousel slides={props.slides} duration={props.duration} />
    );

    const nextIcon = container.querySelector(`svg.view-forward`);
    const beforeImage = container.querySelector('img');
    fireEvent.click(nextIcon);
    const afterImage = container.querySelector('img');
    expect(beforeImage.alt).not.toEqual(afterImage.alt);
    expect(beforeImage.src).not.toEqual(afterImage.src);
  });

  it('switches to previous image, on prev arrow click', async () => {
    const { container } = await render(
      <Carousel slides={props.slides} duration={props.duration} />
    );
    const prevIcon = container.querySelector(`svg.view-back`);
    const beforeImage = container.querySelector('img');
    fireEvent.click(prevIcon);
    const afterImage = container.querySelector('img');
    expect(beforeImage.alt).not.toEqual(afterImage.alt);
    expect(beforeImage.src).not.toEqual(afterImage.src);
  });

  it('switches to new image, on nav radio click', async () => {
    const { container } = await render(
      <Carousel slides={props.slides} duration={props.duration} />
    );
    const radioIcon = container.querySelector(`svg.radio`);
    const beforeImage = container.querySelector('img');
    fireEvent.click(radioIcon);
    const afterImage = container.querySelector('img');
    expect(beforeImage.alt).not.toEqual(afterImage.alt);
    expect(beforeImage.src).not.toEqual(afterImage.src);
  });
});

describe('<Carousel /> with single image', () => {
  const props = {
    duration: 4,
    slides: [
      {
        image:
          'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
        altText: 'image1',
        controlColor: '#fff',
      },
    ],
  };
  it("doesn't render controls, only renders image", async () => {
    const { container } = await render(
      <Carousel slides={props.slides} duration={props.duration} />
    );
    const nextIcon = container.querySelector(`svg.view-forward`);
    const prevIcon = container.querySelector(`svg.view-back`);
    const radioIcon = container.querySelector(`svg.radio`);
    const image = container.querySelector('img');

    expect(nextIcon).toBeNull;
    expect(prevIcon).toBeNull;
    expect(radioIcon).toBeNull;
    expect(image).not.toBeNull;
  });
});
