import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Hero } from '../index';
import { heroProps } from '../__fixtures__/heroProps';

describe('<Hero />', () => {
  it('matches expected output', () => {
    const { queryByText, getByTestId } = render(<Hero {...heroProps} />);

    expect(queryByText(heroProps.imgText)).toBeInTheDocument();
    expect(queryByText(heroProps.buttonText)).toBeInTheDocument();

    const backgroundNode = getByTestId('hero-background');
    const background = backgroundNode.style['background-image'];
    expect(background).not.toBe(undefined);
    expect(background).toEqual(`url(${heroProps.backgroundImgUrl})`);
  });
});
