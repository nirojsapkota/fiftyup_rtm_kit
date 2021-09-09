import React from 'react';
// eslint-disable-next-line import/named
import {
  cleanup,
  fireEvent,
  render,
  wait,
} from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

const handleSubmit = jest.fn();

const setup = async flag => {
  const util = render(
    <Form
      id="test"
      onSubmit={handleSubmit}
      fields={[
        {
          label: 'Please select a Country',
          name: 'country',
          type: 'text',
          config: { component: 'dropdownfield', scrollable: flag },
          hint: 'eg. USA',
          value: '',
          options: [
            { label: 'Canada', value: 'CAN' },
            { label: 'Australia', value: 'AUS' },
            { label: 'New Zealand', value: 'NZ' },
            { label: 'South Africa', value: 'SAF' },
          ],
        },
      ]}
    />
  );
  return util;
};
afterEach(cleanup);

describe(`Testing Component with scrollable set to true `, () => {
  it(`Should render all options in the dropdown and should have a scrollbar`, async () => {
    const runTests = async () => {
      let label = 'Please select a Country';
      let { getAllByLabelText, getAllByText, getByTestId } = await setup(true);
      let input = await getAllByLabelText(label)[0];
      await fireEvent.focus(input);

      await wait(async () => {
        // check for scrollbar and height of dropdown
        const resultsContainer = getByTestId('results-container');
        expect(resultsContainer).toHaveStyleRule('overflow', 'auto');
        expect(resultsContainer).toHaveStyleRule('height', '204px');

        const item1 = await getAllByText('Canada')[0];

        // Click away to check if dropdown disappears
        await fireEvent.mouseDown(getAllByText('')[0]);
        await expect(item1).not.toBeInTheDocument();

        //Get input again and focus
        input = await getAllByLabelText(label)[0];
        await fireEvent.focus(input);

        //Try if the dropdown closes if no values are present
        await fireEvent.click(input);
        await fireEvent.click(input);

        // Wait for dropdown to appear
        await wait(async () => {
          const dropdownItem = await getAllByLabelText('Canada')[0];
          await expect(dropdownItem).toBeInTheDocument();
          await fireEvent.click(dropdownItem);
        });

        const arrowBox = getByTestId('arrow-box');
        // click on arrow to open the dropdown
        await fireEvent.click(arrowBox);

        //check if the dropdown has items
        await wait(async () => {
          const newItem = await getAllByLabelText('Australia')[0];
          await expect(newItem).toBeInTheDocument();
          // click on another item
          await fireEvent.click(newItem);
        });
      });
    };
    await runTests();
  });
});

describe(`Testing Component with scrollable set to false `, () => {
  it(`Should render all options in the dropdown without a scrollbar`, async () => {
    const runTests = async () => {
      let label = 'Please select a Country';
      let { getAllByLabelText, getAllByText, getByTestId } = await setup(false);
      let input = await getAllByLabelText(label)[0];
      await fireEvent.focus(input);

      await wait(async () => {
        // check for scrollbar and height of dropdown
        const resultsContainer = getByTestId('results-container');
        expect(resultsContainer).toHaveStyleRule('overflow', 'none');
        expect(resultsContainer).toHaveStyleRule('height', 'none');

        const item1 = await getAllByText('Canada')[0];

        // Click away to check if dropdown disappears
        await fireEvent.mouseDown(getAllByText('')[0]);
        await expect(item1).not.toBeInTheDocument();

        //Get input again and focus
        input = await getAllByLabelText(label)[0];
        await fireEvent.focus(input);

        //Try if the dropdown closes if not values
        await fireEvent.click(input);
        await fireEvent.click(input);

        // Wait for dropdown to appear
        await wait(async () => {
          const dropdownItem = await getAllByLabelText('Canada')[0];
          await expect(dropdownItem).toBeInTheDocument();
          await fireEvent.click(dropdownItem);
        });
      });
    };

    await runTests();
  });
});
