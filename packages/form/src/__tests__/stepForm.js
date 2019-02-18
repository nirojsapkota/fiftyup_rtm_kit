import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Header, Small } from '@rtm-ui/typography';
import Button from '@rtm-ui/button';
import Accordion from '../accordion';
import Form, { StepForm } from '../index';

describe('true', () => {
  it('works', () => {
    expect(2 + 2).toEqual(4);
  });
});
// import { stepFormInputs } from './fieldSetup';

// describe('StepForm', () => {
//   it('should meh', () => {
//     render(
//       <StepForm {...stepInputs} renderForm={formProps => formProps}>
//         {({ activeFormId, forms }) => {
//           return (
//             <Accordion
//               items={forms}
//               activeItem={activeFormId}
//               setOpenItems={(openItems, openingItemId) => [
//                 openItems,
//                 openingItemId,
//               ]}
//               itemHeader={({ item, onClick }) => (
//                 <Button asWrapper onClick={onClick}>
//                   <Header tag="h6">{item.id}</Header>
//                 </Button>
//               )}
//               itemBody={item => <Form {...item} />}
//             />
//           );
//         }}
//       </StepForm>
//     );
//   });
// });
