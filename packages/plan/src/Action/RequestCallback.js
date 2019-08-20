import React from 'react';
import PropTypes from 'prop-types';
import { Markdown } from '@rtm-ui/typography';
import { FormError } from '@rtm-ui/form';
import { Phoneback } from '@rtm-ui/phoneback';

const axios = require('axios');

export const onSubmit = async (values, authenticityToken, url, campaignId) => {
  let data = {
    phoneback: {
      campaign_id: campaignId,
    },
  };
  values.forEach(field => {
    if (field.name === 'agreement_checkbox') {
      data[field.name] = field.value;
    } else {
      data['phoneback'][field.name] = field.value;
    }
  });
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': authenticityToken,
    },
  };

  await axios.post(url, data, config).catch(error => {
    throw new FormError({
      formError: 'Unexpected problem, please contact support.',
      fieldErrors: {},
    });
  });

  return values;
};

const Agreement = ({ disclaimer }) => {
  return <Markdown scale={0.7} raw={disclaimer} />;
};

const RequestCallback = props => {
  const { isSubmitted, onSuccess, formInput, ...rest } = props;
  const { form } = formInput;
  const cbAgreement = {
    label: '',
    name: 'agreement_checkbox',
    type: 'checkbox',
    config: {
      validator: 'requiredRadio',
    },
    options: [
      {
        label: <Agreement disclaimer={rest.disclaimer} />,
        value: 'yes',
      },
    ],
  };
  const formFields = rest.enableCheckbox
    ? [...form.fields, cbAgreement]
    : form.fields;

  const formWithHandler = {
    id: 'callback',
    fields: [...formFields],
    onSubmit: async values =>
      onSubmit(values, rest.authenticityToken, rest.link, rest.campaignId),
    onSuccess: async values => {
      onSuccess();
      return values;
    },
  };

  return (
    <Phoneback
      {...rest}
      form={formWithHandler}
      isPhonebacked={isSubmitted}
      renderTrigger={props.renderTrigger}
    />
  );
};

RequestCallback.propTypes = {
  onSuccess: PropTypes.func,
  isPhonebacked: PropTypes.bool,
  action: PropTypes.shape({}),
  formInput: PropTypes.shape({}),
};

RequestCallback.defaultProps = {
  formInput: {
    form: {
      fields: [
        {
          label: 'First Name:',
          name: 'first_name',
          type: 'text',
          config: {
            validator: 'required',
          },
        },
        {
          label: 'Last Name:',
          name: 'last_name',
          type: 'text',
          config: {
            validator: 'required',
          },
        },
        {
          label: 'Phone Number:',
          hint: 'Enter 10 digit phone number without spaces',
          name: 'phone',
          type: 'tel',
          config: {
            mask: 'phoneAU',
            validator: 'mask',
            validatorArgs: ['phoneAU', 'Phone Number'],
          },
        },
      ],
    },
  },
};

export default RequestCallback;
