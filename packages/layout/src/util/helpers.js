export const WindowSize = () => {
  var size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener('resize', () => {
    size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    return size;
  });

  return size;
};
