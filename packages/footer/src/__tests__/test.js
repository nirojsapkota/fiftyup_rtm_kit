import React from 'react';
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Footer } from '../index';
import entity from './__fixtures__/entity';
import disclaimers from './__fixtures__/disclaimers';

describe('<Footer />', () => {
  it("doesn't throw an error", () => {
    render(<Footer entity={entity} disclaimers={disclaimers} />);
  });
  it("click Contact Us", () => {
    const { getByText} = render(<Footer entity={entity} disclaimers={disclaimers} />);
    global.zE = { activate: jest.fn() };
    fireEvent.click(getByText(`CONTACT US`));
    expect(global.zE.activate).toHaveBeenCalled();
  });
});
