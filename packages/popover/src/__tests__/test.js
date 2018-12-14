import React from 'react';
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import Popover from '../index';

export const setup = props => (
  <div>
    <div>Outside</div>
    <Popover
      display="block"
      anchor={toggle => (
        <div>
          <button type="submit" onClick={toggle}>
            Hi
          </button>
        </div>
      )}
    >
      {closePopover => (
        <button type="submit" onClick={closePopover}>
          Hello
        </button>
      )}
    </Popover>
  </div>
);

describe('<Popover />', () => {
  it('matches expected output', () => {
    const { getByText, queryByText } = render(
      <Popover
        display="block"
        position="top"
        anchor={toggle => (
          <div>
            <button type="submit" onClick={toggle}>
              Hi
            </button>
          </div>
        )}
      >
        {closePopover => (
          <button type="submit" onClick={closePopover}>
            Hello
          </button>
        )}
      </Popover>
    );

    expect(queryByText('Hello')).toBeNull();
    fireEvent.click(getByText('Hi'));
    expect(getByText('Hello')).toBeInTheDocument();
    fireEvent.click(getByText('Hello'));
    expect(queryByText('Hello')).toBeNull();
  });

  it('matches expected output', () => {
    const { getByText, queryByText } = render(setup());

    expect(queryByText('Hello')).toBeNull();
    fireEvent.click(getByText('Hi'));
    expect(getByText('Hello')).toBeInTheDocument();
    fireEvent.click(getByText('Outside'));
    expect(getByText('Hello')).toBeInTheDocument();
  });
});
