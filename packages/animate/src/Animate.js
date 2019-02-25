import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Slider = styled.div`
  overflow: hidden;
  height: auto;
  min-height: 150px;
`;

const SliderWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: auto;
  min-height: ${props => `${props.minHeight + 50}px`};
`;

const Slide = styled.div`
  position: absolute;
  left: -50%;
  width: auto;
  transition: 2s;
  opacity: 0;
  &.current {
    transition: 2s;
    opacity: 1;
    left: 0;
  }
`;

export const Animate = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const secondsDelay = 3000; // 3 seconds

  const clientHeight = () => {
    return document.querySelector('.slide').clientHeight;
  };

  const goToNextSlide = () => {
    // Go back to the inital slide if we've reached the
    // maximum number of slides
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    } else {
      // Increment the current index
      setCurrentIndex(currentIndex + 1);
    }
    // Get the height of the current slide
    setHeightValue(clientHeight());
  };

  useEffect(() => {
    setTimeout(() => goToNextSlide(), secondsDelay);
  });

  return (
    <Slider>
      <SliderWrapper className='slider-wrapper' minHeight={heightValue}>
        {slides.map((item, index) => (
          <Slide
            className={`slide ${index === currentIndex ? `current` : ``}`}
            key={item.id}
          >
            {item.content()}
          </Slide>
        ))}
      </SliderWrapper>
    </Slider>
  );
};

export default Animate;

Animate.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      content: PropTypes.any,
    })
  ),
};
