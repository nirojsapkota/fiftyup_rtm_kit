import React from 'react';
import { render, wait, act, cleanup } from '../../../bootstrap/setup/testSetup';
import { Animate } from '../index';

function runPendingTimer() {
  act(() => {
    jest.runOnlyPendingTimers();
  });
}

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('<Animate />', () => {
  const slidesContents = ['Slide1', 'Slide2', 'Slide3', 'Slide4'];
  const animateDom = (
    <Animate>
      <div style={{ height: '100px', display: 'block' }} data-testid="slide1">
        Slide1
      </div>
      <div style={{ height: '200px', display: 'block' }} data-testid="slide2">
        Slide2
      </div>
      <div style={{ height: '300px', display: 'block' }} data-testid="slide3">
        Slide3
      </div>
      <div style={{ height: '400px', display: 'block' }} data-testid="slide4">
        Slide4
      </div>
    </Animate>
  );

  it('matches expected output', async () => {
    jest.useFakeTimers();

    var event = new Event('resize');
    const { getByText, getByTestId } = await render(animateDom);
    slidesContents.forEach(async slide => {
      await expect(getByText(slide)).toBeInTheDocument();
    });

    runPendingTimer();
    const item = getByTestId('slide2');

    wait(async () => {
      await expect(item.parentElement).toHaveClass('current');
      // Resize window to ensure element width adjusts properly
      await window.dispatchEvent(event);
    });
  });

  it('goes to the next slides', async () => {
    jest.useFakeTimers();
    const currentSlideClassName = 'slide current';

    await render(animateDom);

    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide1');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide1');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide2');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide2');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide3');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide3');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide4');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide4');
    await runPendingTimer();
    await expect(
      document.getElementsByClassName(currentSlideClassName)[0].textContent
    ).toBe('Slide1');
  });

  describe('slider size', () => {
    it('responds to resize event', () => {
      act(() => {
        var event = new Event('resize');

        // Set window size
        window.innerHeight = 200;
        window.innerWidth = 100;

        global.dispatchEvent(event);

        const { container } = render(animateDom);

        wait(async () => {
          await expect(
            container.firstChild.getAttribute('data-windowwidth')
          ).toBe('100');
          await expect(
            container.firstChild.getAttribute('data-windowheight')
          ).toBe('200');
        });

        // Change the window size
        window.innerHeight = 500;
        window.innerWidth = 150;

        // Trigger the window resize event.
        global.dispatchEvent(event);

        wait(async () => {
          await expect(
            container.firstChild.getAttribute('data-windowwidth')
          ).toBe('150');
          await expect(
            container.firstChild.getAttribute('data-windowheight')
          ).toBe('500');
        });
      });
    });
  });
});
