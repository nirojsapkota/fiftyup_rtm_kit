import React, { useState, useEffect } from 'react';
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
  opacity: 0;
  transition-duration: 1s ease;
  ${props =>
    props.isActive &&
    css`
      opacity: 1;
      transition-duration: 1s;
      transform: scale(1.08);
    `}
  ${props => !props.isActive && css``}
`;

const Image = styled('img')`
  // flex-shrink: 0;
  // min-width: 100%;
  width: 100%;
  height: auto;
  margin: auto;
`;

const PrevPane = styled(Pane)`
  position: absolute;
  left: 0.1px;
  z-index: 10;
`;

const PrevIcon = styled(Icon)`
  height: 100%;
`;

const NextPane = styled(Pane)`
  position: absolute;
  right: 0.1px;
  z-index: 10;
`;

const NextIcon = styled(Icon)`
  height: 100%;
`;

const NavBox = styled(Box)`
  display: flex;
  position: absolute;
  bottom: 10px;
`;

const NavItemPane = styled(Pane)`
  padding: 2px;
`;

export const Carousel = ({ slides, duration }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

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
            <PrevIcon
              glyph="view-back"
              fill={slides[current].controlsColor}
              size={45}
            />
          </PrevPane>
          <NextPane onClick={nextSlide}>
            <Icon
              glyph="view-forward"
              fill={slides[current].controlsColor}
              size={45}
            />
          </NextPane>
        </>
      )}
      {slides.map((slide, index) => {
        return (
          <ImageWrapper key={index} isActive={index === current}>
            {index === current && (
              <Image src={slide.image} alt={slide.altText} />
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
                    fill={slide.controlsColor}
                    size={15}
                  />
                </NavItemPane>
              );
            } else {
              return (
                <NavItemPane onClick={() => goToSlide(index)}>
                  <Icon glyph="radio" fill={slide.controlsColor} size={15} />
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
