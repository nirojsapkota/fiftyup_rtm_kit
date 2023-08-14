import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

const FIELDS = [
  {
    label: 'Year of birth',
    name: 'year_of_birth',
    type: 'text',
    'data-testid': 'inline_year_birth',
    defaultValue: '1999',
    placeholder: 'YYYY',
    config: {
      component: 'inlineYear',
      validation: 'yearRange',
      validatorArgs: [1920, 2009],
    },
  },
];

describe(`<YearField />`, () => {
  describe('without errors', () => {
    it('displays the 4 text fields', async () => {
      const handleSubmit = jest.fn();

      let { getByLabelText, container, getByText, getByTestId } = await render(
        <Form
          data-testid="test-yearbirth"
          onSubmit={handleSubmit}
          fields={FIELDS}
        />
      );
      expect(getByLabelText(/Year of birth/)).toBeInTheDocument();
      const input = getByTestId(/inline_year_birth/);
      expect(input).toBeInTheDocument();
      expect(
        container.querySelector('input[type=hidden]').getAttribute('value')
      ).toBe('1999');

      const y0Input = getByTestId(/y0/);
      const y1Input = getByTestId(/y1/);
      const y2Input = getByTestId(/y2/);
      const y3Input = getByTestId(/y3/);
      expect(y0Input).toBeInTheDocument();
      fireEvent.change(y0Input, {
        target: { value: '' },
      });
      expect(y0Input.getAttribute('value')).toBe('');
      expect(
        container.querySelector('input[type=hidden]').getAttribute('value')
      ).toBe('999');
      fireEvent.change(y0Input, {
        target: { value: '2' },
      });
      expect(y0Input.getAttribute('value')).toBe('2');
      expect(
        container.querySelector('input[type=hidden]').getAttribute('value')
      ).toBe('2999');
      fireEvent.change(y1Input, {
        target: { value: '0' },
      });
      expect(y1Input.getAttribute('value')).toBe('0');
      expect(
        container.querySelector('input[type=hidden]').getAttribute('value')
      ).toBe('2099');
      fireEvent.change(y2Input, {
        target: { value: '0' },
      });
      expect(y2Input.getAttribute('value')).toBe('0');
      fireEvent.change(y3Input, {
        target: { value: '5' },
      });
      expect(y3Input.getAttribute('value')).toBe('5');

      expect(
        container.querySelector('input[type=hidden]').getAttribute('value')
      ).toBe('2005');
    });
  });
});
