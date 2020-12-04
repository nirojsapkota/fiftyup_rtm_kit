import React from 'react';
// eslint-disable-next-line import/named
import {
  cleanup,
  fireEvent,
  render,
  wait,
} from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';
import { setupGoogleMock } from '../__mocks__/googlePayload';

const handleSelect = jest.fn(res => console.log(res));
const handleNoSelect = jest.fn(res => console.log(res));
const handleEmptyResult = jest.fn(res => console.log(res));
const FIELDS = [
  {
    label: 'My address:',
    name: 'autocomplete_address',
    type: 'text',
    hint: 'Eg. 2000, BARANGAROO',
    autoComplete: 'off',
    'data-testid': 'autocomplete_address',
    config: {
      onEmptyResult: res => {},
      searchOptions: {
        componentRestrictions: { country: 'au' },
        types: ['address'],
      },
      onDidSelect: handleSelect,
      component: 'addressautocomplete',
    },
  },
];

const NOFIELDS = [
  {
    label: 'My address:',
    name: 'autocomplete_address',
    type: 'text',
    hint: 'Eg. 2000, BARANGAROO',
    autoComplete: 'off',
    'data-testid': 'autocomplete_address',
    config: {
      onEmptyResult: handleEmptyResult,
      searchOptions: {
        componentRestrictions: { country: 'au' },
        types: ['address'],
      },
      onDidSelect: handleSelect,
      component: 'addressautocomplete',
    },
  },
];

afterEach(cleanup);

describe('Component', () => {
  beforeEach(() => {
    setupGoogleMock();
  });
  it(`Should render address autocomplete`, async () => {
    let { getByLabelText, getByText, getByTestId } = await render(
      <Form
        id="test-autoaddress"
        onSubmit={async function(values) {
          alert(JSON.stringify(values, 0, 2));
        }}
        fields={FIELDS}
      />
    );
    expect(getByLabelText(/My address/)).toBeInTheDocument();

    const input = await getByTestId(/autocomplete_address/);
    expect(input).toBeInTheDocument();
    await fireEvent.focus(input);
    await wait(async () => {
      await expect(getByText('Start typing address')).toBeInTheDocument();
    });

    await fireEvent.change(input, {
      target: { value: '7 be' },
    });
    await wait(async () => {
      await expect(getByText('Need more characters')).toBeInTheDocument();
    });
  });

  it('should trigger the input', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const { debug, getByText, getByTestId } = await render(
      <Form
        id="test-autoaddress"
        onSubmit={async function(values) {
          alert(JSON.stringify(values, 0, 2));
        }}
        fields={FIELDS}
      />
    );
    const input = await getByTestId(/autocomplete_address/);
    expect(input).toBeInTheDocument();

    await fireEvent.change(input, {
      target: { value: '7 belgrave street' },
    });
    await wait(async () => {
      const suggestion = await getByText(
        /37\/7 Belgrave Street, Kogarah NSW, Australia/
      );
      expect(suggestion).toBeInTheDocument();
      fireEvent.click(suggestion);
      await wait(async () => {
        await expect(handleSelect).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(
          'parsing 37/7 Belgrave Street, Kogarah NSW, Australia'
        );
      });
    });
  });
});

describe('Component for empty result', () => {
  beforeEach(() => {
    setupGoogleMock('true');
  });
  it('should return zero result', async () => {
    console.log(window.google.maps);
    const { getByTestId } = await render(
      <Form
        id="test-autoaddress"
        onSubmit={async function(values) {
          alert(JSON.stringify(values, 0, 2));
        }}
        fields={NOFIELDS}
      />
    );
    const input = await getByTestId(/autocomplete_address/);
    expect(input).toBeInTheDocument();
    await fireEvent.change(input, {
      target: { value: '7 belgrave street' },
    });

    await wait(async () => {
      expect(getByTestId('no-result')).toBeInTheDocument();
      expect(handleEmptyResult).toHaveBeenCalled();
      expect(handleNoSelect).not.toHaveBeenCalled();
    });
  });
});
