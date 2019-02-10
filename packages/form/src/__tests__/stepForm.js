import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import StepForm from '../stepForm';

class HandlerError extends Error {
  constructor(object, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HandlerError);
    }

    this.object = object;
  }
}

beforeAll(() => {
  spyOn(global, 'scrollTo');
});

afterEach(() => {
  jest.clearAllMocks();
});

const onSubmit = jest.fn(values => new Promise(resolve => resolve(values)));

export const inputs = {
  steps: [
    {
      id: 'first',
      onSubmit,
      fields: [
        {
          label: 'First Name:',
          error: 'Name must be at least 6 characters',
          name: 'first_name',
          validator: 'required',
          initialValue: '',
        },
      ],
    },
    {
      id: 'last',
      fields: [
        {
          label: 'Last Name:',
          error: 'Name must be at least 6 characters',
          name: 'last_name',
          validator: 'required',
          initialValue: '',
        },
      ],
    },
    {
      id: 'step-with-no-handler',
      fields: [
        {
          label: 'Zipcode',
          name: 'zipcode',
          validator: 'required',
        },
      ],
    },
    {
      id: 'email',
      fields: [
        {
          label: 'Email',
          error: 'Must be a valid email',
          name: 'email',
          validator: 'required',
        },
      ],
    },
    {
      id: 'random',
      onSubmit: async () => {
        throw new HandlerError({ random: 'Meh' });
      },
      fields: [
        {
          label: 'Random',
          error: 'Some random error',
          name: 'random',
          validator: 'required',
        },
      ],
    },
  ],
};
// We are providing all field values on render
// since testing of fields is done elsewhere
describe('<Form />', () => {
  describe('with valid fields', () => {
    it('calls the onSubmit handler', async () => {
      const { getByTestId, getByLabelText } = render(<StepForm {...inputs} />);

      const firstName = getByLabelText(/first name/i);
      fireEvent.change(firstName, {
        target: { value: 'John' },
      });
      const firstSubmit = getByTestId('form-first-submit');
      fireEvent.click(firstSubmit);

      await wait(() => {
        const lastName = getByLabelText(/last name/i);
        fireEvent.change(lastName, {
          target: { value: 'Doe' },
        });
        const secondSubmit = getByTestId('form-last-submit');
        fireEvent.click(secondSubmit);
      });

      await wait(() => {
        const randomField = getByLabelText(/random/i);
        fireEvent.change(randomField, {
          target: { value: 'Something random' },
        });
        const thirdSubmit = getByTestId('form-random-submit');
        fireEvent.click(thirdSubmit);
      });

      await wait(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });

  it("doesn't allow invalid inputs", async () => {
    const { getByLabelText, getByText } = render(<StepForm {...inputs} />);

    const name = getByLabelText(/first name/i);
    fireEvent.change(name, {
      target: { value: '' },
    });

    const submit = getByText('Get Started');
    fireEvent.click(submit);

    await wait(() => {
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
