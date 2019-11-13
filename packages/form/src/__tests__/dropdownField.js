import React from 'react';
// eslint-disable-next-line import/named
import { cleanup, render } from '../../../bootstrap/setup/testSetup';
import { Form } from '../index';
const handleSubmit = jest.fn();
const setup = async () => {
  const util = render(

    <Form
      id="test"
      onSubmit={handleSubmit}
      fields={[
        {
          label: 'Please select a Country',
          name: 'country',
          config: { component: 'dropdownfield', scrollable: true },
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

describe(`Address Auto Complete Component `, () => {
  it(`Tests when there are no result for the searched address`, async () => {


    const runTests = async () => {

      let { getByLabelText, getByText } = await setup();

      let input;
      input = await getByLabelText('Please select a Country');
      // let field = xforminputs.form.fields[0];
      // let input = await getByLabelText(field.label);

      // await fireEvent.change(input, {
      //   target: { value: 'lorem ipsum donor' },
      // });

      // await wait(async () => {
      //   const item = await getByText(/Address not found/i);
      //   // Click away to check if dropdown disappears

      //   await fireEvent.mouseDown(getByText(field.label));
      //   await fireEvent.change(input, {
      //     target: { value: '' },
      //   });
      //   await expect(item).not.toBeInTheDocument();

      //   // get input and search again
      //   input = await getByLabelText(field.label);
      //   await fireEvent.change(input, {
      //     target: { value: 'lorem ipsum donor' },
      //   });

      //   // Check popup re-display when focus to input
      //   await fireEvent.mouseDown(getByText(field.label));
      //   await expect(item).not.toBeInTheDocument();

      //   //Focus the Element
      //   await fireEvent.focus(input);

      //   //Check if the dropdown Reappears
      //   await wait(async () => {
      //     const item = await getByText(/Address not found/i);
      //     await expect(item).toBeInTheDocument();
      //   });

      //   await wait(async () => {
      //     const item = await getByText(/Address not found/i);
      //     await fireEvent.click(item);
      //   });
      // });


    };

    await runTests();
  });
});


// import React from 'react';
// // eslint-disable-next-line import/named
// import { fireEvent, render } from '../../../bootstrap/setup/testSetup';
// import { Form } from '../index';

// describe(`Month Picker `, () => {
//   it(`can select the month picker when valid`, async () => {

//     const handleSubmit = jest.fn();
//     const { getByLabelText, getByValue, container, getByTestId } = await render(
//       <Form
//         id="test"
//         onSubmit={handleSubmit}
//         fields={[
//           {
//             label: 'Please select a Country',
//             config: { component: 'dropdownfield', scrollable: true },
//             hint: 'eg. USA',
//             name: 'country',
//             value: '',
//             options: [
//               { label: 'Canada', value: 'CAN', },
//               { label: 'Australia', value: 'AUS', },
//               { label: 'New Zealand', value: 'NZ', },
//               { label: 'South Africa', value: 'SAF', }
//             ],
//           }
//         ]}
//       />
//     );

//     const itemInput = getByValue('');
//     fireEvent.change(itemInput, {
//       target: { value: '' },
//     });

//     // const submit = getByTestId(`submit-test`);
//     // fireEvent.click(submit);
//     // await wait(() => {
//     //   expect(handleSubmit).toHaveBeenCalled();
//     //   fireEvent.focus(itemInput);
//     // });

//     // const leftIcon = container.querySelector(`div.icon`);
//     // fireEvent.click(leftIcon);
//     // const icon1 = container.querySelector(`svg.view-back`);
//     // const icon2 = container.querySelector(`svg.view-forward`);
//     // expect(icon1).not.toBeDisabled();
//     // expect(icon2).not.toBeDisabled();
//     // fireEvent.click(icon1);
//     // fireEvent.click(icon2);

//     // const iconSelected = container.querySelector(`div.selected`);
//     // fireEvent.click(iconSelected);

//     // const input = container.querySelector('input');
//     // fireEvent.keyDown(input);

//   });
// });
