import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Footer } from '../index';
import entity from './__fixtures__/entity';
import disclaimers from './__fixtures__/disclaimers';

describe('<Footer />', () => {
  it("doesn't throw an error", () => {
    render(<Footer entity={entity} disclaimers={disclaimers} />);
  });
});
