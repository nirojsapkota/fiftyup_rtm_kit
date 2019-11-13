import React from 'react';
// eslint-disable-next-line import/named
import { cleanup, fireEvent, render, wait } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';

const handleSubmit = jest.fn();

const setup = async (flag) => {
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
            { label: 'Canada', value: 'CAN', },
            { label: 'Australia', value: 'AUS', },
            { label: 'New Zealand', value: 'NZ', },
            { label: 'South Africa', value: 'SAF', }
          ],
        }
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
      let { getByLabelText, getByText, getByTestId } = await setup(true);
      let input = await getByLabelText(label);
      await fireEvent.focus(input);

      await wait(async () => {
        const item1 = await getByText('Canada');

        // Click away to check if dropdown disappears
        await fireEvent.mouseDown(getByText(''));
        await expect(item1).not.toBeInTheDocument();

        //Get input again and focus
        input = await getByLabelText(label);
        await fireEvent.focus(input);

        //Try if the dropdown closes if no values are present
        await fireEvent.click(input);
        await fireEvent.click(input);

        // Wait for dropdown to appear
        await wait(async () => {
          const dropdownItem = await getByLabelText('Canada');
          await expect(dropdownItem).toBeInTheDocument();
          await fireEvent.click(dropdownItem);
        });

        const arrowBox = getByTestId('arrow-box');
        // click on arrow to open the dropdown
        await fireEvent.click(arrowBox);

        //check if the dropdown has items
        await wait(async () => {
          const newItem = await getByLabelText('Australia');
          await expect(newItem).toBeInTheDocument();
          // click on another item
          await fireEvent.click(newItem);
        });

      });
    };
    await runTests();
  });
});

describe(`Testing Component with scrollable set to fals `, () => {
  it(`Should render all options in the dropdown without a scrollbar`, async () => {

    const runTests = async () => {
      let label = 'Please select a Country';
      let { getByLabelText, getByText } = await setup(false);
      let input = await getByLabelText(label);
      await fireEvent.focus(input);

      await wait(async () => {
        const item1 = await getByText('Canada');

        // Click away to check if dropdown disappears
        await fireEvent.mouseDown(getByText(''));
        await expect(item1).not.toBeInTheDocument();

        //Get input again and focus
        input = await getByLabelText(label);
        await fireEvent.focus(input);

        //Try if the dropdown closes if not values
        await fireEvent.click(input);
        await fireEvent.click(input);

        // Wait for dropdown to appear
        await wait(async () => {
          const dropdownItem = await getByLabelText('Canada');
          await expect(dropdownItem).toBeInTheDocument();
          await fireEvent.click(dropdownItem);
        });

      });
    };

    await runTests();
  });
});
