import React from 'react';
import { render, act } from '../../../bootstrap/setup/testSetup';
import Animate from '../index';

function runPendingTimer() {
  act(() => {
    jest.runOnlyPendingTimers();
  });
}

describe('<Animate />', async() => {
  const slidesContents = ['Slide1', 'Slide2', 'Slide3', 'Slide4'];
  const animateDom = (
    <Animate>
      <div style={{height: "100px", display: "block"}} data-testid="slide1">Slide1</div>
      <div style={{height: "200px", display: "block"}} data-testid="slide2">Slide2</div>
      <div style={{height: "300px", display: "block"}} data-testid="slide3">Slide3</div>
      <div style={{height: "400px", display: "block"}} data-testid="slide4">Slide4</div>
    </Animate>
  );

  it('matches expected output', async() => {
    const { getByText, container } = await render(animateDom);
    slidesContents.forEach(async slide => { await expect(getByText(slide)).toBeInTheDocument();})
    expect(container).toMatchSnapshot();
  });

  it("goes to the next slides", async() => {
    jest.useFakeTimers();
    const currentSlideClassName = 'slide current';

    await render(animateDom);

    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide1')
    await runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide2')
    await runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide3')
    await runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide4')
    await runPendingTimer()
    await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide1')
  });

  describe("slider size", async() => {
    jest.spyOn(document, "querySelectorAll").mockImplementation(query => {
      const element = document.querySelector(query);

      if (query != '.slide > *') {
        return [element];
      } else {
        Object.defineProperties(element, {
          "offsetWidth": {
            writable: true,
            value: 100
          },
          "offsetHeight": {
            writable: true,
            value: 500
          }
        });
        return [element];
      }
    });

    it("has the correct size", async() => {
      jest.useFakeTimers();

      const { container } = await render(animateDom);

      await runPendingTimer();
      await expect((container.firstChild).toHaveAttribute('height')).toBe(600)
      //await expect(.querySelector('.slider-mask').getAttribute('height')).toBe("500")
    })

    it("responds to resize event", async() => {
      jest.useFakeTimers();
      const currentSlideClassName = 'slide current';

      const { container } = await render(animateDom);

      await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide1')

      jest.spyOn(document, "querySelector").mockImplementation(query => {
        return {offsetWidth: 120}
      })

      await runPendingTimer();
      await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide2')
      await runPendingTimer();
      await expect(document.getElementsByClassName(currentSlideClassName)[0].textContent).toBe('Slide1')
    })
  })
});
