import React from 'react';
import { Xform } from '../src';
import { Header } from '@rtm-ui/typography';

export const config = {
  options: { autoComplete: true },
  form: {
    fields: [
      {
        label: 'Are you an existing customer?',
        config: {
          machine: 'radio',
          component: 'panelRadio',
          validator: 'requiredRadio',
        },
        hint: 'Select for some reason',
        name: 'existing',
        value: '',
        type: 'radio',
        options: [
          { label: 'YES', value: 'existing', icon: 'electricity' },
          { label: 'NO', value: 'nonExisting', icon: 'electricity' },
        ],
      },
    ],
    next: {
      fields: [
        {
          label: 'Please select items',
          config: {
            machine: 'radio',
            component: 'panelRadio',
            validator: 'requiredRadio',
          },
          hint: 'Select for some reason',
          name: 'householdSize',
          value: '',
          type: 'radio',
          options: [
            { label: 'SMALL', value: 'small', icon: 'electricity' },
            { label: 'MEDIUM', value: 'medium', icon: 'electricity' },
            { label: 'LARGE', value: 'large', icon: 'electricity' },
          ],
        },
      ],
    },
  },
};

export const Escape = () => {
  const [canSeeOffers, setCanSeeOffers] = React.useState(true);

  const props = {
    ...config,
    onSubmit: async values => console.log('real submit'),
    form: {
      ...config.form,
      onSubmit: async values => {
        if (values.existing === 'existing') {
          setCanSeeOffers(false);
        }
      },
    },
  };

  return (
    <>
      {canSeeOffers ? (
        <Xform {...props} />
      ) : (
        <Header>
          Sorry, this offer is not available to existing customers
          <button onClick={() => setCanSeeOffers(true)}>Go back</button>
        </Header>
      )}
    </>
  );
};
