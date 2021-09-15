import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@rtm-ui/icon';
import styled, { css } from 'styled-components';
import { Box, Pane } from '@rtm-ui/layout';
import t from 'prop-types';

const SliderBox = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ImageWrapper = styled('div')`
  opacity: 0.5;
  transition-duration: 1s ease-in-out;
  ${props =>
    props.isActive &&
    css`
      opacity: 1;
      transition-duration: 2s;
      transform: scale(1.02);
    `}
  ${props => !props.isActive && css``};
  min-height: ${props => `${props.imgHeight}px`};
`;

const ImageElement = styled('img')`
  width: 100%;
  margin: auto;
`;

const PrevPane = styled(Pane)`
  height: 100%;
  position: absolute;
  left: 0.1px;
  z-index: 10;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NextPane = styled(Pane)`
  height: 100%;
  position: absolute;
  right: 0.1px;
  z-index: 10;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const NavBox = styled(Box)`
  display: flex;
  position: absolute;
  bottom: 10px;
`;

const NavItemPane = styled(Pane)`
  padding: 2px;
  cursor: pointer;
`;

export const Carousel = ({ slides, duration }) => {
  const [current, setCurrent] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const length = slides.length;

  const ref = useRef(null);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = slide => {
    setCurrent(slide);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  useEffect(() => {
    const img = new Image();
    /* istanbul ignore next */
    img.onload = function() {
      const maxWidth = ref.current ? ref.current.offsetWidth : 0;
      setImgHeight((maxWidth / this.width) * this.height);
    };
    img.src = slides[current].image;

    if (duration > 0 && length > 1) {
      let interval = null;
      interval = setInterval(() => {
        nextSlide();
      }, duration * 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [current]);

  return (
    <SliderBox>
      {length > 1 && (
        <>
          <PrevPane onClick={prevSlide}>
            <div>
              <Icon
                glyph="view-back"
                fill={slides[current].controlsColor}
                size={45}
              />
            </div>
          </PrevPane>
          <NextPane onClick={nextSlide}>
            <div>
              <Icon
                glyph="view-forward"
                fill={slides[current].controlsColor}
                size={45}
              />
            </div>
          </NextPane>
        </>
      )}
      {slides.map((slide, index) => {
        return (
          <ImageWrapper
            key={index}
            isActive={index === current}
            imgHeight={imgHeight}
          >
            {index === current && (
              <ImageElement ref={ref} src={slide.image} alt={slide.altText} />
            )}
          </ImageWrapper>
        );
      })}
      {length > 1 && (
        <NavBox>
          {slides.map((slide, index) => {
            if (index === current) {
              return (
                <NavItemPane>
                  <Icon
                    glyph="radio-active"
                    fill={slides[current].controlsColor}
                    size={15}
                  />
                </NavItemPane>
              );
            } else {
              return (
                <NavItemPane onClick={() => goToSlide(index)}>
                  <Icon
                    glyph="radio"
                    fill={slides[current].controlsColor}
                    size={15}
                  />
                </NavItemPane>
              );
            }
          })}
        </NavBox>
      )}
    </SliderBox>
  );
};

Carousel.propTypes = {
  slides: t.arrayOf(t.shape({})),
  duration: t.number,
};
