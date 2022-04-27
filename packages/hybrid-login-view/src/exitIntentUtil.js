/* istanbul ignore file */

import { throttle } from 'throttle-debounce';

/* istanbul ignore next */
export default function ExitIntent(options = {}) {
  const defaultOptions = {
    displayCounter: 0,
    topOnly: false,
    threshold: 20,
    displayTimes: 1,
    delay: 5, // in seconds
    eventThrottleForTopOnly: 50,
    onExitIntent: () => {},
  };

  return (() => {
    const args = { ...defaultOptions, ...options };
    const eventListeners = new Map();

    const addEvent = (eventName, callback) => {
      document.addEventListener(eventName, callback, false);
      eventListeners.set(`document:${eventName}`, { eventName, callback });
    };

    const removeEvent = key => {
      const { eventName, callback } = eventListeners.get(key);
      document.removeEventListener(eventName, callback);
      eventListeners.delete(key);
    };

    const mouseDidMove = event => {
      if (args.displayCounter < args.displayTimes) {
        const shouldShowExitIntentWhenMouseMoved =
          !event.toElement &&
          !event.relatedTarget &&
          event.clientY <= args.threshold;

        if (shouldShowExitIntentWhenMouseMoved) {
          args.onExitIntent();
          if (args.displayCounter >= args.displayTimes) {
            removeEvents();
          }
        }
      }
    };

    const mouseDidLeave = event => {
      const shouldShowExitIntentWhenMouseLeaves =
        !event.toElement &&
        !event.relatedTarget &&
        args.displayCounter < args.displayTimes;

      if (shouldShowExitIntentWhenMouseLeaves) {
        args.onExitIntent();
        if (args.displayCounter >= args.displayTimes) {
          removeEvents();
        }
      }
    };

    const removeEvents = () => {
      eventListeners.forEach((value, key, map) => removeEvent(key));
    };

    setTimeout(() => {
      if (args.topOnly) {
        addEvent(
          'mouseout',
          throttle(args.eventThrottleForTopOnly, mouseDidMove)
        );
      } else {
        addEvent('mouseleave', mouseDidLeave);
      }
    }, args.delay * 1000);

    return removeEvents;
  })();
}
