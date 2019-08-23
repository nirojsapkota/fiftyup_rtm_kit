import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Hero, HomePageHero } from '../index';
import { heroProps } from '../__fixtures__/heroProps'; // Existing Hero Component
import { auProps } from '../__fixtures__/auProps';
import { usProps } from '../__fixtures__/usProps';
import { euProps } from '../__fixtures__/euProps';

describe('<Hero />', () => {
  it('matches the expected hero props for AU', () => {
    const { container } = render(<Hero {...auProps} />);
    expect(container).toContainElement(document.querySelector('h3'));
    const props = container.querySelector(`img`);
    expect(props.getAttribute(`src`)).toEqual(auProps.backgroundImage);
  });

  it('matches the expected props for US', () => {
    const { container } = render(<Hero {...usProps} />);
    expect(container).toContainElement(document.querySelector('h3'));
    const props = container.querySelector(`img`);
    expect(props.getAttribute(`src`)).toEqual(usProps.backgroundImage);
  });

  it('matches the expected props for EU', () => {
    const { container } = render(<Hero {...euProps} />);
    expect(container).toContainElement(document.querySelector('h1'));
    const props = container.querySelector(`img`);
    expect(props.getAttribute(`src`)).toEqual(euProps.backgroundImage);
  });
});

describe('<Hero />', () => {
  it('Existing Hero component matches expected outcome', () => {
    const { queryByText, getByTestId } = render(
      <HomePageHero {...heroProps} />
    );
    expect(queryByText(heroProps.imgText)).toBeInTheDocument();
    expect(queryByText(heroProps.buttonText)).toBeInTheDocument();
    const backgroundNode = getByTestId('hero-background');
    const background = backgroundNode.style['background-image'];
    expect(background).not.toBe(undefined);
    expect(background).toEqual(`url(${heroProps.backgroundImgUrl})`);
  });
});
