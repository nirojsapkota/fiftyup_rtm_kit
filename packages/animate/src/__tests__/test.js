import React from 'react';
import { render, act } from '../../../bootstrap/setup/testSetup';
import Animate from '../index';

function runPendingTimer() {
  act(() => {
    jest.runOnlyPendingTimers();
  });
}

describe('<Animate />', async() => {

  const slides = [
    { id: 0, content: () => (<div id="slide1">Slide1</div>) },
    { id: 1, content: () => (<div id="slide2">Slide2</div>) },
    { id: 2, content: () => (<div id="slide3">Slide3</div>) },
    { id: 3, content: () => (<div id="slide4">Slide4</div>) }
  ]

  it('matches expected output', async() => {
    const { getByText } = await render(<Animate slides={slides} />);
    slides.forEach(async slide => {
      await expect(getByText(slide.content())).toBeInTheDocument();
    })
  });

  it("goes to the next slides", async() => {
    jest.useFakeTimers();
    const currentSlideClassName = 'slide current';

    await render(<Animate slides={slides} />)

    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide1')
    runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide2')
    runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide3')
    runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide4')
    runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide1')
  });

});
