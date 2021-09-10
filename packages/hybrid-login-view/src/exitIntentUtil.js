import { throttle } from 'throttle-debounce';
import { A } from '../../a/build';

export default function ExitIntent(options = {}) {
  const defaultOptions = {
    displayCounter: 0,
    topOnly: false,
    threshold: 20,
    displayTimes: 1,
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
        if (event.clientY <= args.threshold) {
          // args.displayCounter++
          args.onExitIntent();
          if (args.displayCounter >= args.displayTimes) {
            removeEvents();
          }
        }
      }
    };

    const mouseDidLeave = event => {
      console.log('displayCounter', args.displayCounter);
      if (args.displayCounter < args.displayTimes) {
        // displayCounter++
        args.onExitIntent();
        if (args.displayCounter >= args.displayTimes) {
          removeEvents();
        }
      }
    };

    const removeEvents = () => {
      eventListeners.forEach((value, key, map) => removeEvent(key));
    };

    if (args.topOnly) {
      addEvent(
        'mousemove',
        throttle(args.eventThrottleForTopOnly, mouseDidMove)
      );
    } else {
      addEvent('mouseleave', mouseDidLeave);
    }

    return removeEvents;
  })();
}
