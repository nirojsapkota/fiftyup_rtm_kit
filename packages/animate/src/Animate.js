import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useWindowSize } from '@rtm-ui/layout';

const Slider = styled.div`
  height: ${props => `${props.slideHeight}px`};
`;

const SliderMask = styled.div`
  height: ${props => `${props.slideHeight}px`};
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const SliderWrapper = styled.div`
  display: inline-box;
  transform: ${props => `translateX(${props.currentPosition}px)`};
  overflow: hidden;
  position: absolute;
  transition: transform 2s ease;
`;

const Slide = styled.div`
  display: block;
  width: 100%
  width: ${props =>
    /* istanbul ignore else  */
    props.slideWidth === 0 ? `auto` : `${props.slideWidth}px`};
`;

const Animate = ({ children }) => {
  const sliderRef = useRef(null);
  const middleRef = useRef(null);
  const windowSize = useWindowSize();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heightValue, setHeightValue] = useState(0);
  const [maskWidth, setMaskWidth] = useState(null);
  const secondsDelay = 3000; // 3 seconds

  useEffect(
    () => {
      setMaskWidth(
        sliderRef.current.querySelector('.slider-mask').offsetWidth || 0
      );
      /* istanbul ignore else  */
      if (middleRef.current) {
        setHeightValue(middleRef.current.getBoundingClientRect().height);
      }
    },
    [windowSize.width]
  );

  useEffect(
    () => {
      setTimeout(() => {
        if (children && currentIndex === children.length - 1) {
          // Go back to the inital slide if we've reached the
          // maximum number of slides
          setCurrentIndex(0);
        } else {
          // Increment the current index
          setCurrentIndex(currentIndex + 1);
        }
      }, secondsDelay);
    },
    [currentIndex]
  );

  useEffect(
    () => {
      /* istanbul ignore else  */
      if (middleRef.current) {
        setHeightValue(middleRef.current.getBoundingClientRect().height);
      }
    },
    [
      middleRef.current
        ? middleRef.current.getBoundingClientRect().height
        : middleRef.current,
    ]
  );

  return (
    <Slider
      slideHeight={heightValue}
      ref={sliderRef}
      data-windowwidth={windowSize.width}
      data-windowheight={windowSize.height}
      className="slider-main-container"
    >
      <SliderMask className="slider-mask" slideHeight={heightValue}>
        <SliderWrapper
          className="slider-wrapper"
          currentPosition={currentIndex * maskWidth * -1}
        >
          <div ref={middleRef} style={{ display: 'flex' }}>
            {children &&
              children.map((child, index) => (
                <Slide
                  className={`slide ${index === currentIndex ? `current` : ``}`}
                  key={index}
                  slideWidth={maskWidth}
                >
                  {child}
                </Slide>
              ))}
          </div>
        </SliderWrapper>
      </SliderMask>
    </Slider>
  );
};

export default Animate;

Animate.propTypes = {
  children: PropTypes.node.isRequired,
};
