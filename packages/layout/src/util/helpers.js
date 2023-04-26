import { useState, useEffect } from 'react';
import { scroller } from 'react-scroll';

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

/**
 * ScrollTo functionality with added config option.
 *
 * Note: the passed "ref" needs to match the "name" tag for the specific item being scrolled to
 *
 * e.g. `ref = "itemA"` | `<div name="itemA" />`
 *
 * See https://github.com/fisshy/react-scroll for more information on configuration options
 *
 * @param {*} e
 * @param {string} ref
 * @param {{DURATION? : number, smooth?: boolean, offsetY?: number, delay?: number}} config
 *
 *
 */
export function scrollToElementExtended(e, ref, config) {
  if (e) {
    e.preventDefault();
  }
  if (config == undefined) {
    // Prevents expection being throwning in the event of "config" not being supplied
    // Assumes default values in this case.
    config = {};
  }
  // react-scroll
  scroller.scrollTo(ref, {
    duration: config.DURATION || 750,
    smooth: config.smooth || true,
    offset: config.offsetY || -100,
    delay: config.delay || 0,
  });
}

export function scrollToElement(e, ref) {
  if (e) {
    e.preventDefault();
  }
  const anchor = document.querySelector(`[scroll-target='${ref}']`);
  let offset = window.scrollY + anchor.getBoundingClientRect().top; // Y

  window.scrollTo({ left: 0, top: offset - 100, behavior: 'smooth' });
}

export function useElementVisible(elem) {
  const [visible, setVisible] = useState();

  // for inital setup
  useEffect(() => {
    handleScroll();
  });

  function handleScroll() {
    setVisible(elementIsVisible(elem));
  }

  window.addEventListener('scroll', handleScroll);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visible]);

  return visible;
}

/**
 * Check if the element is inside the visible viewport
 * return true/false
 * element passed is a dom element and not an object
 */

/* istanbul ignore next */
function elementIsVisible(element) {
  const elem = document.querySelector(element);
  if (!elem) {
    return 'invalid element';
  }

  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = elem.getBoundingClientRect().top + scroll;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight,
  };

  const bounds = {
    top: boundsTop,
    bottom: boundsTop + elem.clientHeight,
  };

  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  );
}

export function generateAbsoluteUrl(href) {
  if (
    href &&
    (href.indexOf('http://') === 0 || href.indexOf('https://') === 0)
  ) {
    // do nothing
    return href;
  } else if (href && href.indexOf('www.') === 0) {
    return `//${href}`;
  } else {
    return href;
  }
}
