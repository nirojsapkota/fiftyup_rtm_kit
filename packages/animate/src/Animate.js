import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Slider = styled.div`
  height: ${props => `${props.height}px`};
`;

const SliderMask = styled.div`
  height: ${props => `${props.height}px`};
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const SliderWrapper = styled.div`
  display: inline-box;
  height: ${props => `${props.height}px`};
  left: ${props => `${props.currentPosition}px`};
  overflow: hidden;
  position: absolute;
  transition: 2s;
  width: ${props => (props.width === 0 ? `100%` : `${props.width}px`)};
`;

const Slide = styled.div`
  display: block;
  width: ${props => (props.width === 0 ? `auto` : `${props.width}px`)};
`;

export const Animate = ({ children }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [maskWidth, setMaskWidth] = useState(0);
  const [previousMaskWidth, setPreviousMaskWidth] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const secondsDelay = 3000; // 3 seconds

  const clientHeight = () => {
    var maxHeight = 0;
    [...sliderRef.current.querySelectorAll('.slide > *')].forEach(slide => {
      var newHeight = slide.offsetHeight;
      if (newHeight > maxHeight) {
        maxHeight = newHeight;
      }
    });
    return maxHeight + 100;
  };

  const getMaskWidth = () => {
    const mask = sliderRef.current.querySelector('.slider-mask');
    return mask.offsetWidth || 0;
  };

  const SliderWrapperWidth = () => {
    const slides = sliderRef.current.querySelectorAll('.slide > *');
    var total = 0;
    [...slides].forEach(s => {
      total += s.offsetWidth;
    })
    return total;
  };

  const goToNextSlide = () => {
    if (previousMaskWidth != maskWidth) {
      // Go back to the initial slide
      // if the screen has been resized
      setCurrentIndex(0);
      setCurrentPosition(0);
      setMaskWidth(getMaskWidth());
      setPreviousMaskWidth(maskWidth);
    } else if (children && currentIndex === children.length - 1) {
      // Go back to the inital slide if we've reached the
      // maximum number of slides
      setCurrentIndex(0);
      setCurrentPosition(0);
    } else {
      // Increment the current index
      setCurrentIndex(currentIndex + 1);
      setCurrentPosition(currentPosition - maskWidth);
    }
  };

  useEffect(() => {
    setMaskWidth(getMaskWidth());
    setSliderWidth(SliderWrapperWidth());
    setHeightValue(clientHeight());
    setTimeout(() => goToNextSlide(), secondsDelay);
  });

  useEffect(
    () => {
      setHeightValue(clientHeight());
      setCurrentIndex(0);
      setCurrentPosition(0);
    },
    [heightValue]
  );

  return (
    <Slider height={heightValue} ref={sliderRef}>
      <SliderMask className="slider-mask" height={heightValue}>
        <SliderWrapper
          className="slider-wrapper"
          height={heightValue}
          width={sliderWidth}
          currentPosition={currentPosition}
        >
          {children && children.map((child, index) => (
            <Slide
              className={`slide ${index === currentIndex ? `current` : ``}`}
              key={index}
              width={maskWidth}
            >
              {child}
            </Slide>
          ))}
        </SliderWrapper>
      </SliderMask>
    </Slider>
  );
};

export default Animate;

Animate.propTypes = {
  children: PropTypes.node.isRequired,
};
