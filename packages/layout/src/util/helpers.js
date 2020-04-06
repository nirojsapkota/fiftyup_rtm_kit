import { useState, useEffect } from 'react';

function getSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  window.addEventListener('resize', handleResize);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize]);

  return windowSize;
}

export function scrollToElement(e, ref) {
  e.preventDefault();
  const anchor = document.querySelector(`[scroll-target='${ref}']`)
  window.scrollTo({ top: anchor.offsetTop - 100, behavior: 'smooth' })
}
