import React from 'react';
import { fireEvent, render } from '../../../bootstrap/setup/testSetup';
import { Footer } from '../index';
import disclaimers from './__fixtures__/disclaimers';
import entity from './__fixtures__/entity';
import ladingPageEntity from './__fixtures__/ladingPageEntity';


describe('<Footer />', () => {
  it("doesn't throw an error", () => {
    render(<Footer entity={entity} disclaimers={disclaimers} />);
  });
  it("click Contact Us", () => {
    const { getByText } = render(<Footer entity={entity} disclaimers={disclaimers} />);
    global.zE = { activate: jest.fn() };
    fireEvent.click(getByText(`CONTACT US`));
    expect(global.zE.activate).toHaveBeenCalled();
  });
});

describe('Testing the landing Page Footer', () => {

  it("Test if it runs well", () => {
    const { queryByText } = render(<Footer landing={true} entity={ladingPageEntity} disclaimers={disclaimers} />);
    expect(queryByText('One Big Switch AFSL 455982')).toBeInTheDocument();
  });
});



