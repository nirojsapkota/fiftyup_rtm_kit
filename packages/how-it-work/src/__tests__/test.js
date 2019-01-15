import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import HowItWork from '../index';
import { mockData } from '../__mocks__/data';

describe('<HowItWork />', () => {
  it('matches expected output', () => {
    const props = mockData;

    const { getByText, getByAltText, container } = render(
      <HowItWork {...props} />
    );

    expect(getByText(props.header)).toBeInTheDocument();

    const firstStepEl = getByText(props.stepOffers[0].title);
    expect(firstStepEl).toBeInTheDocument();
    expect(
      getByAltText(props.stepOffers[0].title).tagName.toLowerCase()
    ).toEqual('img');

    const secondStepEl = getByText(props.stepOffers[0].title);
    expect(secondStepEl).toBeInTheDocument();
    expect(
      getByAltText(props.stepOffers[1].title).tagName.toLowerCase()
    ).toEqual('img');

    const third = getByText(props.stepOffers[0].title);
    expect(third).toBeInTheDocument();
    expect(
      getByAltText(props.stepOffers[2].title).tagName.toLowerCase()
    ).toEqual('img');

    expect(container).toMatchSnapshot();
  });
});
