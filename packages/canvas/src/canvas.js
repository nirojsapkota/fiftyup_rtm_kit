import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Canvas = props => {
  const {draw, test, children, ...rest} = props;
  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    if(draw) {
      const render = () => {
        frameCount++
        draw(context, frameCount)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return (
    <canvas ref={canvasRef} {...rest}>{children}</canvas>
  );
};

Canvas.propTypes = {
  children: PropTypes.node
};


export default Canvas;