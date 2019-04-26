import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import { Dialog } from '../index';
import { Button } from '../../../button';

const triggerFn = jest.fn(open => {
  return <Button onClick={open}>Dialog Trigger</Button>;
});

describe('<Dialog />', () => {
  it('matches expected output', () => {
    const props = {
      renderTrigger: triggerFn,
      // eslint-disable-next-line react/prop-types
      renderContainer: () => {
        return <div>Hello World!</div>;
      },
    };

    const { getByText } = render(<Dialog {...props} />);
    const dialogTrigger = getByText('Dialog Trigger');

    expect(dialogTrigger).toBeInTheDocument();
    expect(triggerFn).toHaveBeenCalledTimes(1);

    fireEvent.click(dialogTrigger);
    expect(getByText('Hello World!')).toBeInTheDocument();

    const closeDialogTrigger = getByText('Close');
    expect(closeDialogTrigger).toBeInTheDocument();

    fireEvent.click(closeDialogTrigger);
    expect(dialogTrigger).toBeInTheDocument();
  });

  it('renders the default trigger', () => {
    const props = {
      // eslint-disable-next-line react/prop-types
      renderContainer: () => {
        return <div>Hello World!</div>;
      },
    };

    const { getByText } = render(<Dialog {...props} />);
    const dialogTrigger = getByText('Show Dialog');

    expect(dialogTrigger).toBeInTheDocument();
  });
});
